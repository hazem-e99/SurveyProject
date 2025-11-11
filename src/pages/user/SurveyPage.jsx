import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { useSurveyStore } from '../../store/surveyStore';
import { useResponseStore } from '../../store/responseStore';
import { getLocalizedText } from '../../utils/multiLang';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Textarea from '../../components/common/Textarea';
import Radio from '../../components/common/Radio';
import Checkbox from '../../components/common/Checkbox';
import Loading from '../../components/common/Loading';
import Alert from '../../components/common/Alert';
import LanguageSwitcher from '../../components/common/LanguageSwitcher';
import ThemeToggle from '../../components/common/ThemeToggle';

const SurveyPage = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentPoll, loading, fetchPollById } = useSurveyStore();
  const { submitResponse, loading: submitting } = useResponseStore();
  
  const [answers, setAnswers] = useState({});
  const [errors, setErrors] = useState({});
  const [surveyError, setSurveyError] = useState('');
  
  useEffect(() => {
    fetchPollById(id).catch(() => {
      setSurveyError(t('survey.surveyNotFound'));
    });
  }, [id]);
  
  useEffect(() => {
    if (currentPoll) {
      // Check if survey is active
      if (currentPoll.status !== 'active') {
        setSurveyError(t('survey.surveyInactive'));
        return;
      }
      
      // Check dates
      const now = new Date();
      const startDate = new Date(currentPoll.start_date);
      const endDate = new Date(currentPoll.end_date);
      
      if (now < startDate) {
        setSurveyError(t('survey.surveyNotStarted'));
      } else if (now > endDate) {
        setSurveyError(t('survey.surveyExpired'));
      }
    }
  }, [currentPoll, t]);
  
  const handleAnswerChange = (questionId, value, questionType, allowMultiple, maxSelections) => {
    if (questionType === 'mcq' && allowMultiple) {
      // Multiple selections
      const currentSelections = answers[questionId] || [];
      
      if (currentSelections.includes(value)) {
        // Remove selection
        const newSelections = currentSelections.filter(v => v !== value);
        setAnswers(prev => ({
          ...prev,
          [questionId]: newSelections,
        }));
      } else {
        // Add selection - check max limit
        if (maxSelections && currentSelections.length >= maxSelections) {
          // Store translation key and params so message re-renders when language changes
          setErrors(prev => ({
            ...prev,
            [questionId]: { key: 'survey.maxSelectionsReached', params: { max: maxSelections } }
          }));
          return;
        }
        
        const newSelections = [...currentSelections, value];
        setAnswers(prev => ({
          ...prev,
          [questionId]: newSelections,
        }));
      }
    } else {
      // Single selection or text
      setAnswers(prev => ({
        ...prev,
        [questionId]: value,
      }));
    }
    
    // Clear error for this question
    if (errors[questionId]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[questionId];
        return newErrors;
      });
    }
  };
  
  const validateAnswers = () => {
    const newErrors = {};
    
    currentPoll.questions.forEach(question => {
      if (question.is_required) {
        const answer = answers[question.id];
        if (!answer || (Array.isArray(answer) && answer.length === 0) || answer.trim?.() === '') {
          newErrors[question.id] = { key: 'survey.requiredField' };
        }
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateAnswers()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    try {
      const formattedAnswers = currentPoll.questions.map(question => ({
        question_id: question.id,
        type: question.question_type,
        value: question.question_type === 'mcq'
          ? (question.allow_multiple_selections ? answers[question.id] || [] : parseInt(answers[question.id]))
          : answers[question.id] || '',
      }));
      
      await submitResponse(id, formattedAnswers);
      navigate(`/survey/${id}/thank-you`);
    } catch (error) {
      setSurveyError(t('survey.submissionError'));
    }
  };
  
  if (loading && !currentPoll) {
    return <Loading fullScreen text={t('common.loading')} />;
  }
  
  if (surveyError) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4 sm:p-6">
        <div className="absolute top-4 ltr:right-4 rtl:left-4 flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <LanguageSwitcher />
        </div>
        <Card className="max-w-md w-full">
          <div className="text-start">
            <AlertCircle size={48} className="sm:w-16 sm:h-16 ltr:mr-auto rtl:ml-auto text-red-500 mb-4" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2 text-start">
              {t('common.error')}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 sm:mb-6 px-4 text-start">
              {surveyError}
            </p>
            <Button onClick={() => navigate('/')} size="sm">
              {t('survey.returnHome')}
            </Button>
          </div>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 sm:py-8 px-4 sm:px-6">
      <div className="absolute top-4 ltr:right-4 rtl:left-4 flex items-center gap-2 sm:gap-3 z-10">
        <ThemeToggle />
        <LanguageSwitcher />
      </div>
      
      <div className="max-w-3xl mx-auto">
        <Card className="mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 break-words text-start">
            {getLocalizedText(currentPoll?.title, i18n.language)}
          </h1>
          {currentPoll?.description && (
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 break-words text-start">
              {getLocalizedText(currentPoll.description, i18n.language)}
            </p>
          )}
        </Card>
        
        {Object.keys(errors).length > 0 && (
          <Alert
            type="error"
            title={t('survey.validationError')}
            className="mb-4 sm:mb-6"
          />
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {currentPoll?.questions.map((question, index) => (
            <Card key={question.id}>
              <div className="mb-3 sm:mb-4">
                <div className="flex items-start gap-2 mb-2">
                  <span className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 text-start">
                    {t('survey.question')} {index + 1} {t('survey.of')} {currentPoll.questions.length}
                  </span>
                  {question.is_required && (
                    <span className="text-red-500">*</span>
                  )}
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white break-words text-start">
                  {getLocalizedText(question.question_text, i18n.language)}
                </h3>
              </div>
              
              {question.question_type === 'mcq' ? (
                <div className="space-y-2.5 sm:space-y-3">
                  {question.allow_multiple_selections && (
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-2 text-start">
                      {t('survey.selectOptions')}
                      {question.max_selections > 1 && ` (max ${question.max_selections})`}
                    </p>
                  )}
                  {question.options.map((option) => (
                    <div key={option.id}>
                      {question.allow_multiple_selections ? (
                        <Checkbox
                          label={getLocalizedText(option.option_text, i18n.language)}
                          checked={(answers[question.id] || []).includes(option.id)}
                          onChange={(e) => handleAnswerChange(question.id, option.id, 'mcq', true, question.max_selections)}
                        />
                      ) : (
                        <Radio
                          label={getLocalizedText(option.option_text, i18n.language)}
                          name={`question_${question.id}`}
                          value={option.id}
                          checked={answers[question.id] === option.id}
                          onChange={(e) => handleAnswerChange(question.id, option.id, 'mcq', false, null)}
                        />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <Textarea
                  value={answers[question.id] || ''}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value, 'text')}
                  placeholder={t('survey.enterText')}
                  fullWidth
                  rows={4}
                />
              )}
              
              {errors[question.id] && (
                <p className="text-xs sm:text-sm text-red-500 mt-2 text-start">
                  {typeof errors[question.id] === 'string' 
                    ? errors[question.id]
                    : t(errors[question.id].key, errors[question.id].params || {})
                  }
                </p>
              )}
            </Card>
          ))}
          
          <div className="flex items-center justify-center pt-2">
            <Button
              type="submit"
              size="md"
              loading={submitting}
              className="w-full sm:w-auto sm:min-w-[200px]"
            >
              {t('survey.submitSurvey')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SurveyPage;
