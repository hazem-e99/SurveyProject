import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Textarea from '../../components/common/Textarea';
import toast from 'react-hot-toast';

const ContactUs = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    toast.success(t('pages.contact.successMessage'));
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-black dark:text-white">
            {t('pages.contact.title')}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-center text-gray-600 dark:text-gray-400">
            {t('pages.contact.subtitle')}
          </p>
        </div>
      </div>

      {/* Contact Content */}
      <div className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-black dark:text-white mb-6 text-start">
                  {t('pages.contact.getInTouch')}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-start leading-relaxed">
                  {t('pages.contact.description')}
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="text-start">
                    <h3 className="font-semibold text-black dark:text-white mb-1">
                      {t('pages.contact.email')}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400" dir="ltr">post@pg4all.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-start">
                    <h3 className="font-semibold text-black dark:text-white mb-1">
                      {t('pages.contact.phone')}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400" dir="ltr">00964 750 422 77 33</p>
                    <p className="text-gray-600 dark:text-gray-400 mt-1" dir="ltr">00964 750 422 33 88</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-start">
                    <h3 className="font-semibold text-black dark:text-white mb-1">
                      {t('pages.contact.address')}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">{t('footer.addressText')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-black dark:text-white mb-6 text-start">
                {t('pages.contact.sendMessage')}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  label={t('pages.contact.name')}
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <Input
                  label={t('pages.contact.emailLabel')}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <Input
                  label={t('pages.contact.subject')}
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
                <Textarea
                  label={t('pages.contact.messageLabel')}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  required
                />
                <Button type="submit" fullWidth>
                  {t('pages.contact.send')}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
