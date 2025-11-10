import { forwardRef } from 'react';
import clsx from 'clsx';

const Radio = forwardRef(({ 
  label,
  error,
  className,
  ...props 
}, ref) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          ref={ref}
          type="radio"
          className={clsx(
            'w-4 h-4 text-primary-600 border-gray-300',
            'focus:ring-2 focus:ring-primary-500 focus:ring-offset-0',
            'dark:border-gray-600 dark:bg-gray-800',
            'cursor-pointer',
            className
          )}
          {...props}
        />
        {label && (
          <span className="text-sm text-gray-700 dark:text-gray-300">
            {label}
          </span>
        )}
      </label>
      {error && (
        <span className="text-sm text-red-500">{error}</span>
      )}
    </div>
  );
});

Radio.displayName = 'Radio';

export default Radio;
