import { AlertCircle, CheckCircle, Info, XCircle, X } from 'lucide-react';
import clsx from 'clsx';

const Alert = ({ type = 'info', title, message, onClose, className }) => {
  const types = {
    success: {
      bg: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-green-200 dark:border-green-800',
      icon: <CheckCircle className="text-green-600 dark:text-green-400" size={20} />,
      title: 'text-green-800 dark:text-green-300',
      message: 'text-green-700 dark:text-green-400',
    },
    error: {
      bg: 'bg-red-50 dark:bg-red-900/20',
      border: 'border-red-200 dark:border-red-800',
      icon: <XCircle className="text-red-600 dark:text-red-400" size={20} />,
      title: 'text-red-800 dark:text-red-300',
      message: 'text-red-700 dark:text-red-400',
    },
    warning: {
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      border: 'border-yellow-200 dark:border-yellow-800',
      icon: <AlertCircle className="text-yellow-600 dark:text-yellow-400" size={20} />,
      title: 'text-yellow-800 dark:text-yellow-300',
      message: 'text-yellow-700 dark:text-yellow-400',
    },
    info: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-200 dark:border-blue-800',
      icon: <Info className="text-blue-600 dark:text-blue-400" size={20} />,
      title: 'text-blue-800 dark:text-blue-300',
      message: 'text-blue-700 dark:text-blue-400',
    },
  };
  
  const config = types[type];
  
  return (
    <div className={clsx(
      'flex gap-3 p-4 rounded-lg border',
      config.bg,
      config.border,
      className
    )}>
      <div className="flex-shrink-0">
        {config.icon}
      </div>
      <div className="flex-1">
        {title && (
          <h4 className={clsx('font-medium mb-1', config.title)}>
            {title}
          </h4>
        )}
        {message && (
          <p className={clsx('text-sm', config.message)}>
            {message}
          </p>
        )}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
};

export default Alert;
