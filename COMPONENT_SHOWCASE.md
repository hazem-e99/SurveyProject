# 🎨 Component Showcase & Usage Examples

## Quick Reference Guide for All Components

---

## 🔘 Button Component

### Basic Usage
```jsx
import Button from '@/components/common/Button';

<Button>Click Me</Button>
```

### All Variants
```jsx
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="danger">Danger</Button>
<Button variant="success">Success</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
```

### Sizes
```jsx
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
```

### States
```jsx
<Button loading>Loading...</Button>
<Button disabled>Disabled</Button>
<Button fullWidth>Full Width</Button>
```

### With Icons
```jsx
import { Plus, Save, Trash2 } from 'lucide-react';

<Button>
  <Plus size={20} className="mr-2" />
  Add Item
</Button>
```

---

## 📝 Input Component

### Basic Usage
```jsx
import Input from '@/components/common/Input';

<Input
  label="Email"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  fullWidth
/>
```

### With Validation
```jsx
<Input
  label="Password"
  type="password"
  value={password}
  onChange={handleChange}
  error={errors.password}
  required
  fullWidth
/>
```

### With Helper Text
```jsx
<Input
  label="Username"
  value={username}
  onChange={handleChange}
  helperText="Choose a unique username"
  fullWidth
/>
```

---

## 📄 Textarea Component

### Basic Usage
```jsx
import Textarea from '@/components/common/Textarea';

<Textarea
  label="Description"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  rows={4}
  fullWidth
/>
```

### With Validation
```jsx
<Textarea
  label="Comments"
  value={comments}
  onChange={handleChange}
  error={errors.comments}
  required
  rows={6}
  fullWidth
/>
```

---

## 🎯 Select Component

### Basic Usage
```jsx
import Select from '@/components/common/Select';

<Select
  label="Status"
  value={status}
  onChange={(e) => setStatus(e.target.value)}
  options={[
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'draft', label: 'Draft' }
  ]}
  fullWidth
/>
```

### With Placeholder
```jsx
<Select
  label="Country"
  value={country}
  onChange={handleChange}
  placeholder="Select a country"
  options={countryOptions}
  fullWidth
/>
```

---

## ☑️ Checkbox Component

### Basic Usage
```jsx
import Checkbox from '@/components/common/Checkbox';

<Checkbox
  label="I agree to terms and conditions"
  checked={agreed}
  onChange={(e) => setAgreed(e.target.checked)}
/>
```

### With Validation
```jsx
<Checkbox
  label="Required field"
  checked={value}
  onChange={handleChange}
  error={errors.field}
/>
```

---

## 🔘 Radio Component

### Basic Usage
```jsx
import Radio from '@/components/common/Radio';

<div>
  <Radio
    label="Option 1"
    name="choice"
    value="1"
    checked={selected === '1'}
    onChange={(e) => setSelected(e.target.value)}
  />
  <Radio
    label="Option 2"
    name="choice"
    value="2"
    checked={selected === '2'}
    onChange={(e) => setSelected(e.target.value)}
  />
</div>
```

---

## 🎴 Card Component

### Basic Usage
```jsx
import Card from '@/components/common/Card';

<Card>
  <h3>Card Title</h3>
  <p>Card content goes here...</p>
</Card>
```

### Variants
```jsx
<Card hover>
  Hover effect enabled
</Card>

<Card padding={false}>
  No padding
</Card>

<Card className="custom-class">
  With custom classes
</Card>
```

### Full Example
```jsx
<Card hover>
  <div className="flex items-center justify-between mb-4">
    <h3 className="text-xl font-bold">Survey Title</h3>
    <span className="badge">Active</span>
  </div>
  <p className="text-gray-600 mb-4">Survey description...</p>
  <div className="flex gap-2">
    <Button size="sm">Edit</Button>
    <Button variant="danger" size="sm">Delete</Button>
  </div>
</Card>
```

---

## 🪟 Modal Component

### Basic Usage
```jsx
import Modal from '@/components/common/Modal';
import { useState } from 'react';

const [isOpen, setIsOpen] = useState(false);

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Modal Title"
>
  <p>Modal content goes here...</p>
</Modal>
```

### With Footer
```jsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="Confirm Action"
  footer={
    <>
      <Button variant="secondary" onClick={handleClose}>
        Cancel
      </Button>
      <Button variant="primary" onClick={handleConfirm}>
        Confirm
      </Button>
    </>
  }
>
  <p>Are you sure you want to proceed?</p>
</Modal>
```

### Different Sizes
```jsx
<Modal size="sm" {...props}>Small Modal</Modal>
<Modal size="md" {...props}>Medium Modal</Modal>
<Modal size="lg" {...props}>Large Modal</Modal>
<Modal size="xl" {...props}>Extra Large Modal</Modal>
<Modal size="full" {...props}>Full Width Modal</Modal>
```

---

## ⏳ Loading Component

### Basic Usage
```jsx
import Loading from '@/components/common/Loading';

<Loading />
```

### With Text
```jsx
<Loading text="Loading data..." />
```

### Full Screen
```jsx
<Loading fullScreen text="Please wait..." />
```

### Different Sizes
```jsx
<Loading size="sm" />
<Loading size="md" />
<Loading size="lg" />
```

### In Component
```jsx
function MyComponent() {
  const [loading, setLoading] = useState(true);
  
  if (loading) {
    return <Loading fullScreen text="Loading..." />;
  }
  
  return <div>Content</div>;
}
```

