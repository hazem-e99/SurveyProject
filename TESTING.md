# Testing & Validation Guide

## 🧪 Manual Testing Checklist

### Admin Authentication
- [ ] Login with correct credentials (admin@survey.com / admin123)
- [ ] Login with incorrect credentials (should show error)
- [ ] Logout functionality
- [ ] Protected routes redirect to login when not authenticated
- [ ] Session persists after page refresh

### Survey CRUD Operations

#### Create Survey
- [ ] Create survey with all required fields
- [ ] Create survey without title (should show validation error)
- [ ] Verify survey appears in dashboard
- [ ] Check survey status options (draft, active, inactive, completed)
- [ ] Verify date pickers work correctly

#### Edit Survey
- [ ] Edit survey title
- [ ] Edit survey description
- [ ] Change survey status
- [ ] Update start/end dates
- [ ] Verify changes are saved

#### Delete Survey
- [ ] Delete confirmation modal appears
- [ ] Cancel deletion (survey remains)
- [ ] Confirm deletion (survey removed)
- [ ] Verify associated questions are deleted

### Question Management

#### Add MCQ Question
- [ ] Add question with minimum 2 options
- [ ] Add question with multiple options (5+)
- [ ] Try adding question with less than 2 options (should fail)
- [ ] Toggle "Required" checkbox
- [ ] Toggle "Allow Multiple Selections"
- [ ] Set max selections for multiple choice

#### Add Text Question
- [ ] Add text question
- [ ] Toggle "Required" checkbox
- [ ] Verify no options appear for text questions

#### Edit Question
- [ ] Edit question text
- [ ] Change question type (MCQ ↔ Text)
- [ ] Edit options (add, remove, modify)
- [ ] Change required status

#### Delete Question
- [ ] Delete confirmation works
- [ ] Question removed from list

### Response Management
- [ ] View responses for a survey
- [ ] Verify response count is accurate
- [ ] Check response details show correctly
- [ ] View MCQ answers
- [ ] View text answers
- [ ] Verify timestamps are correct

### User Survey Experience

#### Survey Access
- [ ] Open survey with valid ID
- [ ] Open survey with invalid ID (should show error)
- [ ] Access inactive survey (should show error)
- [ ] Access expired survey (should show error)
- [ ] Access survey before start date (should show error)

#### Survey Form
- [ ] Display all questions correctly
- [ ] Show required field indicators (*)
- [ ] MCQ with single selection (radio buttons)
- [ ] MCQ with multiple selection (checkboxes)
- [ ] Text input fields
- [ ] Textarea for longer answers

#### Form Validation
- [ ] Submit without answering required questions (should show errors)
- [ ] Submit with all required fields filled
- [ ] Error messages appear for each invalid field
- [ ] Error messages clear when field is filled

#### Form Submission
- [ ] Submit form successfully
- [ ] Redirect to thank you page
- [ ] Verify response is saved (check in admin)
- [ ] Check response details match submitted data

### Internationalization (i18n)

#### Language Switching
- [ ] Switch to English (LTR)
- [ ] Switch to Arabic (RTL)
- [ ] Switch to Kurdish (RTL)
- [ ] Verify text direction changes
- [ ] Verify font family changes
- [ ] All UI text translates correctly

#### RTL Layout
- [ ] Check layout mirrors correctly in RTL
- [ ] Icons position correctly
- [ ] Forms align correctly
- [ ] Modals display correctly
- [ ] Navigation works in RTL

### Dark Mode
- [ ] Toggle dark mode
- [ ] All components render correctly in dark mode
- [ ] Color contrast is readable
- [ ] Theme persists after refresh
- [ ] Works with all languages

### Responsive Design

#### Mobile (< 640px)
- [ ] Login page is mobile-friendly
- [ ] Dashboard displays in single column
- [ ] Survey cards stack vertically
- [ ] Forms are easy to fill
- [ ] Buttons are touch-friendly
- [ ] Navigation is accessible

#### Tablet (640-1024px)
- [ ] Dashboard shows 2 columns
- [ ] Form layout adjusts
- [ ] Modals fit screen
- [ ] Navigation accessible

#### Desktop (> 1024px)
- [ ] Dashboard shows 3 columns
- [ ] Full layout displayed
- [ ] Optimal spacing
- [ ] All features accessible

### UI Components

#### Buttons
- [ ] All variants render correctly (primary, secondary, danger, etc.)
- [ ] Loading state shows spinner
- [ ] Disabled state prevents clicks
- [ ] Hover effects work
- [ ] Full width option works

#### Inputs
- [ ] Text input accepts text
- [ ] Email input validates format
- [ ] Password input hides text
- [ ] Date input shows date picker
- [ ] Number input accepts only numbers
- [ ] Error messages display correctly
- [ ] Helper text displays

#### Modals
- [ ] Modal opens correctly
- [ ] Backdrop closes modal
- [ ] Close button works
- [ ] Footer buttons work
- [ ] Modal is scrollable if content is long
- [ ] Multiple modal sizes work

#### Alerts
- [ ] Success alerts display
- [ ] Error alerts display
- [ ] Warning alerts display
- [ ] Info alerts display
- [ ] Close button works

### Performance

#### Loading States
- [ ] Loading spinner shows during API calls
- [ ] Loading text displays
- [ ] UI doesn't freeze during loading
- [ ] Loading states clear after completion

