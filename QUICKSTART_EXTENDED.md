# Quick Start Guide - Extended Survey System

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- Project dependencies installed (`npm install`)

### Starting the Development Server

```bash
npm run dev
```

The application will start at `http://localhost:5173`

## 🌐 Public Website

### Accessing Public Pages

Visit these URLs in your browser:

- **Home**: http://localhost:5173/
- **Talent Development**: http://localhost:5173/talent-development
- **Community Engagement**: http://localhost:5173/community-engagement
- **Surveys**: http://localhost:5173/surveys
- **Scientific Research**: http://localhost:5173/scientific-research
- **Arts & Creativity**: http://localhost:5173/arts-creativity
- **Job Opportunities**: http://localhost:5173/job-opportunities
- **Activity Schedule**: http://localhost:5173/activity-schedule
- **About Us**: http://localhost:5173/about
- **Contact**: http://localhost:5173/contact
- **Partners**: http://localhost:5173/partners

### Features on Public Pages
- ✅ Navigation menu with all pages
- ✅ Language switcher (EN/AR/KU)
- ✅ Dark mode toggle
- ✅ Responsive design
- ✅ Dynamic content from admin

## 👨‍💼 Admin Dashboard

### Login to Admin Panel

1. Navigate to: http://localhost:5173/admin/login

2. **Default Admin Credentials**:
   - Email: `admin@example.com`
   - Password: `admin123`

### Admin Features

#### Dashboard
- Overview of surveys and responses
- Quick actions
- Recent activity

#### Manage Surveys
- Create/Edit/Delete surveys
- Add questions
- View responses
- Share survey links

#### Manage Sections ⭐ NEW
Navigate to: http://localhost:5173/admin/sections

**Create a New Section:**
1. Click "Add Section" button
2. Select the target page from dropdown
3. Fill in titles for all 3 languages:
   - Title (English)
   - Title (Arabic)
   - Title (Kurdish)
4. Fill in content for all 3 languages
5. (Optional) Add media URL:
   - Image: Direct URL to image file
   - Video: YouTube, Vimeo, or direct video URL
6. Set display order (1, 2, 3, etc.)
7. Click "Create"

**Edit a Section:**
1. Find the section in the table
2. Click the edit icon (pencil)
3. Modify any fields
4. Click "Update"

**Delete a Section:**
1. Find the section in the table
2. Click the delete icon (trash)
3. Confirm deletion

**Filter Sections:**
- Use the search box to find sections by title/content
- Use the page dropdown to filter by specific page
- Results update in real-time

## 🌍 Language Switching

### Change Language
Click the language switcher in the navbar (top right):
- **EN** - English
- **AR** - العربية (Arabic)
- **KU** - کوردی (Kurdish)

### RTL Support
When switching to Arabic or Kurdish:
- Layout automatically mirrors
- Text aligns right
- Navigation adjusts direction

## 📱 Responsive Testing

Test on different screen sizes:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

All features work seamlessly across devices.

## 🎨 Dark Mode

Toggle dark mode using the sun/moon icon in the navbar.
- Preference is saved in localStorage
- Applies to all pages
- Smooth transitions

## 📊 Sample Data

The system includes sample sections for:
- Talent Development (2 sections)
- Community Engagement (1 section)
- Scientific Research (1 section)
- Arts & Creativity (1 section)
- Job Opportunities (1 section)
- Activity Schedule (2 activities)
- About Us (1 section)
- Partners (1 section)

## 🔧 Common Tasks

### Add Content to Home Page
Home page is static. To modify:
Edit: `src/pages/public/Home.jsx`

### Add Content to Other Pages
Use the "Manage Sections" admin interface:
1. Login to admin
2. Go to "Manage Sections"
3. Create new section for desired page
4. Content appears immediately on public page

### Change Page Order
Edit the section's "order" field:
- Order 1 appears first
- Order 2 appears second
- And so on...

### Add Media to Section
In the "Media URL" field, enter:
- **Image**: `https://images.unsplash.com/photo-xyz?w=800`
- **YouTube**: `https://www.youtube.com/embed/VIDEO_ID`
- **Vimeo**: `https://player.vimeo.com/video/VIDEO_ID`
- **Direct Video**: `https://example.com/video.mp4`

### Update Translations
Edit these files:
- English: `src/locales/en/translation.json`
- Arabic: `src/locales/ar/translation.json`
- Kurdish: `src/locales/ku/translation.json`

## 🐛 Troubleshooting

### Page Not Loading
- Check browser console for errors
- Verify you're on the correct URL
- Try refreshing the page

### Content Not Appearing
- Ensure sections are created in admin
- Check that the page name matches exactly
- Verify order numbers are set

### Language Not Switching
- Clear browser cache
- Check translation files for missing keys
- Verify language code (en, ar, ku)

### Admin Cannot Login
Use default credentials:
- Email: admin@example.com
- Password: admin123

### Sections Not Saving
- Fill all required fields
- Check browser console for errors
- Verify all 3 language fields are filled

## 📞 Need Help?

Check these files for reference:
- `PROJECT_EXTENSION.md` - Complete feature documentation
- `ARCHITECTURE.md` - System architecture
- `COMPONENTS.md` - Component details

## ✅ Checklist for First Use

- [ ] Start development server
- [ ] Visit homepage
- [ ] Test navigation
- [ ] Switch languages
- [ ] Toggle dark mode
- [ ] Login to admin
- [ ] Create a test section
- [ ] View section on public page
- [ ] Edit the section
- [ ] Test on mobile device

## 🎉 You're Ready!

The extended Survey System is fully functional with:
- ✅ 11 public pages
- ✅ Admin section management
- ✅ 3 language support
- ✅ Responsive design
- ✅ Dark mode
- ✅ Original survey features

Start creating content and building your platform!
