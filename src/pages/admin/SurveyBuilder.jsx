import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Plus, Save, Trash2, Edit, GripVertical, ChevronRight } from 'lucide-react';
import { useSurveyStore } from '../../store/surveyStore';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import MultiLangInput from '../../components/common/MultiLangInput';
import Select from '../../components/common/Select';
import Card from '../../components/common/Card';
import Loading from '../../components/common/Loading';
import Modal from '../../components/common/Modal';
import Checkbox from '../../components/common/Checkbox';
import { initMultiLangText, hasAnyLanguage, getLocalizedText } from '../../utils/multiLang';
import toast from 'react-hot-toast';
import clsx from 'clsx';

const SurveyBuilder = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;
  
  // Step state for wizard
  const [currentStep, setCurrentStep] = useState(1);
  
  const { 
    currentPoll, 
    questions,
    loading, 
    fetchPollById, 
    createPoll, 
    updatePoll,
    createQuestion,
    updateQuestion,
    deleteQuestion,
  } = useSurveyStore();
  
  const [pollData, setPollData] = useState({
    title: initMultiLangText(),
    description: initMultiLangText(),
    status: 'draft',
    start_date: '',
    end_date: '',
  });
  
  // Inline question form state
  const [questionForm, setQuestionForm] = useState({
    isOpen: false,
    isEdit: false,
    editingId: null,
    data: {
      question_text: initMultiLangText(),
      question_type: 'mcq',
      is_required: true,
      allow_multiple_selections: false,
      max_selections: 1,
      options: [initMultiLangText(), initMultiLangText()],
    }
  });
  
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    questionId: null,
  });
  
  useEffect(() => {
    if (isEdit) {
      setCurrentStep(2); // If editing, show questions step
      fetchPollById(id).then(poll => {
        setPollData({
          title: poll.title,
          description: poll.description,
          status: poll.status,
          start_date: poll.start_date.split('T')[0],
          end_date: poll.end_date.split('T')[0],
        });
      }).catch(() => {
        toast.error('Survey not found');
        navigate('/admin');
      });
    }
  }, [id, isEdit]);
  
  const handlePollChange = (field, value) => {
    setPollData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleNextStep = async () => {
    // Validate step 1 data
    if (!hasAnyLanguage(pollData.title)) {
      toast.error(t('validation.required'));
      return;
    }
    
    if (!pollData.start_date || !pollData.end_date) {
      toast.error('Please fill in start and end dates');
      return;
    }
    
    try {
      const pollPayload = {
        ...pollData,
        start_date: new Date(pollData.start_date).toISOString(),
        end_date: new Date(pollData.end_date).toISOString(),
      };
      
      if (isEdit) {
        await updatePoll(id, pollPayload);
        toast.success(t('admin.surveyUpdated'));
        setCurrentStep(2);
      } else {
        const newPoll = await createPoll(pollPayload);
        toast.success(t('admin.surveyCreated'));
        navigate(`/admin/edit/${newPoll.id}`);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  
  const handleSavePoll = async () => {
    if (!hasAnyLanguage(pollData.title)) {
      toast.error(t('validation.required'));
      return;
    }
    
    try {
      const pollPayload = {
        ...pollData,
        start_date: new Date(pollData.start_date).toISOString(),
        end_date: new Date(pollData.end_date).toISOString(),
      };
      
      if (isEdit) {
        await updatePoll(id, pollPayload);
        toast.success(t('admin.surveyUpdated'));
      } else {
        const newPoll = await createPoll(pollPayload);
        toast.success(t('admin.surveyCreated'));
        navigate(`/admin/edit/${newPoll.id}`);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  
  const handleAddQuestion = () => {
    setQuestionForm({
      isOpen: true,
      isEdit: false,
      editingId: null,
      data: {
        question_text: initMultiLangText(),
        question_type: 'mcq',
        is_required: true,
        allow_multiple_selections: false,
        max_selections: 1,
        options: [initMultiLangText(), initMultiLangText()],
      }
    });
  };
  
  const handleEditQuestion = (question) => {
    setQuestionForm({
      isOpen: true,
      isEdit: true,
      editingId: question.id,
      data: {
        ...question,
        options: question.options?.map(o => o.option_text) || [initMultiLangText(), initMultiLangText()],
      }
    });
    // Scroll to form
    setTimeout(() => {
      document.getElementById('question-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };
  
  const handleCancelQuestionForm = () => {
    setQuestionForm({
      isOpen: false,
      isEdit: false,
      editingId: null,
      data: {
        question_text: initMultiLangText(),
        question_type: 'mcq',
        is_required: true,
        allow_multiple_selections: false,
        max_selections: 1,
        options: [initMultiLangText(), initMultiLangText()],
      }
    });
  };
  
  const handleQuestionFormChange = (field, value) => {
    setQuestionForm(prev => ({
      ...prev,
      data: { ...prev.data, [field]: value }
    }));
  };
  
  const handleQuestionOptionChange = (index, value) => {
    const newOptions = [...questionForm.data.options];
    newOptions[index] = value;
    handleQuestionFormChange('options', newOptions);
  };
  
  const handleAddQuestionOption = () => {
    handleQuestionFormChange('options', [...questionForm.data.options, initMultiLangText()]);
  };
  
  const handleRemoveQuestionOption = (index) => {
    if (questionForm.data.options.length > 2) {
      const newOptions = questionForm.data.options.filter((_, i) => i !== index);
      handleQuestionFormChange('options', newOptions);
    }
  };
  
  const handleSubmitQuestion = async () => {
    if (!hasAnyLanguage(questionForm.data.question_text)) {
      toast.error(t('validation.required'));
      return;
    }
    
    if (questionForm.data.question_type === 'mcq') {
      const validOptions = questionForm.data.options.filter(o => hasAnyLanguage(o));
      if (validOptions.length < 2) {
        toast.error('At least 2 options required for MCQ');
        return;
      }
    }
    
    try {
      const questionPayload = {
        ...questionForm.data,
        poll_id: parseInt(id),
        order_number: questionForm.isEdit ? questionForm.data.order_number : 999,
        options: questionForm.data.question_type === 'mcq' 
          ? questionForm.data.options.filter(o => hasAnyLanguage(o))
          : [],
      };
      
      if (questionForm.isEdit) {
        await updateQuestion(questionForm.editingId, questionPayload);
        toast.success(t('admin.questionUpdated'));
      } else {
        await createQuestion(questionPayload);
        toast.success(t('admin.questionAdded'));
      }
      
      handleCancelQuestionForm();
    } catch (error) {
      toast.error(error.message);
    }
  };
  
  const handleDeleteQuestion = async () => {
    try {
      await deleteQuestion(deleteModal.questionId);
      toast.success(t('admin.questionDeleted'));
      setDeleteModal({ isOpen: false, questionId: null });
    } catch (error) {
      toast.error(error.message);
    }
  };
  
  if (loading && isEdit && !currentPoll) {
    return <Loading fullScreen text={t('common.loading')} />;
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => navigate('/admin')}
        >
          <ArrowLeft size={20} />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {isEdit ? t('admin.editSurvey') : t('admin.createSurvey')}
          </h1>
        </div>
        {currentStep === 1 && (
          <Button onClick={handleNextStep} loading={loading}>
            {t('common.next')}
            <ChevronRight size={20} className="ltr:ml-2 rtl:mr-2" />
          </Button>
        )}
        {currentStep === 2 && (
          <Button onClick={handleSavePoll} loading={loading}>
            <Save size={20} className="ltr:mr-2 rtl:ml-2" />
            {t('common.save')}
          </Button>
        )}
      </div>
      
      {/* Steps Indicator */}
      <div className="flex items-center justify-center gap-4">
        <div className="flex items-center gap-2">
          <div className={clsx(
            'w-10 h-10 rounded-full flex items-center justify-center font-semibold',
            currentStep === 1 
              ? 'bg-blue-600 text-white' 
              : 'bg-green-600 text-white'
          )}>
            1
          </div>
          <span className={clsx(
            'font-medium',
            currentStep === 1 
              ? 'text-gray-900 dark:text-white' 
              : 'text-green-600 dark:text-green-400'
          )}>
            Survey Details
          </span>
        </div>
        
        <div className="w-20 h-1 bg-gray-300 dark:bg-gray-600">
          <div className={clsx(
            'h-full bg-blue-600 transition-all duration-300',
            currentStep === 2 ? 'w-full' : 'w-0'
          )} />
        </div>
        
        <div className="flex items-center gap-2">
          <div className={clsx(
            'w-10 h-10 rounded-full flex items-center justify-center font-semibold',
            currentStep === 2 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
          )}>
            2
          </div>
          <span className={clsx(
            'font-medium',
            currentStep === 2 
              ? 'text-gray-900 dark:text-white' 
              : 'text-gray-400 dark:text-gray-500'
          )}>
            Questions
          </span>
        </div>
      </div>
      
      {/* Step 1: Survey Details */}
      {currentStep === 1 && (
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Survey Details
          </h2>
          <div className="space-y-4">
            <MultiLangInput
              label={t('admin.surveyTitle')}
              value={pollData.title}
              onChange={(value) => handlePollChange('title', value)}
              fullWidth
              required
            />
            
            <MultiLangInput
              label={t('admin.surveyDescription')}
              value={pollData.description}
              onChange={(value) => handlePollChange('description', value)}
              type="textarea"
              fullWidth
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select
                label={t('admin.status')}
                value={pollData.status}
                onChange={(e) => handlePollChange('status', e.target.value)}
                fullWidth
                options={[
                  { value: 'draft', label: t('admin.draft') },
                  { value: 'active', label: t('admin.active') },
                  { value: 'inactive', label: t('admin.inactive') },
                  { value: 'completed', label: t('admin.completed') },
                ]}
              />
              
              <Input
                label={t('admin.startDate')}
                type="date"
                value={pollData.start_date}
                onChange={(e) => handlePollChange('start_date', e.target.value)}
                fullWidth
              />
              
              <Input
                label={t('admin.endDate')}
                type="date"
                value={pollData.end_date}
                onChange={(e) => handlePollChange('end_date', e.target.value)}
                fullWidth
              />
            </div>
          </div>
        </Card>
      )}
      
      {/* Step 2: Questions */}
      {currentStep === 2 && (
        <>
          {/* Survey Details Summary Card */}
          <Card>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {getLocalizedText(pollData.title, i18n.language)}
                </h3>
                {hasAnyLanguage(pollData.description) && (
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    {getLocalizedText(pollData.description, i18n.language)}
                  </p>
                )}
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <span className={clsx(
                    'px-2 py-1 rounded',
                    pollData.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                    pollData.status === 'draft' ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300' :
                    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                  )}>
                    {pollData.status}
                  </span>
                  <span>{pollData.start_date} - {pollData.end_date}</span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentStep(1)}
              >
                <Edit size={16} className="ltr:mr-1 rtl:ml-1" />
                Edit Details
              </Button>
            </div>
          </Card>
          
          {/* Questions Card */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {t('admin.questions')} ({questions.length})
              </h2>
              {!questionForm.isOpen && (
                <Button onClick={handleAddQuestion}>
                  <Plus size={20} className="mr-2 rtl:mr-0 rtl:ml-2" />
                  {t('admin.addQuestion')}
                </Button>
              )}
            </div>
            
            {/* Inline Question Form */}
            {questionForm.isOpen && (
              <div id="question-form" className="mb-6 p-6 bg-blue-50 dark:bg-blue-900/10 border-2 border-blue-200 dark:border-blue-800 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {questionForm.isEdit ? t('admin.editQuestion') : t('admin.addQuestion')}
                  </h3>
                </div>
                
                <div className="space-y-4">
                  <MultiLangInput
                    label={t('admin.questionText')}
                    value={questionForm.data.question_text}
                    onChange={(value) => handleQuestionFormChange('question_text', value)}
                    type="textarea"
                    fullWidth
                    required
                  />
                  
                  <Select
                    label={t('admin.questionType')}
                    value={questionForm.data.question_type}
                    onChange={(e) => handleQuestionFormChange('question_type', e.target.value)}
                    fullWidth
                    options={[
                      { value: 'mcq', label: t('admin.mcq') },
                      { value: 'text', label: t('admin.text') },
                    ]}
                  />
                  
                  <Checkbox
                    label={t('admin.isRequired')}
                    checked={questionForm.data.is_required}
                    onChange={(e) => handleQuestionFormChange('is_required', e.target.checked)}
                  />
                  
                  {questionForm.data.question_type === 'mcq' && (
                    <>
                      <Checkbox
                        label={t('admin.allowMultiple')}
                        checked={questionForm.data.allow_multiple_selections}
                        onChange={(e) => handleQuestionFormChange('allow_multiple_selections', e.target.checked)}
                      />
                      
                      {questionForm.data.allow_multiple_selections && (
                        <Input
                          label={t('admin.maxSelections')}
                          type="number"
                          value={questionForm.data.max_selections}
                          onChange={(e) => handleQuestionFormChange('max_selections', e.target.value)}
                          fullWidth
                          min={1}
                        />
                      )}
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {t('admin.options')}
                        </label>
                        <div className="space-y-3">
                          {questionForm.data.options.map((option, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <div className="flex-1">
                                <MultiLangInput
                                  value={option}
                                  onChange={(value) => handleQuestionOptionChange(index, value)}
                                  fullWidth
                                />
                              </div>
                              {questionForm.data.options.length > 2 && (
                                <Button
                                  variant="danger"
                                  size="sm"
                                  onClick={() => handleRemoveQuestionOption(index)}
                                >
                                  <Trash2 size={16} />
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleAddQuestionOption}
                          className="mt-2"
                        >
                          <Plus size={16} className="mr-1 rtl:mr-0 rtl:ml-1" />
                          {t('admin.addOption')}
                        </Button>
                      </div>
                    </>
                  )}
                  
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Button onClick={handleSubmitQuestion} loading={loading}>
                      <Save size={18} className="mr-2 rtl:mr-0 rtl:ml-2" />
                      {questionForm.isEdit ? t('common.update') : t('common.save')}
                    </Button>
                    <Button variant="secondary" onClick={handleCancelQuestionForm}>
                      {t('common.cancel')}
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            {questions.length === 0 && !questionForm.isOpen ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No questions yet. Add your first question!
              </div>
            ) : (
              <div className="space-y-3">
                {questions.map((question, index) => (
                  <div
                    key={question.id}
                    className={clsx(
                      "flex items-start gap-3 p-4 rounded-lg transition-colors",
                      questionForm.isEdit && questionForm.editingId === question.id
                        ? "bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-300 dark:border-blue-700"
                        : "bg-gray-50 dark:bg-gray-700"
                    )}
                  >
                    <div className="text-gray-400 cursor-move mt-1">
                      <GripVertical size={20} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                              Q{index + 1}
                            </span>
                            {question.is_required && (
                              <span className="text-xs px-2 py-0.5 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 rounded">
                                {t('common.required')}
                              </span>
                            )}
                            <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded">
                              {question.question_type === 'mcq' ? t('admin.mcq') : t('admin.text')}
                            </span>
                          </div>
                          <p className="text-gray-900 dark:text-white font-medium">
                            {getLocalizedText(question.question_text, i18n.language)}
                          </p>
                          
                          {question.question_type === 'mcq' && question.options && (
                            <div className="mt-2 ml-4 rtl:ml-0 rtl:mr-4 space-y-1">
                              {question.options.map((option, idx) => (
                                <div key={option.id} className="text-sm text-gray-600 dark:text-gray-400">
                                  • {getLocalizedText(option.option_text, i18n.language)}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditQuestion(question)}
                            disabled={questionForm.isOpen}
                          >
                            <Edit size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setDeleteModal({ isOpen: true, questionId: question.id })}
                            disabled={questionForm.isOpen}
                          >
                            <Trash2 size={16} className="text-red-600" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </>
      )}
      
      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, questionId: null })}
        title={t('admin.deleteQuestion')}
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => setDeleteModal({ isOpen: false, questionId: null })}
            >
              {t('common.cancel')}
            </Button>
            <Button variant="danger" onClick={handleDeleteQuestion}>
              {t('common.delete')}
            </Button>
          </>
        }
      >
        <p className="text-gray-700 dark:text-gray-300">
          {t('admin.confirmDelete')}
        </p>
      </Modal>
    </div>
  );
};

export default SurveyBuilder;
