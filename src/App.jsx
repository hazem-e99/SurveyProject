import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import './i18n';

// Components
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';

// Admin Pages
import Login from './pages/admin/Login';
import DashboardHome from './pages/admin/DashboardHome';
import Dashboard from './pages/admin/Dashboard';
import SurveyBuilder from './pages/admin/SurveyBuilder';
import Responses from './pages/admin/Responses';

// User Pages
import SurveyPage from './pages/user/SurveyPage';
import ThankYou from './pages/user/ThankYou';

function App() {
  useEffect(() => {
    // Initialize theme
    const theme = localStorage.getItem('theme');
    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    }
  }, []);
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Navigate to="/admin/login" replace />} />
          <Route path="/admin/login" element={<Login />} />
          
          {/* User Survey Routes - MUST be before catch-all */}
          <Route path="/survey/:id" element={<SurveyPage />} />
          <Route path="/survey/:id/thank-you" element={<ThankYou />} />
          
          {/* Protected Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<DashboardHome />} />
            <Route path="create" element={<SurveyBuilder />} />
            <Route path="edit/:id" element={<SurveyBuilder />} />
            <Route path="responses" element={<Responses />} />
            <Route path="responses/:id" element={<Responses />} />
          </Route>
        </Routes>
      </BrowserRouter>
      
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'var(--toast-bg)',
            color: 'var(--toast-color)',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </>
  );
}

export default App;
