import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Plus, Save, Trash2, Edit, GripVertical } from 'lucide-react';
import { useSurveyStore } from '../../store/surveyStore';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import MultiLangInput from '../../components/common/MultiLangInput';
import Textarea from '../../components/common/Textarea';
import Select from '../../components/common/Select';
import Card from '../../components/common/Card';
import Loading from '../../components/common/Loading';
import Modal from '../../components/common/Modal';
import Checkbox from '../../components/common/Checkbox';
import { initMultiLangText, hasAnyLanguage, getLocalizedText } from '../../utils/multiLang';
import toast from 'react-hot-toast';

const SurveyBuilder = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;
  
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
  
  const [questionModal, setQuestionModal] = useState({
    isOpen: false,
    question: null,
    isEdit: false,
  });
  
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    questionId: null,
  });
  
  useEffect(() => {
    if (isEdit) {
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
    setQuestionModal({
      isOpen: true,
      question: {
        question_text: initMultiLangText(),
        question_type: 'mcq',
        is_required: true,
        allow_multiple_selections: false,
        max_selections: 1,
        options: [initMultiLangText(), initMultiLangText()],
      },
      isEdit: false,
    });
  };
  
  const handleEditQuestion = (question) => {
    setQuestionModal({
      isOpen: true,
      question: {
        ...question,
        options: question.options?.map(o => o.option_text) || ['', ''],
      },
      isEdit: true,
    });
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
        <Button onClick={handleSavePoll} loading={loading}>
          <Save size={20} className="mr-2" />
          {t('common.save')}
        </Button>
      </div>
      
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
      
      {isEdit && (
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {t('admin.questions')} ({questions.length})
            </h2>
            <Button onClick={handleAddQuestion}>
              <Plus size={20} className="mr-2" />
              {t('admin.addQuestion')}
            </Button>
          </div>
          
          {questions.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No questions yet. Add your first question!
            </div>
          ) : (
            <div className="space-y-3">
              {questions.map((question, index) => (
                <div
                  key={question.id}
                  className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
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
                          <div className="mt-2 ml-4 space-y-1">
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
                        >
                          <Edit size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDeleteModal({ isOpen: true, questionId: question.id })}
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
      )}
      
      <QuestionModal
        isOpen={questionModal.isOpen}
        onClose={() => setQuestionModal({ isOpen: false, question: null, isEdit: false })}
        question={questionModal.question}
        isEdit={questionModal.isEdit}
        pollId={id}
      />
      
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

// Question Modal Component
const QuestionModal = ({ isOpen, onClose, question, isEdit, pollId }) => {
  const { t } = useTranslation();
  const { createQuestion, updateQuestion, loading } = useSurveyStore();
  
  const [formData, setFormData] = useState({
    question_text: initMultiLangText(),
    question_type: 'mcq',
    is_required: true,
    allow_multiple_selections: false,
    max_selections: 1,
    options: [initMultiLangText(), initMultiLangText()],
  });
  
  useEffect(() => {
    if (question) {
      setFormData(question);
    } else {
      setFormData({
        question_text: initMultiLangText(),
        question_type: 'mcq',
        is_required: true,
        allow_multiple_selections: false,
        max_selections: 1,
        options: [initMultiLangText(), initMultiLangText()],
      });
    }
  }, [question, isOpen]);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  
  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData(prev => ({ ...prev, options: newOptions }));
  };
  
  const handleAddOption = () => {
    setFormData(prev => ({
      ...prev,
      options: [...prev.options, initMultiLangText()],
    }));
  };
  
  const handleRemoveOption = (index) => {
    if (formData.options.length > 2) {
      const newOptions = formData.options.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, options: newOptions }));
    }
  };
  
  const handleSubmit = async () => {
    if (!hasAnyLanguage(formData.question_text)) {
      toast.error(t('validation.required'));
      return;
    }
    
    if (formData.question_type === 'mcq') {
      const validOptions = formData.options.filter(o => hasAnyLanguage(o));
      if (validOptions.length < 2) {
        toast.error('At least 2 options required for MCQ');
        return;
      }
    }
    
    try {
      const questionPayload = {
        ...formData,
        poll_id: parseInt(pollId),
        order_number: isEdit ? formData.order_number : 999,
        options: formData.question_type === 'mcq' 
          ? formData.options.filter(o => hasAnyLanguage(o))
          : [],
      };
      
      if (isEdit) {
        await updateQuestion(question.id, questionPayload);
        toast.success(t('admin.questionUpdated'));
      } else {
        await createQuestion(questionPayload);
        toast.success(t('admin.questionAdded'));
      }
      
      onClose();
    } catch (error) {
      toast.error(error.message);
    }
  };
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? t('admin.editQuestion') : t('admin.addQuestion')}
      size="lg"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            {t('common.cancel')}
          </Button>
          <Button onClick={handleSubmit} loading={loading}>
            {t('common.save')}
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <MultiLangInput
          label={t('admin.questionText')}
          value={formData.question_text}
          onChange={(value) => setFormData(prev => ({ ...prev, question_text: value }))}
          type="textarea"
          fullWidth
          required
        />
        
        <Select
          label={t('admin.questionType')}
          name="question_type"
          value={formData.question_type}
          onChange={handleChange}
          fullWidth
          options={[
            { value: 'mcq', label: t('admin.mcq') },
            { value: 'text', label: t('admin.text') },
          ]}
        />
        
        <Checkbox
          label={t('admin.isRequired')}
          name="is_required"
          checked={formData.is_required}
          onChange={handleChange}
        />
        
        {formData.question_type === 'mcq' && (
          <>
            <Checkbox
              label={t('admin.allowMultiple')}
              name="allow_multiple_selections"
              checked={formData.allow_multiple_selections}
              onChange={handleChange}
            />
            
            {formData.allow_multiple_selections && (
              <Input
                label={t('admin.maxSelections')}
                name="max_selections"
                type="number"
                value={formData.max_selections}
                onChange={handleChange}
                fullWidth
                min={1}
              />
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('admin.options')}
              </label>
              <div className="space-y-3">
                {formData.options.map((option, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="flex-1">
                      <MultiLangInput
                        value={option}
                        onChange={(value) => handleOptionChange(index, value)}
                        fullWidth
                      />
                    </div>
                    {formData.options.length > 2 && (
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleRemoveOption(index)}
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
                onClick={handleAddOption}
                className="mt-2"
              >
                <Plus size={16} className="mr-1" />
                {t('admin.addOption')}
              </Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default SurveyBuilder;
