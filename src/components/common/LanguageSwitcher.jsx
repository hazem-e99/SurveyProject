import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { useEffect } from 'react';
import clsx from 'clsx';

const LanguageSwitcher = ({ className }) => {
  const { i18n, t } = useTranslation();
  
  const languages = [
    { code: 'en', name: t('languages.en'), dir: 'ltr' },
    { code: 'ar', name: t('languages.ar'), dir: 'rtl' },
    { code: 'ku', name: t('languages.ku'), dir: 'rtl' },
  ];
  
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
  
  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
  };
  
  return (
    <div className={clsx('relative inline-block', className)}>
      <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg">
        <Globe size={18} className="text-gray-600 dark:text-gray-400" />
        <select
          value={i18n.language}
          onChange={(e) => changeLanguage(e.target.value)}
          className="bg-transparent border-none outline-none cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