---

## 🚨 Alert Component

### All Types
```jsx
import Alert from '@/components/common/Alert';

<Alert
  type="success"
  title="Success!"
  message="Operation completed successfully."
/>

<Alert
  type="error"
  title="Error"
  message="Something went wrong."
/>

<Alert
  type="warning"
  title="Warning"
  message="Please review your input."
/>

<Alert
  type="info"
  title="Information"
  message="Here's some useful information."
/>
```

### With Close Button
```jsx
<Alert
  type="success"
  message="Your changes have been saved."
  onClose={() => console.log('Alert closed')}
/>
```

---

## 🌍 LanguageSwitcher Component

### Basic Usage
```jsx
import LanguageSwitcher from '@/components/common/LanguageSwitcher';

<LanguageSwitcher />
```

### In Header
```jsx
<header>
  <div className="flex items-center gap-4">
    <Logo />
    <nav>...</nav>
    <LanguageSwitcher />
  </div>
</header>
```

---

## 🌙 ThemeToggle Component

### Basic Usage
```jsx
import ThemeToggle from '@/components/common/ThemeToggle';

<ThemeToggle />
```

### In Header
```jsx
<header>
  <div className="flex items-center gap-3">
    <ThemeToggle />
    <LanguageSwitcher />
    <UserMenu />
  </div>
</header>
```

---

## 🎨 Complete Form Example

```jsx
import { useState } from 'react';
import Input from '@/components/common/Input';
import Textarea from '@/components/common/Textarea';
import Select from '@/components/common/Select';
import Checkbox from '@/components/common/Checkbox';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import Alert from '@/components/common/Alert';

function CompleteForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: '',
    status: '',
    agreed: false,
  });
  
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation logic
    if (!formData.name) {
      setErrors({ name: 'Name is required' });
      return;
    }
    // Submit logic
    setSuccess(true);
  };
  
  return (
    <Card>
      <h2 className="text-2xl font-bold mb-6">Complete Form</h2>
      
      {success && (
        <Alert
          type="success"
          message="Form submitted successfully!"
          onClose={() => setSuccess(false)}
          className="mb-4"
        />
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          required
          fullWidth
        />
        
        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
        />
        
        <Textarea
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          fullWidth
        />
        
        <Select
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          options={[
            { value: 'active', label: 'Active' },
            { value: 'inactive', label: 'Inactive' },
          ]}
          fullWidth
        />
        
        <Checkbox
          label="I agree to the terms and conditions"
          name="agreed"
          checked={formData.agreed}
          onChange={handleChange}
        />
        
        <div className="flex gap-3">
          <Button type="submit" variant="primary">
            Submit
          </Button>
          <Button type="button" variant="secondary">
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
}
```

---

## 📱 Responsive Layout Example

```jsx
<div className="container mx-auto px-4 py-8">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {items.map(item => (
      <Card key={item.id} hover>
        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
        <p className="text-gray-600 mb-4">{item.description}</p>
        <Button fullWidth>View Details</Button>
      </Card>
    ))}
  </div>
</div>
```

---

## 🎭 Toast Notifications

```jsx
import toast from 'react-hot-toast';

// Success
toast.success('Operation completed!');

// Error
toast.error('Something went wrong');

// Loading
const toastId = toast.loading('Processing...');
// Later...
toast.success('Done!', { id: toastId });

// Custom
toast('Custom message', {
  duration: 4000,
  position: 'top-right',
});
```

---

## 🎨 Styling Tips

### Dark Mode
```jsx
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
  Content adapts to theme
</div>
```

### Responsive
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  Mobile: 1 column
  Tablet: 2 columns
  Desktop: 3 columns
</div>
```

### RTL Support
```jsx
<div className="mr-4 rtl:ml-4 rtl:mr-0">
  Margin adjusts for RTL languages
</div>
```

---

## 💡 Pro Tips

1. **Combine Components**: Use multiple components together for complex UIs
2. **Consistent Spacing**: Use Tailwind's spacing scale (4, 6, 8, etc.)
3. **Error Handling**: Always show validation errors clearly
4. **Loading States**: Show loading spinners during async operations
5. **Responsive Design**: Test on multiple screen sizes
6. **Dark Mode**: Test all components in both themes
7. **i18n**: Use translation keys for all text
8. **Accessibility**: Add proper labels and ARIA attributes

---

## 🚀 Quick Start Patterns

### Login Form
```jsx
<Card className="max-w-md mx-auto">
  <h1>Login</h1>
  <Input label="Email" type="email" fullWidth />
  <Input label="Password" type="password" fullWidth />
  <Button fullWidth>Sign In</Button>
</Card>
```

### Dashboard Card
```jsx
<Card hover>
  <div className="flex justify-between items-start">
    <div>
      <h3 className="font-bold">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
    <span className="badge">{status}</span>
  </div>
  <div className="flex gap-2 mt-4">
    <Button size="sm">Edit</Button>
    <Button variant="danger" size="sm">Delete</Button>
  </div>
</Card>
```

### Confirmation Modal
```jsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="Confirm Delete"
  footer={
    <>
      <Button variant="secondary" onClick={handleClose}>Cancel</Button>
      <Button variant="danger" onClick={handleDelete}>Delete</Button>
    </>
  }
>
  <p>Are you sure you want to delete this item?</p>
</Modal>
```

---

Happy Coding! 🎉
