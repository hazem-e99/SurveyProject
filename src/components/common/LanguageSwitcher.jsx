import { useTranslation } from 'react-i18next';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import clsx from 'clsx';

const LanguageSwitcher = ({ className }) => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const languages = [
    { code: 'en', name: t('languages.en'), nativeName: 'English', dir: 'ltr' },
    { code: 'ar', name: t('languages.ar'), nativeName: 'العربية', dir: 'rtl' },
    { code: 'ku', name: t('languages.ku'), nativeName: 'کوردی', dir: 'rtl' },
  ];
  
  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];
  
  useEffect(() => {
    const currentLang = languages.find(lang => lang.code === i18n.language);
    if (currentLang) {
      document.documentElement.dir = currentLang.dir;
      document.documentElement.lang = currentLang.code;
      
      // Set appropriate font family
      if (currentLang.dir === 'rtl') {
        document.body.style.fontFamily = 'Cairo, system-ui, sans-serif';
      } else {
        document.body.style.fontFamily = 'Inter, system-ui, sans-serif';
      }
    }
  }, [i18n.language]);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
  };
  
  return (
    <div className={clsx('relative inline-block', className)} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          'flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800',
          'border border-gray-300 dark:border-gray-600 rounded-lg',
          'hover:bg-gray-50 dark:hover:bg-gray-700',
          'transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400',
          isOpen && 'ring-2 ring-primary-500 dark:ring-primary-400'
        )}
        aria-label="Change language"
        aria-expanded={isOpen}
      >
        <Globe size={18} className="text-gray-600 dark:text-gray-400" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[60px] text-left">
          {currentLanguage.nativeName}
        </span>
        <ChevronDown 
          size={16} 
          className={clsx(
            'text-gray-500 dark:text-gray-400 transition-transform duration-200',
            isOpen && 'transform rotate-180'
          )} 
        />
      </button>
      
      {isOpen && (
        <div 
          className={clsx(
            'absolute top-full mt-2 w-48',
            'bg-white dark:bg-gray-800',
            'border border-gray-200 dark:border-gray-700',
            'rounded-lg shadow-lg',
            'py-1 z-50',
            'animate-in fade-in slide-in-from-top-2 duration-200',
            i18n.language === 'ar' || i18n.language === 'ku' 
              ? 'left-0' 
              : 'right-0'
          )}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={clsx(
                'w-full flex items-center justify-between gap-3 px-4 py-2.5',
                'text-sm font-medium transition-colors',
                'hover:bg-gray-100 dark:hover:bg-gray-700',
                lang.code === i18n.language
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                  : 'text-gray-700 dark:text-gray-300'
              )}
            >
              <span>{lang.nativeName}</span>
              {lang.code === i18n.language && (
                <Check size={16} className="text-primary-600 dark:text-primary-400" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
