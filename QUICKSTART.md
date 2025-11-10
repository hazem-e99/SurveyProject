# Survey System - Quick Start Guide

## Installation Steps

### Option 1: Using Batch Files (Recommended for Windows)

1. **Double-click `setup.bat`** to install all dependencies
2. **Double-click `start.bat`** to start the development server

### Option 2: Using Command Prompt

1. Open Command Prompt (cmd.exe)
2. Navigate to the project folder:
   ```
   cd d:\MY-Project\PrivateWork\SurveyProject
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Start the development server:
   ```
   npm run dev
   ```

### Option 3: Fix PowerShell (if you prefer PowerShell)

Run PowerShell as Administrator and execute:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Then you can use:
```powershell
npm install
npm run dev
```

## 🎯 Quick Access

Once the server is running, you can access:

- **Admin Login**: http://localhost:3000/admin/login
  - Email: `admin@survey.com`
  - Password: `admin123`

- **Example Survey**: http://localhost:3000/survey/1

## 🚀 What You Can Do

### As Admin:
1. Login with the demo credentials
2. Create new surveys
3. Add questions (MCQ or Text)
4. View responses
5. Copy shareable survey links
6. Edit/Delete surveys

### As User:
1. Open a survey link
2. Fill out the survey form
3. Submit and see thank you page

## 🌐 Language Support

Click the language switcher in the top-right corner to change between:
- English (LTR)
- Arabic (RTL)
- Kurdish (RTL)

## 🌙 Dark Mode

Click the sun/moon icon to toggle between light and dark themes.

## 📱 Test Responsiveness

The application is fully responsive. Try resizing your browser or opening on mobile devices.

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 💡 Features to Explore

### Admin Dashboard:
- ✅ Survey CRUD operations
- ✅ Question management with drag-and-drop order
- ✅ Multiple question types (MCQ with single/multiple selection, Text)
- ✅ Response viewing and analytics
- ✅ Survey status management (Draft, Active, Inactive, Completed)
- ✅ Date range for surveys
- ✅ Shareable links with one-click copy

### User Interface:
- ✅ Clean survey form with validation
- ✅ Required field indicators
- ✅ Progress indicators
- ✅ Error handling
- ✅ Success confirmation page

### Technical Features:
- ✅ Complete i18n with RTL support
- ✅ Dark mode
- ✅ Responsive design
- ✅ State management with Zustand
- ✅ Protected routes
- ✅ Toast notifications
- ✅ Loading states
- ✅ Form validation

## 🎨 Customization

### Change Primary Color:
Edit `tailwind.config.js` and modify the `primary` color values.

### Add More Languages:
1. Add translation file in `src/locales/{lang}/translation.json`
2. Update `src/i18n.js` to include the new language
3. Add language option in `LanguageSwitcher.jsx`

### Modify Mock Data:
Edit `src/services/mockData.js` to add more sample surveys and responses.

## 🔧 Troubleshooting

### Port Already in Use:
If port 3000 is busy, Vite will automatically use the next available port.

### Dependencies Issue:
Delete `node_modules` and `package-lock.json`, then run `npm install` again.

### Build Errors:
Make sure you're using Node.js version 16 or higher:
```
node --version
```

## 📝 Next Steps

1. Explore the admin dashboard
2. Create your first survey
3. Add various question types
4. Test the user survey interface
5. View submitted responses
6. Try different languages and themes

## 🎯 Key Technologies Used

- React 18 + Vite
- TailwindCSS (with dark mode)
- React Router v6
- React i18next
- Zustand (state management)
- React Hot Toast
- Lucide Icons
- date-fns

Enjoy building with Survey System! 🚀
