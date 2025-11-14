import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Modal from '../../components/common/Modal';
import Loading from '../../components/common/Loading';
import { sectionService } from '../../services/sectionService';
import toast from 'react-hot-toast';
import MultiLangInput from '../../components/common/MultiLangInput';
import Textarea from '../../components/common/Textarea';

const ManageSections = () => {
  const { t, i18n } = useTranslation();
  const [sections, setSections] = useState([]);
  const [filteredSections, setFilteredSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPage, setFilterPage] = useState('all');
  const [formData, setFormData] = useState({
    page: '',
    title_en: '',
    title_ar: '',
    title_ku: '',
    content_en: '',
    content_ar: '',
    content_ku: '',
    media: '',
    order: 1,
  });

  const pageOptions = [
    { value: 'all', label: t('common.all') },
    { value: 'talent-development', label: t('pages.talentDevelopment.title') || 'Talent Development' },
    { value: 'community-engagement', label: t('pages.communityEngagement.title') || 'Community Engagement' },
    { value: 'scientific-research', label: t('pages.scientificResearch.title') || 'Scientific Research' },
    { value: 'arts-creativity', label: t('pages.artsCreativity.title') || 'Arts & Creativity' },
    { value: 'job-opportunities', label: t('pages.jobOpportunities.title') || 'Job Opportunities' },
    { value: 'activity-schedule', label: t('pages.activitySchedule.title') || 'Activity Schedule' },
    { value: 'about', label: t('pages.about.title') || 'About Us' },
    { value: 'contact', label: t('pages.contact.title') || 'Contact Us' },
    { value: 'partners', label: t('pages.partners.title') || 'Partners' },
  ];

  useEffect(() => {
    fetchSections();
  }, []);

  useEffect(() => {
    filterSections();
  }, [sections, searchTerm, filterPage, i18n.language]);

  const fetchSections = async () => {
    try {
      setLoading(true);
      const data = await sectionService.getAllSections();
      setSections(data);
    } catch (error) {
      toast.error(t('admin.errorFetchingSections'));
      console.error('Error fetching sections:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterSections = () => {
    let filtered = [...sections];

    // Filter by page
    if (filterPage !== 'all') {
      filtered = filtered.filter((s) => s.page === filterPage);
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter((s) => {
        const title = s[`title_${i18n.language}`] || s.title_en || '';
        const content = s[`content_${i18n.language}`] || s.content_en || '';
        return title.toLowerCase().includes(term) || content.toLowerCase().includes(term);
      });
    }

    setFilteredSections(filtered);
  };

  const handleOpenModal = (section = null) => {
    if (section) {
      setEditingSection(section);
      setFormData({
        page: section.page,
        title_en: section.title_en,
        title_ar: section.title_ar,
        title_ku: section.title_ku,
        content_en: section.content_en,
        content_ar: section.content_ar,
        content_ku: section.content_ku,
        media: section.media || '',
        order: section.order,
      });
    } else {
      setEditingSection(null);
      setFormData({
        page: '',
        title_en: '',
        title_ar: '',
        title_ku: '',
        content_en: '',
        content_ar: '',
        content_ku: '',
        media: '',
        order: 1,
      });
    }
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingSection(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingSection) {
        await sectionService.updateSection(editingSection.id, formData);
        toast.success(t('admin.sectionUpdated'));
      } else {
        await sectionService.createSection(formData);
        toast.success(t('admin.sectionCreated'));
      }
      handleCloseModal();
      fetchSections();
    } catch (error) {
      toast.error(t('admin.errorSavingSection'));
      console.error('Error saving section:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(t('admin.confirmDelete'))) return;

    try {
      await sectionService.deleteSection(id);
      toast.success(t('admin.sectionDeleted'));
      fetchSections();
    } catch (error) {
      toast.error(t('admin.errorDeletingSection'));
      console.error('Error deleting section:', error);
    }
  };

  const getPageLabel = (page) => {
    const option = pageOptions.find((o) => o.value === page);
    return option ? option.label : page;
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white text-start">
            {t('admin.manageSections')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1 text-start">
            {t('admin.manageSectionsDesc')}
          </p>
        </div>
        <Button onClick={() => handleOpenModal()}>
          {t('admin.addSection')}
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Input
              type="text"
              placeholder={t('common.search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select
            value={filterPage}
            onChange={(e) => setFilterPage(e.target.value)}
          >
            {pageOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>
      </Card>

      {/* Sections Table */}
      <Card>
        {filteredSections.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">{t('admin.noSectionsFound')}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    {t('admin.page')}
                  </th>
                  <th className="px-4 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    {t('admin.title')}
                  </th>
                  <th className="px-4 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    {t('admin.order')}
                  </th>
                  <th className="px-4 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    {t('admin.media')}
                  </th>
                  <th className="px-4 py-3 text-end text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    {t('admin.actions')}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredSections.map((section) => {
                  const title = section[`title_${i18n.language}`] || section.title_en;
                  return (
                    <tr key={section.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="px-4 py-4 text-sm text-gray-900 dark:text-white text-start">
                        {getPageLabel(section.page)}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900 dark:text-white text-start">
                        {title}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900 dark:text-white text-start">
                        {section.order}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900 dark:text-white text-start">
                        {section.media ? (
                          <span className="text-green-600 dark:text-green-400">✓</span>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                      <td className="px-4 py-4 text-sm text-end">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleOpenModal(section)}
                          >
                            {t('admin.edit')}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(section.id)}
                          >
                            {t('admin.delete')}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        title={editingSection ? t('admin.editSection') : t('admin.addSection')}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Page Selection */}
          <Select
            label={t('admin.page')}
            name="page"
            value={formData.page}
            onChange={handleChange}
            required
          >
            <option value="">{t('admin.selectPage')}</option>
            {pageOptions.slice(1).map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>

          {/* Multilingual Titles */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-start">
              {t('admin.title')}
            </label>
            <div className="space-y-3">
              <Input
                placeholder={t('admin.titleEn')}
                name="title_en"
                value={formData.title_en}
                onChange={handleChange}
                required
              />
              <Input
                placeholder={t('admin.titleAr')}
                name="title_ar"
                value={formData.title_ar}
                onChange={handleChange}
                required
              />
              <Input
                placeholder={t('admin.titleKu')}
                name="title_ku"
                value={formData.title_ku}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Multilingual Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-start">
              {t('admin.content')}
            </label>
            <div className="space-y-3">
              <Textarea
                placeholder={t('admin.contentEn')}
                name="content_en"
                value={formData.content_en}
                onChange={handleChange}
                rows={4}
                required
              />
              <Textarea
                placeholder={t('admin.contentAr')}
                name="content_ar"
                value={formData.content_ar}
                onChange={handleChange}
                rows={4}
                required
              />
              <Textarea
                placeholder={t('admin.contentKu')}
                name="content_ku"
                value={formData.content_ku}
                onChange={handleChange}
                rows={4}
                required
              />
            </div>
          </div>

          {/* Media URL */}
          <Input
            label={t('admin.mediaUrl')}
            name="media"
            value={formData.media}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />

          {/* Order */}
          <Input
            label={t('admin.order')}
            type="number"
            name="order"
            value={formData.order}
            onChange={handleChange}
            min="1"
            required
          />

          {/* Actions */}
          <div className="flex gap-3 justify-end">
            <Button type="button" variant="outline" onClick={handleCloseModal}>
              {t('common.cancel')}
            </Button>
            <Button type="submit">
              {editingSection ? t('common.update') : t('common.create')}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ManageSections;
