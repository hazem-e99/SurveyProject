import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Contact Info */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {t('footer.email')}:
              </span>
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200" dir="ltr">
                post@pg4all.com
              </span>
            </div>
            <div className="hidden md:block text-gray-400">|</div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {t('footer.phone')}:
              </span>
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200" dir="ltr">
                00964 750 422 77 33
              </span>
            </div>
            <div className="hidden md:block text-gray-400">|</div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {t('footer.phone')} 2:
              </span>
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200" dir="ltr">
                00964 750 422 33 88
              </span>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {t('footer.address')}:
            </span>
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200 text-center md:text-start">
              {t('footer.addressText')}
            </span>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            © {currentYear} {t('common.appName')}. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
