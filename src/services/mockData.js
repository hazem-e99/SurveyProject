// Helper functions for localStorage persistence
const STORAGE_KEY = 'survey-mock-data';

const loadFromStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading data from localStorage:', error);
  }
  return null;
};

const saveToStorage = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving data to localStorage:', error);
  }
};

// Initial data structure
const initialData = {
  admins: [
    {
      id: 1,
      username: 'admin',
      email: 'admin@survey.com',
      password_hash: 'admin123', // In real app, this would be hashed
      full_name: 'System Administrator',
      created_at: '2024-01-01T00:00:00Z',
    },
  ],
  
  polls: [
    {
      id: 1,
      title: {
        ar: 'استطلاع رضا العملاء',
        en: 'Customer Satisfaction Survey',
        ku: 'ڕاپرسی ڕەزامەندی کڕیاران'
      },
      description: {
        ar: 'ساعدنا في تحسين خدماتنا من خلال مشاركة ملاحظاتك',
        en: 'Help us improve our services by sharing your feedback',
        ku: 'یارمەتیمان بدە بۆ باشترکردنی خزمەتگوزارییەکانمان بە هاوبەشکردنی بۆچوونەکانت'
      },
      admin_id: 1,
      status: 'active',
      start_date: '2024-01-01T00:00:00Z',
      end_date: '2024-12-31T23:59:59Z',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
    },
    {
      id: 2,
      title: {
        ar: 'استطلاع رأي عن المنتج',
        en: 'Product Feedback',
        ku: 'ڕاپرسی بۆچوون دەربارەی بەرهەم'
      },
      description: {
        ar: 'أخبرنا برأيك حول أحدث منتجاتنا',
        en: 'Tell us what you think about our latest product',
        ku: 'پێمان بڵێ بۆچوونت چییە دەربارەی نوێترین بەرهەمەکەمان'
      },
      admin_id: 1,
      status: 'active',
      start_date: '2024-01-15T00:00:00Z',
      end_date: '2024-06-30T23:59:59Z',
      created_at: '2024-01-15T00:00:00Z',
      updated_at: '2024-01-15T00:00:00Z',
    },
  ],
  
  questions: [
    {
      id: 1,
      poll_id: 1,
      question_text: {
        ar: 'ما مدى رضاك عن خدمتنا؟',
        en: 'How satisfied are you with our service?',
        ku: 'چەند ڕازیت لە خزمەتگوزارییەکەمان؟'
      },
      question_type: 'mcq',
      order_number: 1,
      is_required: true,
      allow_multiple_selections: false,
      max_selections: 1,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
    },
    {
      id: 2,
      poll_id: 1,
      question_text: {
        ar: 'ما الذي يمكننا تحسينه؟',
        en: 'What can we improve?',
        ku: 'چی دەتوانین باشتر بکەین؟'
      },
      question_type: 'text',
      order_number: 2,
      is_required: false,
      allow_multiple_selections: false,
      max_selections: null,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
    },
    {
      id: 3,
      poll_id: 2,
      question_text: {
        ar: 'ما هي الميزات التي تستخدمها أكثر؟',
        en: 'Which features do you use most?',
        ku: 'کام تایبەتمەندییەکان زیاتر بەکاردێنیت؟'
      },
      question_type: 'mcq',
      order_number: 1,
      is_required: true,
      allow_multiple_selections: true,
      max_selections: 3,
      created_at: '2024-01-15T00:00:00Z',
      updated_at: '2024-01-15T00:00:00Z',
    },
  ],
  
  mcq_options: [
    { id: 1, question_id: 1, option_text: { ar: 'راضٍ جداً', en: 'Very Satisfied', ku: 'زۆر ڕازیم' }, order_number: 1, created_at: '2024-01-01T00:00:00Z' },
    { id: 2, question_id: 1, option_text: { ar: 'راضٍ', en: 'Satisfied', ku: 'ڕازیم' }, order_number: 2, created_at: '2024-01-01T00:00:00Z' },
    { id: 3, question_id: 1, option_text: { ar: 'محايد', en: 'Neutral', ku: 'بێلایەن' }, order_number: 3, created_at: '2024-01-01T00:00:00Z' },
    { id: 4, question_id: 1, option_text: { ar: 'غير راضٍ', en: 'Dissatisfied', ku: 'ڕازی نیم' }, order_number: 4, created_at: '2024-01-01T00:00:00Z' },
    { id: 5, question_id: 1, option_text: { ar: 'غير راضٍ جداً', en: 'Very Dissatisfied', ku: 'زۆر ڕازی نیم' }, order_number: 5, created_at: '2024-01-01T00:00:00Z' },
    { id: 6, question_id: 3, option_text: { ar: 'لوحة التحكم', en: 'Dashboard', ku: 'داشبۆرد' }, order_number: 1, created_at: '2024-01-15T00:00:00Z' },
    { id: 7, question_id: 3, option_text: { ar: 'التقارير', en: 'Reports', ku: 'ڕاپۆرتەکان' }, order_number: 2, created_at: '2024-01-15T00:00:00Z' },
    { id: 8, question_id: 3, option_text: { ar: 'التحليلات', en: 'Analytics', ku: 'شیکاری' }, order_number: 3, created_at: '2024-01-15T00:00:00Z' },
    { id: 9, question_id: 3, option_text: { ar: 'الإعدادات', en: 'Settings', ku: 'ڕێکخستنەکان' }, order_number: 4, created_at: '2024-01-15T00:00:00Z' },
  ],
  
  responses: [
    {
      id: 1,
      poll_id: 1,
      session_id: 'session_123',
      ip_address: '192.168.1.1',
      user_agent: 'Mozilla/5.0...',
      submitted_at: '2024-01-10T10:30:00Z',
    },
    {
      id: 2,
      poll_id: 1,
      session_id: 'session_456',
      ip_address: '192.168.1.2',
      user_agent: 'Mozilla/5.0...',
      submitted_at: '2024-01-11T14:20:00Z',
    },
  ],
  
  mcq_answers: [
    { id: 1, response_id: 1, question_id: 1, option_id: 1, answered_at: '2024-01-10T10:30:00Z' },
    { id: 2, response_id: 2, question_id: 1, option_id: 2, answered_at: '2024-01-11T14:20:00Z' },
  ],
  
  text_answers: [
    { id: 1, response_id: 1, question_id: 2, answer_text: 'Better mobile app', answered_at: '2024-01-10T10:30:00Z' },
    { id: 2, response_id: 2, question_id: 2, answer_text: 'Faster response times', answered_at: '2024-01-11T14:20:00Z' },
  ],
};

// Load data from localStorage or use initial data
const storedData = loadFromStorage();
export const mockDB = storedData || initialData;

// Save initial data if not exists
if (!storedData) {
  saveToStorage(mockDB);
}

// Helper to save data after changes
export const saveMockDB = () => {
  saveToStorage(mockDB);
};

// Helper to generate IDs
const initialNextId = {
  polls: 3,
  questions: 4,
  mcq_options: 10,
  responses: 3,
  mcq_answers: 3,
  text_answers: 3,
};

const storedNextId = storedData ? {
  polls: Math.max(...mockDB.polls.map(p => p.id), 0) + 1,
  questions: Math.max(...mockDB.questions.map(q => q.id), 0) + 1,
  mcq_options: Math.max(...mockDB.mcq_options.map(o => o.id), 0) + 1,
  responses: Math.max(...mockDB.responses.map(r => r.id), 0) + 1,
  mcq_answers: Math.max(...mockDB.mcq_answers.map(a => a.id), 0) + 1,
  text_answers: Math.max(...mockDB.text_answers.map(a => a.id), 0) + 1,
} : initialNextId;

let nextId = storedNextId;

export const generateId = (entity) => {
  return nextId[entity]++;
};

// Simulate API delay
export const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));
