import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LogIn } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';
import Alert from '../../components/common/Alert';
import LanguageSwitcher from '../../components/common/LanguageSwitcher';
import ThemeToggle from '../../components/common/ThemeToggle';
import toast from 'react-hot-toast';

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login, loading } = useAuthStore();
  
  const [formData, setFormData] = useState({
    email: 'admin@survey.com',
    password: 'admin123',
  });
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = t('validation.required');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('validation.email');
    }
    
    if (!formData.password) {
      newErrors.password = t('validation.required');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    
    if (!validateForm()) return;
    
    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      toast.success(t('auth.loginSuccess'));
      navigate('/admin');
    } else {
      setLoginError(result.error || t('auth.loginError'));
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="absolute top-4 right-4 ltr:right-4 rtl:left-4 flex items-center gap-2 sm:gap-3">
        <ThemeToggle />
        <LanguageSwitcher />
      </div>
      
      <Card className="w-full max-w-md mx-auto">
        <div className="flex flex-col items-center mb-6 sm:mb-8">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary-600 rounded-full flex items-center justify-center mb-3 sm:mb-4">
            <LogIn className="text-white" size={28} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2 text-start">
            {t('auth.adminLogin')}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 text-start">
            {t('auth.welcomeBack')}
          </p>
        </div>
        
        {loginError && (
          <Alert 
            type="error" 
            message={loginError} 
            onClose={() => setLoginError('')}
            className="mb-6"
          />
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <Input
            label={t('auth.email')}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            fullWidth
            required
            placeholder="admin@survey.com"
          />
          
          <Input
            label={t('auth.password')}
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            fullWidth
            required
            placeholder="••••••••"
          />
          
          <Button
            type="submit"
            fullWidth
            loading={loading}
            size="lg"
            className="!mt-6"
          >
            {t('auth.loginButton')}
          </Button>
        </form>
        
        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center">
            Demo Credentials:<br />
            <strong>Email:</strong> admin@survey.com<br />
            <strong>Password:</strong> admin123
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Login;
