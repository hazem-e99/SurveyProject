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
      id: 4,
      poll_id: 1,
      question_text: {
        ar: 'كم من الوقت كنت تستخدم خدماتنا؟',
        en: 'How long have you been using our services?',
        ku: 'چەندە کاتە خزمەتگوزارییەکانمان بەکاردەهێنیت؟'
      },
      question_type: 'mcq',
      order_number: 3,
      is_required: true,
      allow_multiple_selections: false,
      max_selections: 1,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
    },
    {
      id: 5,
      poll_id: 1,
      question_text: {
        ar: 'كيف تقيم سرعة الاستجابة لفريق الدعم؟',
        en: 'How would you rate the support team response speed?',
        ku: 'خێرایی وەڵامدانەوەی تیمی پشتگیری چۆن هەڵدەسەنگێنیت؟'
      },
      question_type: 'mcq',
      order_number: 4,
      is_required: true,
      allow_multiple_selections: false,
      max_selections: 1,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
    },
    {
      id: 6,
      poll_id: 1,
      question_text: {
        ar: 'ما مدى سهولة استخدام منصتنا؟',
        en: 'How easy is it to use our platform?',
        ku: 'چەند ئاسانە بەکارهێنانی پلاتفۆرمەکەمان؟'
      },
      question_type: 'mcq',
      order_number: 5,
      is_required: true,
      allow_multiple_selections: false,
      max_selections: 1,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
    },
    {
      id: 7,
      poll_id: 1,
      question_text: {
        ar: 'هل تنصح بخدماتنا للآخرين؟',
        en: 'Would you recommend our services to others?',
        ku: 'ئایا خزمەتگوزارییەکانمان پێشنیار بە کەسانی تر دەکەیت؟'
      },
      question_type: 'mcq',
      order_number: 6,
      is_required: true,
      allow_multiple_selections: false,
      max_selections: 1,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
    },
    {
      id: 8,
      poll_id: 1,
      question_text: {
        ar: 'ما هي أكثر ميزة تعجبك في خدماتنا؟',
        en: 'What feature do you like most about our services?',
        ku: 'کامە تایبەتمەندی زیاتر لە خزمەتگوزارییەکانمان حەز لێی دەکەیت؟'
      },
      question_type: 'mcq',
      order_number: 7,
      is_required: false,
      allow_multiple_selections: true,
      max_selections: 3,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
    },
    {
      id: 9,
      poll_id: 1,
      question_text: {
        ar: 'كيف تقيم جودة المحتوى المقدم؟',
        en: 'How would you rate the quality of content provided?',
        ku: 'کوالیتی ناوەڕۆکی پێشکەشکراو چۆن هەڵدەسەنگێنیت؟'
      },
      question_type: 'mcq',
      order_number: 8,
      is_required: true,
      allow_multiple_selections: false,
      max_selections: 1,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
    },
    {
      id: 10,
      poll_id: 1,
      question_text: {
        ar: 'ما مدى رضاك عن التسعير؟',
        en: 'How satisfied are you with our pricing?',
        ku: 'چەند ڕازیت لە نرخەکانمان؟'
      },
      question_type: 'mcq',
      order_number: 9,
      is_required: true,
      allow_multiple_selections: false,
      max_selections: 1,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
    },
    {
      id: 11,
      poll_id: 1,
      question_text: {
        ar: 'هل لديك أي ملاحظات أو اقتراحات إضافية؟',
        en: 'Do you have any additional comments or suggestions?',
        ku: 'ئایا هیچ بۆچوون یان پێشنیارێکی زیاترت هەیە؟'
      },
      question_type: 'text',
      order_number: 10,
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
    // Question 4 options - Duration
    { id: 10, question_id: 4, option_text: { ar: 'أقل من شهر', en: 'Less than a month', ku: 'کەمتر لە مانگێک' }, order_number: 1, created_at: '2024-01-01T00:00:00Z' },
    { id: 11, question_id: 4, option_text: { ar: '1-3 أشهر', en: '1-3 months', ku: '1-3 مانگ' }, order_number: 2, created_at: '2024-01-01T00:00:00Z' },
    { id: 12, question_id: 4, option_text: { ar: '3-6 أشهر', en: '3-6 months', ku: '3-6 مانگ' }, order_number: 3, created_at: '2024-01-01T00:00:00Z' },
    { id: 13, question_id: 4, option_text: { ar: '6-12 شهر', en: '6-12 months', ku: '6-12 مانگ' }, order_number: 4, created_at: '2024-01-01T00:00:00Z' },
    { id: 14, question_id: 4, option_text: { ar: 'أكثر من سنة', en: 'More than a year', ku: 'زیاتر لە ساڵێک' }, order_number: 5, created_at: '2024-01-01T00:00:00Z' },
    // Question 5 options - Support Response
    { id: 15, question_id: 5, option_text: { ar: 'ممتاز', en: 'Excellent', ku: 'نایاب' }, order_number: 1, created_at: '2024-01-01T00:00:00Z' },
    { id: 16, question_id: 5, option_text: { ar: 'جيد جداً', en: 'Very Good', ku: 'زۆر باش' }, order_number: 2, created_at: '2024-01-01T00:00:00Z' },
    { id: 17, question_id: 5, option_text: { ar: 'جيد', en: 'Good', ku: 'باش' }, order_number: 3, created_at: '2024-01-01T00:00:00Z' },
    { id: 18, question_id: 5, option_text: { ar: 'مقبول', en: 'Fair', ku: 'قبووڵکراو' }, order_number: 4, created_at: '2024-01-01T00:00:00Z' },
    { id: 19, question_id: 5, option_text: { ar: 'ضعيف', en: 'Poor', ku: 'خراپ' }, order_number: 5, created_at: '2024-01-01T00:00:00Z' },
    // Question 6 options - Ease of Use
    { id: 20, question_id: 6, option_text: { ar: 'سهل جداً', en: 'Very Easy', ku: 'زۆر ئاسان' }, order_number: 1, created_at: '2024-01-01T00:00:00Z' },
    { id: 21, question_id: 6, option_text: { ar: 'سهل', en: 'Easy', ku: 'ئاسان' }, order_number: 2, created_at: '2024-01-01T00:00:00Z' },
    { id: 22, question_id: 6, option_text: { ar: 'متوسط', en: 'Moderate', ku: 'مامناوەند' }, order_number: 3, created_at: '2024-01-01T00:00:00Z' },
    { id: 23, question_id: 6, option_text: { ar: 'صعب', en: 'Difficult', ku: 'سەخت' }, order_number: 4, created_at: '2024-01-01T00:00:00Z' },
    { id: 24, question_id: 6, option_text: { ar: 'صعب جداً', en: 'Very Difficult', ku: 'زۆر سەخت' }, order_number: 5, created_at: '2024-01-01T00:00:00Z' },
    // Question 7 options - Recommendation
    { id: 25, question_id: 7, option_text: { ar: 'بالتأكيد نعم', en: 'Definitely Yes', ku: 'بێگومان بەڵێ' }, order_number: 1, created_at: '2024-01-01T00:00:00Z' },
    { id: 26, question_id: 7, option_text: { ar: 'نعم', en: 'Yes', ku: 'بەڵێ' }, order_number: 2, created_at: '2024-01-01T00:00:00Z' },
    { id: 27, question_id: 7, option_text: { ar: 'ربما', en: 'Maybe', ku: 'لەوانەیە' }, order_number: 3, created_at: '2024-01-01T00:00:00Z' },
    { id: 28, question_id: 7, option_text: { ar: 'لا', en: 'No', ku: 'نەخێر' }, order_number: 4, created_at: '2024-01-01T00:00:00Z' },
    { id: 29, question_id: 7, option_text: { ar: 'بالتأكيد لا', en: 'Definitely No', ku: 'بێگومان نەخێر' }, order_number: 5, created_at: '2024-01-01T00:00:00Z' },
    // Question 8 options - Favorite Features
    { id: 30, question_id: 8, option_text: { ar: 'سهولة الاستخدام', en: 'Ease of Use', ku: 'ئاسانی بەکارهێنان' }, order_number: 1, created_at: '2024-01-01T00:00:00Z' },
    { id: 31, question_id: 8, option_text: { ar: 'الدعم الفني', en: 'Technical Support', ku: 'پشتگیری تەکنیکی' }, order_number: 2, created_at: '2024-01-01T00:00:00Z' },
    { id: 32, question_id: 8, option_text: { ar: 'السرعة', en: 'Speed', ku: 'خێرایی' }, order_number: 3, created_at: '2024-01-01T00:00:00Z' },
    { id: 33, question_id: 8, option_text: { ar: 'التصميم', en: 'Design', ku: 'دیزاین' }, order_number: 4, created_at: '2024-01-01T00:00:00Z' },
    { id: 34, question_id: 8, option_text: { ar: 'الموثوقية', en: 'Reliability', ku: 'متمانەپێکراوی' }, order_number: 5, created_at: '2024-01-01T00:00:00Z' },
    { id: 35, question_id: 8, option_text: { ar: 'التحديثات المستمرة', en: 'Regular Updates', ku: 'نوێکردنەوەی بەردەوام' }, order_number: 6, created_at: '2024-01-01T00:00:00Z' },
    // Question 9 options - Content Quality
    { id: 36, question_id: 9, option_text: { ar: 'ممتاز', en: 'Excellent', ku: 'نایاب' }, order_number: 1, created_at: '2024-01-01T00:00:00Z' },
    { id: 37, question_id: 9, option_text: { ar: 'جيد جداً', en: 'Very Good', ku: 'زۆر باش' }, order_number: 2, created_at: '2024-01-01T00:00:00Z' },
    { id: 38, question_id: 9, option_text: { ar: 'جيد', en: 'Good', ku: 'باش' }, order_number: 3, created_at: '2024-01-01T00:00:00Z' },
    { id: 39, question_id: 9, option_text: { ar: 'مقبول', en: 'Fair', ku: 'قبووڵکراو' }, order_number: 4, created_at: '2024-01-01T00:00:00Z' },
    { id: 40, question_id: 9, option_text: { ar: 'ضعيف', en: 'Poor', ku: 'خراپ' }, order_number: 5, created_at: '2024-01-01T00:00:00Z' },
    // Question 10 options - Pricing Satisfaction
    { id: 41, question_id: 10, option_text: { ar: 'راضٍ جداً', en: 'Very Satisfied', ku: 'زۆر ڕازیم' }, order_number: 1, created_at: '2024-01-01T00:00:00Z' },
    { id: 42, question_id: 10, option_text: { ar: 'راضٍ', en: 'Satisfied', ku: 'ڕازیم' }, order_number: 2, created_at: '2024-01-01T00:00:00Z' },
    { id: 43, question_id: 10, option_text: { ar: 'محايد', en: 'Neutral', ku: 'بێلایەن' }, order_number: 3, created_at: '2024-01-01T00:00:00Z' },
    { id: 44, question_id: 10, option_text: { ar: 'غير راضٍ', en: 'Dissatisfied', ku: 'ڕازی نیم' }, order_number: 4, created_at: '2024-01-01T00:00:00Z' },
    { id: 45, question_id: 10, option_text: { ar: 'غير راضٍ جداً', en: 'Very Dissatisfied', ku: 'زۆر ڕازی نیم' }, order_number: 5, created_at: '2024-01-01T00:00:00Z' },
    // Poll 2 options
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
  questions: 12,
  mcq_options: 46,
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
