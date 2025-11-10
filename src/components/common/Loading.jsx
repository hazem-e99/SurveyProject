import clsx from 'clsx';

const Loading = ({ size = 'md', fullScreen = false, text }) => {
  const sizes = {
    sm: 'h-6 w-6',
    md: 'h-10 w-10',
    lg: 'h-16 w-16',
  };
  
  const spinner = (
    <div className="flex flex-col items-center gap-3">
      <div
        className={clsx(
          'animate-spin rounded-full border-4 border-gray-200 border-t-primary-600',
          sizes[size]
        )}
      />
      {text && (
        <p className="text-gray-600 dark:text-gray-400 text-sm">{text}</p>
      )}
    </div>
  );
  
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white dark:bg-gray-900 flex items-center justify-center z-50">
        {spinner}
      </div>
    );
  }
  
  return (
    <div className="flex items-center justify-center p-8">
      {spinner}
    </div>
  );
};

export default Loading;
