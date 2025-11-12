import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Home = () => {
  const { t } = useTranslation();

  const features = [
    {
      title: t('pages.home.features.community.title'),
      description: t('pages.home.features.community.description'),
      link: '/community-engagement',
    },
    {
      title: t('pages.home.features.research.title'),
      description: t('pages.home.features.research.description'),
      link: '/scientific-research',
    },
    {
      title: t('pages.home.features.activities.title'),
      description: t('pages.home.features.activities.description'),
      link: '/activity-schedule',
    },
    {
      title: t('pages.home.features.jobs.title'),
      description: t('pages.home.features.jobs.description'),
      link: '/job-opportunities',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-black dark:text-white">
              {t('pages.home.hero.title')}
            </h1>
            <p className="text-lg md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {t('pages.home.hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link
                to="/about"
                className="inline-flex items-center justify-center px-8 py-4 text-black dark:text-white font-semibold rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {t('pages.home.hero.learnMore')}
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-4 text-black dark:text-white font-semibold rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {t('pages.home.hero.getInTouch')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white">
              {t('pages.home.features.title')}
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              {t('pages.home.features.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
                className="group p-6 bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-bold text-black dark:text-white mb-2 text-start">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-start mb-4">
                  {feature.description}
                </p>
                <div className="flex items-center gap-2 text-black dark:text-white font-medium group-hover:gap-3 transition-all">
                  {t('common.learnMore')}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-6">
            {t('pages.home.cta.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            {t('pages.home.cta.subtitle')}
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            {t('pages.home.cta.button')}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
