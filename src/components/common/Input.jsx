import { forwardRef } from 'react';
import clsx from 'clsx';

const Input = forwardRef(({ 
  label,
  error,
  helperText,
  className,
  fullWidth = false,
  required = false,
  type = 'text',
  ...props 
}, ref) => {
  const inputStyles = clsx(
    'block px-3 py-2 border rounded-lg transition-colors duration-200',
    'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
    'disabled:bg-gray-100 disabled:cursor-not-allowed dark:disabled:bg-gray-800',
    'dark:bg-gray-800 dark:border-gray-700 dark:text-white',
    error 
      ? 'border-red-500 focus:ring-red-500' 
      : 'border-gray-300 dark:border-gray-600',
    fullWidth ? 'w-full' : '',
    className
  );
  
  return (
    <div className={clsx('flex flex-col gap-1', fullWidth && 'w-full')}>
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 text-start">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        className={inputStyles}
        {...props}
      />
      {error && (
        <span className="text-sm text-red-500 text-start">{error}</span>
      )}
      {helperText && !error && (
        <span className="text-sm text-gray-500 dark:text-gray-400 text-start">{helperText}</span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
