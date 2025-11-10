import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Calendar, User, LayoutList, BarChart2, Download } from 'lucide-react';
import { useResponseStore } from '../../store/responseStore';
import { useSurveyStore } from '../../store/surveyStore';
import { getLocalizedText } from '../../utils/multiLang';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Loading from '../../components/common/Loading';
import { format } from 'date-fns';
import clsx from 'clsx';

const Responses = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { responses, loading, fetchResponses } = useResponseStore();
  const { currentPoll, fetchPollById } = useSurveyStore();
  const [viewMode, setViewMode] = useState('cards'); // 'cards', 'summary'
  
  useEffect(() => {
    fetchPollById(id);
    fetchResponses(id);
  }, [id]);
  
  if (loading && responses.length === 0) {
    return <Loading fullScreen text={t('common.loading')} />;
  }

  // Get all unique questions (question_text is already raw multilang object from service)
  const allQuestions = responses.length > 0 ? responses[0].answers.map(a => ({
    id: a.question_id,
    text: a.question_text, // Keep raw multilang object
    type: a.question_type
  })) : [];

  // Calculate summary statistics for MCQ questions
  const getSummaryStats = () => {
    const stats = {};
    
    allQuestions.forEach(question => {
      if (question.type === 'mcq') {
        const answerCounts = {};
        
        responses.forEach(response => {
          const answer = response.answers.find(a => a.question_id === question.id);
          if (answer && answer.answer) {
            // answer.answer is now an array of multilang objects
            const options = Array.isArray(answer.answer) ? answer.answer : [answer.answer];
            options.forEach(optionText => {
              // Get localized text for the option
              const localizedOption = getLocalizedText(optionText, i18n.language);
              if (localizedOption) {
                answerCounts[localizedOption] = (answerCounts[localizedOption] || 0) + 1;
              }
            });
          }
        });
        
        stats[question.id] = {
          question: question.text, // Keep raw multilang object
          answers: answerCounts,
          total: responses.length
        };
      } else {
        // For text questions, just collect all answers
        const textAnswers = responses
          .map(r => r.answers.find(a => a.question_id === question.id)?.answer)
          .filter(Boolean);
        
        stats[question.id] = {
          question: question.text, // Keep raw multilang object
          type: 'text',
          answers: textAnswers,
          total: textAnswers.length
        };
      }
    });
    
    return stats;
  };

  const summaryStats = getSummaryStats();

  // Cards View (Original)
  const CardsView = () => (
    <div className="space-y-3 sm:space-y-4">
      {responses.map((response, index) => (
        <Card key={response.id}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center flex-shrink-0">
                <User size={18} className="text-primary-600 dark:text-primary-400" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white text-start">
                  {t('admin.responseNumber')}{index + 1}
                </h3>
                <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  <Calendar size={12} />
                  <span className="truncate">{format(new Date(response.submitted_at), 'MMM d, yyyy HH:mm')}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-3 sm:space-y-4">
            {response.answers.map((answer, idx) => {
              // Format answer display
              let displayAnswer = answer.answer;
              if (answer.question_type === 'mcq' && Array.isArray(answer.answer)) {
                // Convert array of multilang objects to localized comma-separated string
                displayAnswer = answer.answer
                  .map(opt => getLocalizedText(opt, i18n.language))
                  .filter(Boolean)
                  .join(', ');
              }
              
              return (
                <div key={idx}>
                  <p className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 break-words text-start">
                    {t('admin.questionNumber')}{idx + 1}: {getLocalizedText(answer.question_text, i18n.language)}
                  </p>
                  <div className="ltr:ml-4 rtl:mr-4 p-2.5 sm:p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm sm:text-base text-gray-900 dark:text-white break-words text-start">
                      {displayAnswer || <span className="text-gray-400 italic text-start">{t('admin.noAnswer')}</span>}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      ))}
    </div>
  );

  // Summary/Analytics View
  const SummaryView = () => (
    <div className="space-y-4 sm:space-y-6">
      {Object.entries(summaryStats).map(([questionId, stat], idx) => (
        <Card key={questionId}>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4 break-words text-start">
            {t('admin.questionNumber')}{idx + 1}: {getLocalizedText(stat.question, i18n.language)}
          </h3>
          
          {stat.type === 'text' ? (
            // Text answers list
            <div className="space-y-2">
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3 text-start">
                {stat.total} {t('admin.responsesCount')}
              </p>
              <div className="space-y-2 max-h-80 sm:max-h-96 overflow-y-auto">
                {stat.answers.map((answer, i) => (
                  <div key={i} className="p-2.5 sm:p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-xs sm:text-sm text-gray-900 dark:text-white break-words text-start">{answer}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // MCQ answers with bar chart
            <div className="space-y-2.5 sm:space-y-3">
              {Object.entries(stat.answers).map(([option, count]) => {
                const percentage = ((count / stat.total) * 100).toFixed(1);
                return (
                  <div key={option}>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                      <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 break-words text-start">
                        {option}
                      </span>
                      <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap text-end">
                        {count} ({percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 sm:h-2">
                      <div 
                        className="bg-primary-600 dark:bg-primary-500 h-1.5 sm:h-2 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-start">
                {t('admin.totalResponsesText')}: {stat.total}
              </p>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
  
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
        <Button variant="ghost" onClick={() => navigate('/admin/surveys')} size="sm" className="self-start">
          <ArrowLeft size={18} />
        </Button>
        <div className="flex-1 min-w-0">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white truncate">
            {t('admin.viewResponses')}
          </h1>
          {currentPoll && (
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1 truncate">
              {getLocalizedText(currentPoll.title, i18n.language)}
            </p>
          )}
        </div>
        <div className="ltr:text-left rtl:text-right sm:ltr:text-right sm:rtl:text-left self-start sm:self-auto">
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 text-start">
            {t('admin.totalResponses')}
          </p>
          <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white text-start">
            {responses.length}
          </p>
        </div>
      </div>

      {responses.length === 0 ? (
        <Card className="py-8 sm:py-12">
          <div className="text-start">
            <User size={48} className="sm:w-16 sm:h-16 ltr:mr-auto rtl:ml-auto text-gray-400 mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 text-start">
              {t('admin.noResponses')}
            </h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 px-4 text-start">
              {t('admin.noOneSubmitted')}
            </p>
          </div>
        </Card>
      ) : (
        <>
          {/* View Mode Switcher */}
          <Card>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-2 overflow-x-auto">
                <button
                  onClick={() => setViewMode('cards')}
                  className={clsx(
                    'flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap',
                    viewMode === 'cards'
                      ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  )}
                >
                  <LayoutList size={16} />
                  <span>{t('admin.cardsView')}</span>
                </button>
                
                <button
                  onClick={() => setViewMode('summary')}
                  className={clsx(
                    'flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap',
                    viewMode === 'summary'
                      ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  )}
                >
                  <BarChart2 size={16} />
                  <span>{t('admin.summaryView')}</span>
                </button>
              </div>
            </div>
          </Card>

          {/* Render View Based on Mode */}
          {viewMode === 'cards' && <CardsView />}
          {viewMode === 'summary' && <SummaryView />}
        </>
      )}
    </div>
  );
};

export default Responses;
