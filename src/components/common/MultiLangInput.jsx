import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

const MultiLangInput = forwardRef(({ 
  label, 
  value = { ar: '', en: '', ku: '' }, 
  onChange, 
  error,
  required = false,
  type = 'input', // 'input' or 'textarea'
  fullWidth = true,
  ...props 
}, ref) => {
  const { t } = useTranslation();

  const handleChange = (lang, newValue) => {
    onChange({
      ...value,
      [lang]: newValue
    });
  };

  const languages = [
    { code: 'ar', label: 'العربية', dir: 'rtl' },
    { code: 'en', label: 'English', dir: 'ltr' },
    { code: 'ku', label: 'کوردی', dir: 'rtl' }
  ];

  return (
    <div className={clsx('space-y-2 sm:space-y-3', fullWidth && 'w-full')}>
      {label && (
        <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
          {required && <span className="text-red-500 ltr:ml-1 rtl:mr-1">*</span>}
        </label>
      )}
      
      <div className="space-y-2 sm:space-y-3">
        {languages.map((lang) => (
          <div key={lang.code} className="space-y-1">
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">
              {lang.label}
            </label>
            {type === 'textarea' ? (
              <textarea
                ref={lang.code === 'en' ? ref : null}
                value={value[lang.code] || ''}
                onChange={(e) => handleChange(lang.code, e.target.value)}
                dir={lang.dir}
                className={clsx(
                  'block w-full px-3 sm:px-4 py-2 rounded-lg border transition-colors resize-none text-sm sm:text-base',
                  'bg-white dark:bg-gray-800',
                  'text-gray-900 dark:text-white',
                  'placeholder-gray-400 dark:placeholder-gray-500',
                  error
                    ? 'border-red-300 dark:border-red-700 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring-primary-500',
                  'focus:outline-none focus:ring-2 focus:ring-opacity-50'
                )}
                rows={3}
                {...props}
              />
            ) : (
              <input
                ref={lang.code === 'en' ? ref : null}
                type="text"
                value={value[lang.code] || ''}
                onChange={(e) => handleChange(lang.code, e.target.value)}
                dir={lang.dir}
                className={clsx(
                  'block w-full px-3 sm:px-4 py-2 rounded-lg border transition-colors text-sm sm:text-base',
                  'bg-white dark:bg-gray-800',
                  'text-gray-900 dark:text-white',
                  'placeholder-gray-400 dark:placeholder-gray-500',
                  error
                    ? 'border-red-300 dark:border-red-700 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-300 dark:border-gray-600 focus:border-primary-500 focus:ring-primary-500',
                  'focus:outline-none focus:ring-2 focus:ring-opacity-50'
                )}
                {...props}
              />
            )}
          </div>
        ))}
      </div>
      
      {error && (
        <p className="mt-1 text-xs sm:text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
});

MultiLangInput.displayName = 'MultiLangInput';

export default MultiLangInput;
