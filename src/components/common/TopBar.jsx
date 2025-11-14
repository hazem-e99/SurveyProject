import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';
import logo from '../../assets/logo.png';

const TopBar = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white py-3 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Left Side - Logo */}
          <div className="flex items-center">
            <img 
              src={logo} 
              alt="PGS Logo" 
              className="h-12 w-auto"
            />
          </div>

          {/* Center - Text */}
          <div className="flex items-center gap-4 text-sm sm:text-base">
            <span className="font-semibold">{t('topBar.instituteName')}</span>
            <span className="hidden sm:inline text-gray-400">|</span>
            <span className="font-medium">{t('topBar.slogan')}</span>
          </div>

          {/* Right Side - Language & Theme */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
