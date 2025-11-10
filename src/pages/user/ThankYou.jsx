import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CheckCircle } from 'lucide-react';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import LanguageSwitcher from '../../components/common/LanguageSwitcher';
import ThemeToggle from '../../components/common/ThemeToggle';

const ThankYou = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4 sm:p-6">
      <div className="absolute top-4 ltr:right-4 rtl:left-4 flex items-center gap-2 sm:gap-3">
        <ThemeToggle />
        <LanguageSwitcher />
      </div>
      
      <Card className="max-w-md w-full">
        <div className="text-start">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center ltr:mr-auto rtl:ml-auto mb-4 sm:mb-6">
            <CheckCircle size={40} className="sm:w-12 sm:h-12 text-green-600 dark:text-green-400" />
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 text-start">
            {t('survey.thankYou')}
          </h1>
          
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 px-4 text-start">
            {t('survey.surveyCompleted')}
          </p>
          
          <div className="p-3 sm:p-4 bg-green-50 dark:bg-green-900/20 rounded-lg mb-4 sm:mb-6">
            <p className="text-xs sm:text-sm text-green-800 dark:text-green-300 text-start">
              {t('survey.feedbackMessage')}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ThankYou;
