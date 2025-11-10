# Survey System - Component Documentation

## Common Components

### Button
Versatile button component with multiple variants and sizes.

**Props:**
- `variant`: 'primary' | 'secondary' | 'danger' | 'success' | 'outline' | 'ghost'
- `size`: 'sm' | 'md' | 'lg'
- `fullWidth`: boolean
- `loading`: boolean
- `disabled`: boolean

**Example:**
```jsx
<Button variant="primary" size="lg" loading={isLoading}>
  Submit
</Button>
```

### Input
Text input with label, error handling, and validation.

**Props:**
- `label`: string
- `error`: string
- `helperText`: string
- `fullWidth`: boolean
- `required`: boolean
- `type`: string

**Example:**
```jsx
<Input
  label="Email"
  type="email"
  value={email}
  onChange={handleChange}
  error={errors.email}
  required
  fullWidth
/>
```

### Textarea
Multi-line text input component.

**Props:**
- Same as Input, plus:
- `rows`: number

**Example:**
```jsx
<Textarea
  label="Description"
  value={description}
  onChange={handleChange}
  rows={4}
  fullWidth
/>
```

### Select
Dropdown select component.

**Props:**
- Same as Input, plus:
- `options`: Array<{value: string, label: string}>
- `placeholder`: string

**Example:**
```jsx
<Select
  label="Status"
  value={status}
  onChange={handleChange}
  options={[
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
  ]}
  fullWidth
/>
```

### Card
Container component with consistent styling.

**Props:**
- `padding`: boolean (default: true)
- `hover`: boolean
- `className`: string

**Example:**
```jsx
<Card hover>
  <h3>Card Title</h3>
  <p>Card content...</p>
</Card>
```

### Modal
Modal dialog component.

**Props:**
- `isOpen`: boolean
- `onClose`: function
- `title`: string
- `size`: 'sm' | 'md' | 'lg' | 'xl' | 'full'
- `showCloseButton`: boolean
- `footer`: ReactNode

**Example:**
```jsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="Confirm Action"
  footer={
    <>
      <Button variant="secondary" onClick={handleClose}>Cancel</Button>
      <Button variant="primary" onClick={handleConfirm}>Confirm</Button>
    </>
  }
>
  <p>Modal content...</p>
</Modal>
```

### Loading
Loading spinner component.

**Props:**
- `size`: 'sm' | 'md' | 'lg'
- `fullScreen`: boolean
- `text`: string

**Example:**
```jsx
<Loading fullScreen text="Loading..." />
```

### Alert
Alert/notification component.

**Props:**
- `type`: 'success' | 'error' | 'warning' | 'info'
- `title`: string
- `message`: string
- `onClose`: function

**Example:**
```jsx
<Alert
  type="success"
  title="Success!"
  message="Your changes have been saved."
  onClose={handleClose}
/>
```

### Radio & Checkbox
Form input components.

**Props:**
- `label`: string
- `error`: string
- Plus standard input props

**Example:**
```jsx
<Radio
  label="Option 1"
  name="option"
  value="1"
  checked={selected === '1'}
  onChange={handleChange}
/>

<Checkbox
  label="I agree to terms"
  checked={agreed}
  onChange={handleChange}
/>
```

### LanguageSwitcher
Language selection component with automatic RTL/LTR switching.

**Example:**
```jsx
<LanguageSwitcher />
```

### ThemeToggle
Dark/light mode toggle.

**Example:**
```jsx
<ThemeToggle />
```

## State Management (Zustand)

### useAuthStore
Authentication state management.

**State:**
- `admin`: Current admin user
- `token`: Auth token
- `isAuthenticated`: boolean
- `loading`: boolean
- `error`: string

**Actions:**
- `login(email, password)`: Authenticate user
- `logout()`: Sign out user
- `clearError()`: Clear error state

**Example:**
```jsx
const { admin, isAuthenticated, login, logout } = useAuthStore();

const handleLogin = async () => {
  const result = await login(email, password);
  if (result.success) {
    navigate('/admin');
  }
};
```

### useSurveyStore
Survey and question management.

**State:**
- `polls`: Array of surveys
- `currentPoll`: Current survey
- `questions`: Array of questions
- `loading`: boolean
- `error`: string

**Actions:**
- `fetchPolls()`: Load all surveys
- `fetchPollById(id)`: Load specific survey
- `createPoll(data)`: Create new survey
- `updatePoll(id, data)`: Update survey
- `deletePoll(id)`: Delete survey
- `createQuestion(data)`: Add question
- `updateQuestion(id, data)`: Update question
- `deleteQuestion(id)`: Delete question

**Example:**
```jsx
const { polls, loading, fetchPolls, createPoll } = useSurveyStore();

useEffect(() => {
  fetchPolls();
}, []);

const handleCreate = async (data) => {
  const newPoll = await createPoll(data);
  toast.success('Survey created!');
};
```

### useResponseStore
Response management.

**State:**
- `responses`: Array of responses
- `loading`: boolean
- `error`: string

**Actions:**
- `fetchResponses(pollId)`: Load responses
- `submitResponse(pollId, answers)`: Submit survey

**Example:**
```jsx
const { responses, fetchResponses } = useResponseStore();

useEffect(() => {
  fetchResponses(pollId);
}, [pollId]);
```

## Services

### authService
- `login(email, password)`: Authenticate
- `logout()`: Sign out
- `validateToken(token)`: Verify token

### pollService
- `getAllPolls()`: Get all surveys
- `getPollById(id)`: Get survey
- `createPoll(data)`: Create survey
- `updatePoll(id, data)`: Update survey
- `deletePoll(id)`: Delete survey
- `getPollWithQuestions(id)`: Get survey with questions

### questionService
- `getQuestionsByPollId(pollId)`: Get questions
- `createQuestion(data)`: Create question
- `updateQuestion(id, data)`: Update question
- `deleteQuestion(id)`: Delete question

### responseService
- `submitResponse(pollId, answers)`: Submit survey
- `getResponsesByPollId(pollId)`: Get responses
- `getResponseCount(pollId)`: Count responses

## Routing

### Public Routes
- `/admin/login` - Admin login page

### Protected Admin Routes
- `/admin` - Dashboard
- `/admin/surveys/new` - Create survey
- `/admin/surveys/:id` - Edit survey
- `/admin/responses/:id` - View responses

### User Routes
- `/survey/:id` - Survey form
- `/survey/:id/thank-you` - Thank you page

## Styling Guidelines

### Colors
- Primary: Blue shades for main actions
- Secondary: Gray shades for secondary actions
- Success: Green for positive actions
- Danger: Red for destructive actions
- Warning: Yellow for warnings
- Info: Blue for informational

### Spacing
- Use Tailwind's spacing scale (4, 6, 8, etc.)
- Consistent padding/margin throughout

### Typography
- Headings: font-bold, various text sizes
- Body: Regular weight
- Labels: font-medium
- Captions: text-sm

### Dark Mode
All components support dark mode using Tailwind's `dark:` prefix.

## Best Practices

### Component Structure
1. Import dependencies
2. Define component
3. State and hooks
4. Event handlers
5. Render JSX
6. Export

### State Management
- Use Zustand for global state
- Use local state for UI-only state
- Keep state minimal and normalized

### Performance
- Memoize expensive computations
- Use proper key props in lists
- Avoid unnecessary re-renders

### Accessibility
- Use semantic HTML
- Add ARIA labels
- Ensure keyboard navigation
- Maintain focus management

### Internationalization
- Use t() function for all text
- Provide translation keys
- Support RTL layouts
- Test in all languages
