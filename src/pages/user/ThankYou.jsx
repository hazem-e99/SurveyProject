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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="absolute top-4 right-4 flex items-center gap-3">
        <ThemeToggle />
        <LanguageSwitcher />
      </div>
      
      <Card className="max-w-md text-center">
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={48} className="text-green-600 dark:text-green-400" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
          {t('survey.thankYou')}
        </h1>
        
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          {t('survey.surveyCompleted')}
        </p>
        
        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg mb-6">
          <p className="text-sm text-green-800 dark:text-green-300">
            Your feedback helps us improve our services and better serve you.
          </p>
        </div>
        
        <Button
          onClick={() => navigate('/')}
          variant="outline"
        >
          {t('survey.returnHome')}
        </Button>
      </Card>
    </div>
  );
};

export default ThankYou;
