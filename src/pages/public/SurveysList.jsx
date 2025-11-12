import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../components/common/Loading';
import { pollService } from '../../services/pollService';

const SurveysList = () => {
  const { t, i18n } = useTranslation();
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const data = await pollService.getAll();
        // Filter only active surveys
        const activeSurveys = data.filter((s) => s.status === 'active');
        setSurveys(activeSurveys);
      } catch (error) {
        console.error('Error fetching surveys:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSurveys();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white">
              {t('survey.title')}
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl">
              {t('pages.surveys.subtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Surveys List */}
      <div className="py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {surveys.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                {t('pages.surveys.noActiveSurveys')}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {surveys.map((survey) => {
                const title = survey[`title_${i18n.language}`] || survey.title_en;
                const description = survey[`description_${i18n.language}`] || survey.description_en;

                return (
                  <Link
                    key={survey.id}
                    to={`/survey/${survey.id}`}
                    className="group bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6 border border-gray-200 dark:border-gray-700"
                  >
                    <h3 className="text-xl font-bold text-black dark:text-white mb-2 text-start">
                      {title}
                    </h3>
                    
                    {description && (
                      <p className="text-gray-600 dark:text-gray-400 text-start line-clamp-3">
                        {description}
                      </p>
                    )}

                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <span className="text-sm font-medium text-black dark:text-white">
                        {t('survey.startSurvey')} →
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SurveysList;
