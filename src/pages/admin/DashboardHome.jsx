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
    <div className="space-y-4 sm:space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl lg:text-2xl font-bold text-gray-900 dark:text-white truncate text-start">
            {t('admin.dashboard')}
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 truncate text-start">
            {t('admin.dashboardSubtitle')}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {statCards.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 truncate text-start">
                  {stat.title}
                </p>
                <p className="mt-2 text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white text-start">
                  {stat.value}
                </p>
              </div>
              <div className={clsx(
                'p-2.5 sm:p-3 rounded-lg flex-shrink-0',
                stat.bgColor
              )}>
                <stat.icon className={stat.iconColor} size={20} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="min-w-0">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white truncate text-start">
              {t('admin.quickActions')}
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate text-start">
              {t('admin.quickActionsSubtitle')}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <button
            onClick={() => navigate('/admin/surveys/create')}
            className="flex items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-primary-500 dark:hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/10 transition-all group text-left"
          >
            <div className="p-2.5 sm:p-3 rounded-lg bg-primary-100 dark:bg-primary-900/30 group-hover:bg-primary-200 dark:group-hover:bg-primary-900/50 transition-colors flex-shrink-0">
              <PlusCircle className="text-primary-600 dark:text-primary-400" size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm sm:text-base font-medium text-gray-900 dark:text-white truncate text-start">
                {t('admin.createSurvey')}
              </p>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2 text-start">
                {t('admin.createSurveyDesc')}
              </p>
            </div>
          </button>
          
          <button
            onClick={() => navigate('/admin/surveys')}
            className="flex items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-purple-500 dark:hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-all group text-left"
          >
            <div className="p-2.5 sm:p-3 rounded-lg bg-purple-100 dark:bg-purple-900/30 group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50 transition-colors flex-shrink-0">
              <FileText className="text-purple-600 dark:text-purple-400" size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm sm:text-base font-medium text-gray-900 dark:text-white truncate text-start">
                {t('admin.viewSurveys')}
              </p>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2 text-start">
                {t('admin.viewSurveysDesc')}
              </p>
            </div>
          </button>
        </div>
      </Card>

      {/* Recent Surveys */}
      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="min-w-0">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white truncate text-start">
              {t('admin.recentSurveys')}
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate text-start">
              {t('admin.recentSurveysSubtitle')}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/admin/surveys')}
            className="self-start sm:self-auto"
          >
            {t('common.viewAll')}
          </Button>
        </div>

        {stats.recentSurveys.length === 0 ? (
          <div className="text-center py-8 sm:py-12">
            <FileText className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400" />
            <h3 className="mt-3 sm:mt-4 text-sm font-medium text-gray-900 dark:text-white">
              {t('admin.noSurveys')}
            </h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 px-4">
              {t('admin.noSurveysDesc')}
            </p>
            <div className="mt-4 sm:mt-6">
              <Button onClick={() => navigate('/admin/surveys/create')} size="sm">
                <PlusCircle size={16} />
                <span className="ml-2">{t('admin.createFirstSurvey')}</span>
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {stats.recentSurveys.map((survey) => (
              <div
                key={survey.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 sm:p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                onClick={() => navigate(`/admin/surveys/edit/${survey.id}`)}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate text-start">
                      {getLocalizedText(survey.title, i18n.language)}
                    </h3>
                    <span className={clsx(
                      'inline-flex items-center self-start px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium',
                      survey.status === 'active'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400'
                    )}>
                      {survey.status === 'active' ? t('admin.active') : t('admin.draft')}
                    </span>
                  </div>
                  <p className="mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400 line-clamp-2 text-start">
                    {getLocalizedText(survey.description, i18n.language)}
                  </p>
                  <div className="mt-2 flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
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
