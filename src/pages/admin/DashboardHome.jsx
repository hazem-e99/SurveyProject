import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  FileText, 
  MessageSquare, 
  CheckCircle, 
  PlusCircle,
  TrendingUp,
  Users,
  Clock,
  BarChart3
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Loading from '../../components/common/Loading';
import { pollService } from '../../services/pollService';
import { responseService } from '../../services/responseService';
import { getLocalizedText } from '../../utils/multiLang';
import { format } from 'date-fns';
import clsx from 'clsx';

const DashboardHome = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalSurveys: 0,
    activeSurveys: 0,
    totalResponses: 0,
    recentSurveys: [],
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const polls = await pollService.getAllPolls();
      
      // Calculate stats
      const activeSurveys = polls.filter(p => p.status === 'active').length;
      let totalResponses = 0;
      
      // Get response counts for all surveys
      for (const poll of polls) {
        const count = await responseService.getResponseCount(poll.id);
        totalResponses += count;
      }
      
      // Get recent surveys (last 5)
      const recentSurveys = polls.slice(0, 5);
      
      setStats({
        totalSurveys: polls.length,
        activeSurveys,
        totalResponses,
        recentSurveys,
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loading size="lg" />
      </div>
    );
  }

  const statCards = [
    {
      title: t('admin.totalSurveys'),
      value: stats.totalSurveys,
      icon: FileText,
      color: 'blue',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      iconColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      title: t('admin.activeSurveys'),
      value: stats.activeSurveys,
      icon: CheckCircle,
      color: 'green',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      iconColor: 'text-green-600 dark:text-green-400',
    },
    {
      title: t('admin.totalResponses'),
      value: stats.totalResponses,
      icon: MessageSquare,
      color: 'purple',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      iconColor: 'text-purple-600 dark:text-purple-400',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('admin.dashboard')}
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {t('admin.dashboardSubtitle')}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.title}
                </p>
                <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
              </div>
              <div className={clsx(
                'p-3 rounded-lg',
                stat.bgColor
              )}>
                <stat.icon className={stat.iconColor} size={24} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t('admin.quickActions')}
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {t('admin.quickActionsSubtitle')}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <button
            onClick={() => navigate('/admin/create')}
            className="flex items-center gap-4 p-4 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-primary-500 dark:hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/10 transition-all group"
          >
            <div className="p-3 rounded-lg bg-primary-100 dark:bg-primary-900/30 group-hover:bg-primary-200 dark:group-hover:bg-primary-900/50 transition-colors">
              <PlusCircle className="text-primary-600 dark:text-primary-400" size={24} />
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-900 dark:text-white">
                {t('admin.createSurvey')}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t('admin.createSurveyDesc')}
              </p>
            </div>
          </button>
          
          <button
            onClick={() => navigate('/admin')}
            className="flex items-center gap-4 p-4 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-purple-500 dark:hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-all group"
          >
            <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900/30 group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50 transition-colors">
              <FileText className="text-purple-600 dark:text-purple-400" size={24} />
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-900 dark:text-white">
                {t('admin.viewSurveys')}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t('admin.viewSurveysDesc')}
              </p>
            </div>
          </button>
        </div>
      </Card>

      {/* Recent Surveys */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t('admin.recentSurveys')}
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {t('admin.recentSurveysSubtitle')}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/admin')}
          >
            {t('common.viewAll')}
          </Button>
        </div>

        {stats.recentSurveys.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-sm font-medium text-gray-900 dark:text-white">
              {t('admin.noSurveys')}
            </h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {t('admin.noSurveysDesc')}
            </p>
            <div className="mt-6">
              <Button onClick={() => navigate('/admin/create')}>
                <PlusCircle size={18} />
                {t('admin.createFirstSurvey')}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {stats.recentSurveys.map((survey) => (
              <div
                key={survey.id}
                className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                onClick={() => navigate(`/admin/edit/${survey.id}`)}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {getLocalizedText(survey.title, i18n.language)}
                    </h3>
                    <span className={clsx(
                      'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
                      survey.status === 'active'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400'
                    )}>
                      {survey.status === 'active' ? t('admin.active') : t('admin.draft')}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 truncate">
                    {getLocalizedText(survey.description, i18n.language)}
                  </p>
                  <div className="mt-2 flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {format(new Date(survey.created_at), 'MMM d, yyyy')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default DashboardHome;
