import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import Section from '../../components/common/Section';
import Loading from '../../components/common/Loading';
import { sectionService } from '../../services/sectionService';

const ArtsCreativity = () => {
  const { t } = useTranslation();
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const data = await sectionService.getSectionsByPage('arts-creativity');
        setSections(data);
      } catch (error) {
        console.error('Error fetching sections:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSections();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-black dark:text-white">
            {t('pages.artsCreativity.title')}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-center text-gray-600 dark:text-gray-400">
            {t('pages.artsCreativity.subtitle')}
          </p>
        </div>
      </div>

      {/* Dynamic Sections */}
      {sections.length > 0 ? (
        sections.map((section, index) => (
          <Section
            key={section.id}
            section={section}
            className={index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800'}
          />
        ))
      ) : (
        <div className="py-16">
          <p className="text-center text-gray-600 dark:text-gray-400">
            {t('common.noContent')}
          </p>
        </div>
      )}
    </div>
  );
};

export default ArtsCreativity;
