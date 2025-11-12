import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../store/authStore';
import { useState } from 'react';
import Button from '../common/Button';
import LanguageSwitcher from '../common/LanguageSwitcher';
import ThemeToggle from '../common/ThemeToggle';
import clsx from 'clsx';

const AdminLayout = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { admin, logout } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };
  
  const menuItems = [
    {
      label: t('admin.dashboard'),
      path: '/admin/dashboard',
    },
    {
      label: t('admin.surveys'),
      path: '/admin/surveys',
    },
    {
      label: t('admin.manageSections'),
      path: '/admin/sections',
    },
  ];
  
  const isActive = (path) => {
    if (path === '/admin/dashboard') {
      return location.pathname === '/admin' || location.pathname === '/admin/dashboard';
    }
    return location.pathname.startsWith(path);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900" dir="inherit">
      {/* Top Navigation Bar */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Title */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-gray-900 dark:text-white text-start">
                  {t('common.appName')}
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 text-start">
                  {t('admin.adminPanel')}
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              {menuItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={clsx(
                    'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive(item.path)
                      ? 'bg-black dark:bg-white text-white dark:text-black'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  )}
                >
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <LanguageSwitcher />
              
              {/* User Menu - Desktop */}
              <div className="hidden md:flex items-center gap-3">
                <div className="text-end">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {admin?.full_name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {admin?.email}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                >
                  {t('auth.logout')}
                </Button>
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {mobileMenuOpen ? '✕' : '☰'}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
              <nav className="space-y-1 mb-4">
                {menuItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => {
                      navigate(item.path);
                      setMobileMenuOpen(false);
                    }}
                    className={clsx(
                      'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                      isActive(item.path)
                        ? 'bg-black dark:bg-white text-white dark:text-black'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    )}
                  >
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>

              {/* User Info - Mobile */}
              <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm font-medium text-gray-900 dark:text-white mb-1 text-start">
                  {admin?.full_name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 text-start">
                  {admin?.email}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  fullWidth
                >
                  {t('auth.logout')}
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>
      
      {/* Page Content */}
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
