import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './i18n';

// Components
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';
import PublicLayout from './layouts/PublicLayout';
import FloatingSidebars from './components/common/FloatingSidebars';

// Admin Pages
import Login from './pages/admin/Login';
import DashboardHome from './pages/admin/DashboardHome';
import Dashboard from './pages/admin/Dashboard';
import SurveyBuilder from './pages/admin/SurveyBuilder';
import Responses from './pages/admin/Responses';
import ManageSections from './pages/admin/ManageSections';

// Public Pages
import Home from './pages/public/Home';
import TalentDevelopment from './pages/public/TalentDevelopment';
import CommunityEngagement from './pages/public/CommunityEngagement';
import ScientificResearch from './pages/public/ScientificResearch';
import ArtsCreativity from './pages/public/ArtsCreativity';
import JobOpportunities from './pages/public/JobOpportunities';
import ActivitySchedule from './pages/public/ActivitySchedule';
import AboutUs from './pages/public/AboutUs';
import ContactUs from './pages/public/ContactUs';
import Partners from './pages/public/Partners';
import SurveysList from './pages/public/SurveysList';

// User Pages
import SurveyPage from './pages/user/SurveyPage';
import ThankYou from './pages/user/ThankYou';

function App() {
  const { i18n } = useTranslation();
  
  useEffect(() => {
    // Initialize theme
    const theme = localStorage.getItem('theme');
    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    }
  }, []);
  
  // Handle RTL/LTR direction based on language
  useEffect(() => {
    const rtlLanguages = ['ar', 'ku'];
    const isRTL = rtlLanguages.includes(i18n.language);
    
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);
  
  return (
    <>
      <FloatingSidebars />
      <BrowserRouter>
        <Routes>
          {/* Public Routes with Layout */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<ActivitySchedule />} />
            <Route path="/home" element={<Home />} />
            <Route path="/talent-development" element={<TalentDevelopment />} />
            <Route path="/community-engagement" element={<CommunityEngagement />} />
            <Route path="/surveys" element={<SurveysList />} />
            <Route path="/scientific-research" element={<ScientificResearch />} />
            <Route path="/arts-creativity" element={<ArtsCreativity />} />
            <Route path="/job-opportunities" element={<JobOpportunities />} />
            <Route path="/activity-schedule" element={<ActivitySchedule />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/partners" element={<Partners />} />
          </Route>

          {/* Admin Login */}
          <Route path="/admin/login" element={<Login />} />
          
          {/* User Survey Routes */}
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
            <Route index element={<DashboardHome />} />
            <Route path="dashboard" element={<DashboardHome />} />
            <Route path="surveys" element={<Dashboard />} />
            <Route path="surveys/create" element={<SurveyBuilder />} />
            <Route path="surveys/edit/:id" element={<SurveyBuilder />} />
            <Route path="responses" element={<Responses />} />
            <Route path="responses/:id" element={<Responses />} />
            <Route path="sections" element={<ManageSections />} />
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
