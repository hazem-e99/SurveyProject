import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import clsx from 'clsx';

const Navbar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: '/talent-development', label: t('nav.talentDevelopment') },
    { path: '/community-engagement', label: t('nav.communityEngagement') },
    { path: '/surveys', label: t('nav.surveys') },
    { path: '/scientific-research', label: t('nav.scientificResearch') },
    { path: '/arts-creativity', label: t('nav.artsCreativity') },
    { path: '/job-opportunities', label: t('nav.jobOpportunities') },
    { path: '/activity-schedule', label: t('nav.activitySchedule') },
    { path: '/about', label: t('nav.about') },
    { path: '/contact', label: t('nav.contact') },
    { path: '/partners', label: t('nav.partners') },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Empty Space */}
          <div className="flex-shrink-0 w-10"></div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center flex-1">
            <div className="flex items-center justify-between w-full max-w-5xl">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={clsx(
                    'text-sm font-medium transition-colors whitespace-nowrap px-2',
                    isActive(link.path)
                      ? 'text-black dark:text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-black dark:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={clsx(
                    'block px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                    isActive(link.path)
                      ? 'bg-gray-100 dark:bg-gray-800 text-black dark:text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
