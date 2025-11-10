import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LayoutDashboard, LogOut, FileText, MessageSquare, BarChart3, Menu, X } from 'lucide-react';
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };
  
  const menuItems = [
    {
      icon: LayoutDashboard,
      label: t('admin.dashboard'),
      path: '/admin/dashboard',
    },
    {
      icon: FileText,
      label: t('admin.surveys'),
      path: '/admin/surveys',
    },
  ];
  
  const isActive = (path) => {
    if (path === '/admin/dashboard') {
      return location.pathname === '/admin' || location.pathname === '/admin/dashboard';
    }
    return location.pathname.startsWith(path);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex" dir="inherit">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 ltr:left-0 rtl:right-0 bg-white dark:bg-gray-800 ltr:border-r rtl:border-l border-gray-200 dark:border-gray-700 z-30">
        <div className="flex items-center gap-3 px-4 xl:px-6 h-16 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          <div className="w-9 h-9 xl:w-10 xl:h-10 bg-primary-600 rounded-lg flex items-center justify-center">
            <FileText className="text-white" size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-base xl:text-lg font-bold text-gray-900 dark:text-white truncate text-start">
              {t('common.appName')}
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate text-start">
              {t('admin.adminPanel')}
            </p>
          </div>
        </div>
        
        <nav className="flex-1 px-3 xl:px-4 py-4 xl:py-6 space-y-1 xl:space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={clsx(
                'w-full flex items-center gap-2 xl:gap-3 px-3 xl:px-4 py-2.5 xl:py-3 rounded-lg text-sm font-medium transition-colors',
                isActive(item.path)
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              )}
            >
              <item.icon size={18} className="flex-shrink-0" />
              <span className="truncate">{item.label}</span>
            </button>
          ))}
        </nav>
        
        <div className="p-3 xl:p-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
          <div className="flex items-center gap-2 xl:gap-3 mb-3">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate text-start">
                {admin?.full_name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate text-start">
                {admin?.email}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            fullWidth
            className="justify-center"
          >
            <LogOut size={16} />
            <span className="ml-2">{t('auth.logout')}</span>
          </Button>
        </div>
      </aside>
      
      {/* Sidebar - Mobile */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-gray-900/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)}>
          <aside className="fixed inset-y-0 ltr:left-0 rtl:right-0 w-72 sm:w-80 bg-white dark:bg-gray-800 ltr:border-r rtl:border-l border-gray-200 dark:border-gray-700 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-4 sm:px-6 h-16 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="text-white" size={22} />
                </div>
                <div className="flex-1 min-w-0">
                  <h1 className="text-lg font-bold text-gray-900 dark:text-white truncate text-start">
                    {t('common.appName')}
                  </h1>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex-shrink-0"
              >
                <X size={20} />
              </button>
            </div>
            
            <nav className="px-4 py-6 space-y-2 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 180px)' }}>
              {menuItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setSidebarOpen(false);
                  }}
                  className={clsx(
                    'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                    isActive(item.path)
                      ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  )}
                >
                  <item.icon size={20} className="flex-shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              ))}
            </nav>
            
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <div className="mb-3">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate text-start">
                  {admin?.full_name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate text-start">
                  {admin?.email}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                fullWidth
                className="justify-center"
              >
                <LogOut size={16} />
                <span className="ml-2">{t('auth.logout')}</span>
              </Button>
            </div>
          </aside>
        </div>
      )}
      
      {/* Main Content */}
      <div className="flex-1 ltr:lg:ml-64 rtl:lg:mr-64">
        {/* Header - Mobile */}
        <header className="lg:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
          <div className="px-4 h-14 sm:h-16 flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 -ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Menu size={22} />
            </button>
            
            <div className="flex items-center gap-2 sm:gap-3">
              <ThemeToggle />
              <LanguageSwitcher />
            </div>
          </div>
        </header>
        
        {/* Header - Desktop */}
        <header className="hidden lg:block bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
          <div className="px-6 xl:px-8 h-16 flex items-center justify-end gap-3 xl:gap-4">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
        </header>
        
        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-6 xl:p-8 max-w-full overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