#### Error Handling
- [ ] API errors display user-friendly messages
- [ ] Network errors are handled
- [ ] Validation errors are clear
- [ ] Error recovery is possible

### Toast Notifications
- [ ] Success toast on survey creation
- [ ] Success toast on survey update
- [ ] Success toast on survey deletion
- [ ] Success toast on question actions
- [ ] Success toast on link copy
- [ ] Error toast on failures
- [ ] Toasts auto-dismiss
- [ ] Toasts are readable in dark mode

### Copy Functionality
- [ ] Copy survey link button works
- [ ] Link copies to clipboard
- [ ] Confirmation toast appears
- [ ] Copied link is valid and opens survey

### Data Persistence
- [ ] Auth state persists on refresh
- [ ] Survey data persists in mock DB
- [ ] Questions persist with surveys
- [ ] Responses are saved correctly
- [ ] Dark mode preference persists
- [ ] Language preference persists

## 🔍 Edge Cases to Test

### Survey Management
- [ ] Create survey with very long title (100+ characters)
- [ ] Create survey with very long description (1000+ characters)
- [ ] Set end date before start date
- [ ] Create multiple surveys quickly
- [ ] Edit survey while viewing responses

### Questions
- [ ] Add 20+ options to an MCQ
- [ ] Create question with very long text
- [ ] Set max selections greater than options count
- [ ] Delete all questions from a survey
- [ ] Reorder questions (if drag-drop implemented)

### Responses
- [ ] Submit survey multiple times from same browser
- [ ] Submit with all optional fields empty
- [ ] Submit with maximum text length
- [ ] Submit survey while it's being edited (admin side)

### UI Edge Cases
- [ ] Open multiple modals (only one should show)
- [ ] Rapid button clicking
- [ ] Very long translation text
- [ ] Browser back button during form filling
- [ ] Browser refresh during form filling

## 🎯 User Scenarios

### Scenario 1: New Admin Creates First Survey
1. Login as admin
2. See empty dashboard
3. Click "Create Survey"
4. Fill survey details
5. Save survey
6. Add first question (MCQ)
7. Add options
8. Save question
9. Add second question (Text)
10. Save question
11. Change survey status to "Active"
12. Copy shareable link
13. Open link in new tab
14. Fill and submit survey
15. Go back to admin
16. View responses

### Scenario 2: User Takes Survey
1. Receive survey link
2. Open link
3. See survey title and description
4. Read first question
5. Select answer
6. Move to next question
7. Fill text answer
8. Try to submit without required field
9. See validation error
10. Fill required field
11. Submit successfully
12. See thank you page

### Scenario 3: Admin Manages Multiple Surveys
1. Login as admin
2. See multiple surveys
3. Edit one survey
4. Add more questions
5. Delete a question
6. Update survey dates
7. Go back to dashboard
8. View responses for different survey
9. Delete old survey
10. Confirm deletion

## 📊 Browser Compatibility

Test in:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

## ⚡ Performance Checks

- [ ] Page load time < 3 seconds
- [ ] API calls complete < 1 second
- [ ] No console errors
- [ ] No console warnings (except Tailwind @apply in dev)
- [ ] No memory leaks
- [ ] Smooth animations
- [ ] No layout shifts

## 🔧 Developer Testing

### Code Quality
- [ ] No unused imports
- [ ] Consistent code style
- [ ] Proper component structure
- [ ] Meaningful variable names
- [ ] Comments where needed
- [ ] No console.log in production

### State Management
- [ ] State updates correctly
- [ ] No unnecessary re-renders
- [ ] Store actions work
- [ ] Optimistic updates work
- [ ] Error states clear properly

### Services
- [ ] Mock API delays realistic (500ms)
- [ ] Error simulation works
- [ ] Data transformations correct
- [ ] IDs generate correctly
- [ ] Relationships maintained

## ✅ Accessibility Testing

- [ ] All buttons have accessible labels
- [ ] Forms have proper labels
- [ ] Error messages are announced
- [ ] Keyboard navigation works
- [ ] Focus visible on tab
- [ ] Color contrast meets WCAG AA
- [ ] Alt text for images (if any)
- [ ] Semantic HTML used

## 🚀 Pre-Deployment Checklist

- [ ] All manual tests passed
- [ ] No console errors
- [ ] Build completes successfully
- [ ] Environment variables configured
- [ ] README updated
- [ ] Documentation complete
- [ ] Demo credentials documented
- [ ] Known issues documented

## 📝 Bug Report Template

```
**Title**: Brief description

**Steps to Reproduce**:
1. Step one
2. Step two
3. Step three

**Expected Behavior**:
What should happen

**Actual Behavior**:
What actually happened

**Screenshots**:
If applicable

**Environment**:
- Browser:
- OS:
- Language:
- Theme:

**Additional Context**:
Any other relevant information
```

## 💡 Testing Tips

1. **Clear browser cache** between major tests
2. **Test in incognito mode** to verify fresh state
3. **Use browser dev tools** to check network calls
4. **Test slow connections** (throttle network)
5. **Test with screen reader** for accessibility
6. **Use different screen sizes** for responsive testing
7. **Test both dark and light modes** for each feature
8. **Test all three languages** for each major feature

Happy Testing! 🎉
