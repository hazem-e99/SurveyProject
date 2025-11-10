# Survey System - Frontend

A complete, production-ready frontend application for a Survey System built with React, Vite, TailwindCSS, and i18n support.

## 🚀 Features

### Admin Dashboard
- **Authentication**: Secure login for administrators
- **Survey Management**: Full CRUD operations for surveys
- **Question Builder**: Create MCQ and text-based questions
- **Response Tracking**: View and analyze survey responses
- **Shareable Links**: Generate unique links for each survey

### User Interface
- **Survey Form**: Clean, intuitive survey completion interface
- **Question Types**: 
  - Multiple Choice Questions (single/multiple selection)
  - Text-based questions
- **Validation**: Real-time form validation
- **Success Page**: Thank you page after submission

### Internationalization (i18n)
- **3 Languages**: English, Arabic (RTL), Kurdish (RTL)
- **Auto Direction**: Automatic RTL/LTR switching
- **Language Switcher**: Easy language selection

### Design Features
- **Dark Mode**: Complete dark mode support
- **Responsive**: Mobile-first responsive design
- **Modern UI**: Clean, professional interface with Tailwind CSS
- **Accessibility**: ARIA labels and keyboard navigation

## 📁 Project Structure

```
src/
├── components/
│   ├── common/           # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Textarea.jsx
│   │   ├── Select.jsx
│   │   ├── Checkbox.jsx
│   │   ├── Radio.jsx
│   │   ├── Card.jsx
│   │   ├── Modal.jsx
│   │   ├── Loading.jsx
│   │   ├── Alert.jsx
│   │   ├── LanguageSwitcher.jsx
│   │   └── ThemeToggle.jsx
│   ├── admin/            # Admin-specific components
│   │   └── AdminLayout.jsx
│   └── ProtectedRoute.jsx
├── pages/
│   ├── admin/            # Admin pages
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── SurveyBuilder.jsx
│   │   └── Responses.jsx
│   └── user/             # User pages
│       ├── SurveyPage.jsx
│       └── ThankYou.jsx
├── services/             # API services
│   ├── mockData.js
│   ├── authService.js
│   ├── pollService.js
│   ├── questionService.js
│   └── responseService.js
├── store/                # State management (Zustand)
│   ├── authStore.js
│   ├── surveyStore.js
│   └── responseStore.js
├── locales/              # Translations
│   ├── en/translation.json
│   ├── ar/translation.json
│   └── ku/translation.json
├── i18n.js              # i18n configuration
├── App.jsx              # Main app component
├── main.jsx             # Entry point
└── index.css            # Global styles
```

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **React Router DOM** - Routing
- **React i18next** - Internationalization
- **Zustand** - State management
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **Lucide React** - Icons
- **date-fns** - Date formatting
- **clsx** - Conditional classes

## 🚦 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

The application will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🔑 Demo Credentials

**Admin Login:**
- Email: `admin@survey.com`
- Password: `admin123`

## 📊 Data Model

The application uses a mock API with the following structure:

### Tables
- **admins**: Admin user accounts
- **polls**: Survey definitions
- **questions**: Survey questions
- **mcq_options**: Multiple choice options
- **responses**: User submissions
- **mcq_answers**: MCQ responses
- **text_answers**: Text responses

### Relationships
- One Admin → Many Polls
- One Poll → Many Questions
- One Question → Many Options
- One Poll → Many Responses
- One Response → Many Answers

## 🌐 Routes

### Public Routes
- `/admin/login` - Admin login
- `/survey/:id` - Survey form
- `/survey/:id/thank-you` - Success page

### Protected Admin Routes
- `/admin` - Dashboard
- `/admin/surveys/new` - Create survey
- `/admin/surveys/:id` - Edit survey
- `/admin/responses/:id` - View responses

## 🎨 Customization

### Theme Colors
Edit `tailwind.config.js` to customize the color scheme:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom colors
      }
    }
  }
}
```

### Translations
Add or modify translations in `src/locales/{lang}/translation.json`

## 📝 Key Features Implementation

### Form Validation
- Real-time validation
- Required field checking
- Custom error messages

### State Management
- Zustand for global state
- Persistent auth state
- Optimistic UI updates

### Accessibility
- ARIA labels
- Keyboard navigation
- Focus management
- Screen reader support

### Performance
- Code splitting
- Lazy loading
- Optimized re-renders
- Efficient state updates

## 🔒 Security Notes

**Important**: This is a demo application using mock authentication. For production:
- Implement proper backend authentication
- Use secure password hashing
- Add CSRF protection
- Implement rate limiting
- Use HTTPS only

## 🐛 Known Limitations

- Mock API (no real backend)
- No file uploads
- No email notifications
- No analytics dashboard
- Simple authentication (demo only)

## 📄 License

This project is created for demonstration purposes.

## 🤝 Contributing

This is a demo project. Feel free to fork and customize for your needs.

## 📧 Support

For questions or issues, please create an issue in the repository.

---

**Built with ❤️ using React + Vite + TailwindCSS**
