import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Calendar, User, LayoutList, Table2, BarChart2, Download } from 'lucide-react';
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
  const [viewMode, setViewMode] = useState('cards'); // 'cards', 'table', 'summary'
  
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
    <div className="space-y-4">
      {responses.map((response, index) => (
        <Card key={response.id}>
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                <User size={20} className="text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {t('admin.responseNumber')}{index + 1}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Calendar size={14} />
                  {format(new Date(response.submitted_at), 'MMM d, yyyy HH:mm')}
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
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
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('admin.questionNumber')}{idx + 1}: {getLocalizedText(answer.question_text, i18n.language)}
                  </p>
                  <div className="ml-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-gray-900 dark:text-white">
                      {displayAnswer || <span className="text-gray-400 italic">{t('admin.noAnswer')}</span>}
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

  // Table View
  const TableView = () => (
    <Card>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white whitespace-nowrap sticky left-0 bg-white dark:bg-gray-800 z-10">
                #
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white whitespace-nowrap sticky left-12 bg-white dark:bg-gray-800 z-10">
                {t('admin.submittedAt')}
              </th>
              {allQuestions.map((question) => (
                <th key={question.id} className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white min-w-[250px]">
                  <div className="line-clamp-2">
                    {getLocalizedText(question.text, i18n.language)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {responses.map((response, index) => (
              <tr 
                key={response.id}
                className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap sticky left-0 bg-white dark:bg-gray-800">
                  {index + 1}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap sticky left-12 bg-white dark:bg-gray-800">
                  {format(new Date(response.submitted_at), 'MMM d, yyyy HH:mm')}
                </td>
                {response.answers.map((answer) => {
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
                    <td key={answer.question_id} className="px-4 py-3 text-sm text-gray-900 dark:text-white min-w-[250px]">
                      <div className="line-clamp-3">
                        {displayAnswer || <span className="text-gray-400 italic">-</span>}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );

  // Summary/Analytics View
  const SummaryView = () => (
    <div className="space-y-6">
      {Object.entries(summaryStats).map(([questionId, stat], idx) => (
        <Card key={questionId}>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t('admin.questionNumber')}{idx + 1}: {getLocalizedText(stat.question, i18n.language)}
          </h3>
          
          {stat.type === 'text' ? (
            // Text answers list
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {stat.total} {t('admin.responsesCount')}
              </p>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {stat.answers.map((answer, i) => (
                  <div key={i} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-900 dark:text-white">{answer}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // MCQ answers with bar chart
            <div className="space-y-3">
              {Object.entries(stat.answers).map(([option, count]) => {
                const percentage = ((count / stat.total) * 100).toFixed(1);
                return (
                  <div key={option}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {option}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {count} ({percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-primary-600 dark:bg-primary-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                {t('admin.totalResponsesText')}: {stat.total}
              </p>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => navigate('/admin/surveys')}>
          <ArrowLeft size={20} />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('admin.viewResponses')}
          </h1>
          {currentPoll && (
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {getLocalizedText(currentPoll.title, i18n.language)}
            </p>
          )}
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t('admin.totalResponses')}
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {responses.length}
          </p>
        </div>
      </div>

      {responses.length === 0 ? (
        <Card className="text-center py-12">
          <User size={64} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {t('admin.noResponses')}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {t('admin.noOneSubmitted')}
          </p>
        </Card>
      ) : (
        <>
          {/* View Mode Switcher */}
          <Card>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('cards')}
                  className={clsx(
                    'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                    viewMode === 'cards'
                      ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  )}
                >
                  <LayoutList size={18} />
                  <span>{t('admin.cardsView')}</span>
                </button>
                
                <button
                  onClick={() => setViewMode('table')}
                  className={clsx(
                    'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                    viewMode === 'table'
                      ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  )}
                >
                  <Table2 size={18} />
                  <span>{t('admin.tableView')}</span>
                </button>
                
                <button
                  onClick={() => setViewMode('summary')}
                  className={clsx(
                    'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                    viewMode === 'summary'
                      ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  )}
                >
                  <BarChart2 size={18} />
                  <span>{t('admin.summaryView')}</span>
                </button>
              </div>
            </div>
          </Card>

          {/* Render View Based on Mode */}
          {viewMode === 'cards' && <CardsView />}
          {viewMode === 'table' && <TableView />}
          {viewMode === 'summary' && <SummaryView />}
        </>
      )}
    </div>
  );
};

export default Responses;
