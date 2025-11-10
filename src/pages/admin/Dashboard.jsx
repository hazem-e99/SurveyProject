import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Plus, Edit, Trash2, Eye, Copy, BarChart } from 'lucide-react';
import { useSurveyStore } from '../../store/surveyStore';
import { useResponseStore } from '../../store/responseStore';
import { responseService } from '../../services/responseService';
import { getLocalizedText } from '../../utils/multiLang';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Loading from '../../components/common/Loading';
import Modal from '../../components/common/Modal';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

const Dashboard = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { polls, loading, fetchPolls, deletePoll } = useSurveyStore();
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, pollId: null });
  const [responseCounts, setResponseCounts] = useState({});
  
  useEffect(() => {
    fetchPolls();
  }, [fetchPolls]);
  
  useEffect(() => {
    // Fetch response counts for each poll
    const fetchCounts = async () => {
      const counts = {};
      for (const poll of polls) {
        try {
          const count = await responseService.getResponseCount(poll.id);
          counts[poll.id] = count;
        } catch (error) {
          counts[poll.id] = 0;
        }
      }
      setResponseCounts(counts);
    };
    
    if (polls.length > 0) {
      fetchCounts();
    }
  }, [polls]);
  
  const handleDelete = async () => {
    try {
      await deletePoll(deleteModal.pollId);
      toast.success(t('admin.surveyDeleted'));
      setDeleteModal({ isOpen: false, pollId: null });
    } catch (error) {
      toast.error(error.message);
    }
  };
  
  const handleCopyLink = (pollId) => {
    const link = `${window.location.origin}/survey/${pollId}`;
    navigator.clipboard.writeText(link);
    toast.success(t('admin.linkCopied'));
  };
  
  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      inactive: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
      draft: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      completed: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    };
    return colors[status] || colors.inactive;
  };
  
  if (loading && polls.length === 0) {
    return <Loading fullScreen text={t('common.loading')} />;
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('admin.surveys')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {polls.length} {t('admin.surveys')}
          </p>
        </div>
        <Button
          onClick={() => navigate('/admin/surveys/create')}
          size="lg"
        >
          <Plus size={20} className="mr-2" />
          {t('admin.createSurvey')}
        </Button>
      </div>
      
      {polls.length === 0 ? (
        <Card className="text-center py-12">
          <BarChart size={64} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {t('admin.noSurveys')}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {t('admin.createFirstSurvey')}
          </p>
          <Button onClick={() => navigate('/admin/surveys/create')}>
            <Plus size={20} className="mr-2" />
            {t('admin.createSurvey')}
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {polls.map((poll) => (
            <Card key={poll.id} hover className="flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {getLocalizedText(poll.title, i18n.language)}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {getLocalizedText(poll.description, i18n.language)}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(poll.status)}`}>
                  {t(`admin.${poll.status}`)}
                </span>
              </div>
              
              <div className="mt-auto space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">
                    {t('admin.totalResponses')}:
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {responseCounts[poll.id] || 0}
                  </span>
                </div>
                
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {t('admin.createdAt')}: {format(new Date(poll.created_at), 'MMM d, yyyy')}
                </div>
                
                <div className="flex items-center gap-2 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/admin/surveys/edit/${poll.id}`)}
                    className="flex-1"
                  >
                    <Edit size={16} className="mr-1" />
                    {t('common.edit')}
                  </Button>
                  
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => navigate(`/admin/responses/${poll.id}`)}
                  >
                    <Eye size={16} />
                  </Button>
                  
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleCopyLink(poll.id)}
                  >
                    <Copy size={16} />
                  </Button>
                  
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => setDeleteModal({ isOpen: true, pollId: poll.id })}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
      
      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, pollId: null })}
        title={t('admin.deleteSurvey')}
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => setDeleteModal({ isOpen: false, pollId: null })}
            >
              {t('common.cancel')}
            </Button>
            <Button
              variant="danger"
              onClick={handleDelete}
            >
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

export default Dashboard;
