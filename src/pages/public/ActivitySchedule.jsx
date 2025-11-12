import { useTranslation } from 'react-i18next';

const ActivitySchedule = () => {
  const { t } = useTranslation();

  // Static data matching the requested structure - 6 columns
  const scheduleData = [
    { col1: t('pages.activitySchedule.items.leadership'), col2: t('pages.activitySchedule.items.universitiesInstitutes'), col3: t('pages.activitySchedule.items.electronicPolls'), col4: t('pages.activitySchedule.items.society'), col5: t('pages.activitySchedule.items.theater'), col6: t('pages.activitySchedule.items.volunteerWorkPGS') },
    { col1: t('pages.activitySchedule.items.womenLeadership'), col2: t('pages.activitySchedule.items.women'), col3: '', col4: t('pages.activitySchedule.items.economy'), col5: t('pages.activitySchedule.items.drawing'), col6: t('pages.activitySchedule.items.workOtherPlaces') },
    { col1: t('pages.activitySchedule.items.youthLeadership'), col2: t('pages.activitySchedule.items.studentsYouth'), col3: '', col4: t('pages.activitySchedule.items.health'), col5: t('pages.activitySchedule.items.sculpture'), col6: t('pages.activitySchedule.items.volunteerWorkOtherPlaces') },
    { col1: t('pages.activitySchedule.items.individualDevelopment'), col2: t('pages.activitySchedule.items.belonging'), col3: '', col4: t('pages.activitySchedule.items.environment'), col5: t('pages.activitySchedule.items.handicrafts'), col6: '' },
    { col1: t('pages.activitySchedule.items.professionalDevelopment'), col2: t('pages.activitySchedule.items.basicPrograms'), col3: '', col4: t('pages.activitySchedule.items.education'), col5: t('pages.activitySchedule.items.innovations'), col6: '' },
    { col1: '', col2: '', col3: '', col4: t('pages.activitySchedule.items.management'), col5: '', col6: '' },
    { col1: '', col2: '', col3: '', col4: t('pages.activitySchedule.items.masterTheses'), col5: '', col6: '' },
    { col1: '', col2: '', col3: '', col4: t('pages.activitySchedule.items.doctoralTheses'), col5: '', col6: '' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-black dark:text-white">
            {t('pages.activitySchedule.title')}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-center text-gray-600 dark:text-gray-400">
            {t('pages.activitySchedule.subtitle')}
          </p>
        </div>
      </div>

      {/* Schedule Table */}
      <div className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="overflow-x-auto shadow-lg">
            <table className="w-full border-collapse bg-white dark:bg-gray-800">
              <thead>
                <tr className="border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700">
                  <th className="px-4 py-3 text-sm font-semibold text-gray-800 dark:text-gray-200 border-l border-gray-300 dark:border-gray-600 text-center">
                    {t('pages.activitySchedule.headers.academy')}
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-800 dark:text-gray-200 border-l border-gray-300 dark:border-gray-600 text-center">
                    {t('pages.activitySchedule.headers.community')}
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-800 dark:text-gray-200 border-l border-gray-300 dark:border-gray-600 text-center">
                    {t('pages.activitySchedule.headers.polls')}
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-800 dark:text-gray-200 border-l border-gray-300 dark:border-gray-600 text-center">
                    {t('pages.activitySchedule.headers.general')}
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-800 dark:text-gray-200 border-l border-gray-300 dark:border-gray-600 text-center">
                    {t('pages.activitySchedule.headers.music')}
                  </th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-800 dark:text-gray-200 border-l border-gray-300 dark:border-gray-600 text-center">
                    {t('pages.activitySchedule.headers.inPGS')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {scheduleData.map((row, index) => (
                  <tr key={index} className="border border-gray-300 dark:border-gray-600">
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 border-l border-gray-300 dark:border-gray-600 text-center">
                      {row.col1}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 border-l border-gray-300 dark:border-gray-600 text-center">
                      {row.col2}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 border-l border-gray-300 dark:border-gray-600 text-center">
                      {row.col3}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 border-l border-gray-300 dark:border-gray-600 text-center">
                      {row.col4}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 border-l border-gray-300 dark:border-gray-600 text-center">
                      {row.col5}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 border-l border-gray-300 dark:border-gray-600 text-center">
                      {row.col6}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivitySchedule;
