import React,{useEffect} from 'react';
import ReactDOM from 'react-dom';

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  className = '',
  overlayClassName = '',
}) => {
  if (!isOpen) return null;

  // Close the modal on pressing Esc
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') onClose();
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  
  return ReactDOM.createPortal(
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity ${overlayClassName}`}
      onClick={onClose}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`dark:bg-gray-800 dark:text-gray-200 rounded-lg shadow-lg max-w-lg w-full ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {title && (
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">{title}</h2>
            <button
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-400"
              onClick={onClose}
              aria-label="Close Modal"
            >
              &times;
            </button>
          </div>
        )}

        {/* Content */}
        <div className="mb-4">{children}</div>

        {/* Footer */}
        {footer && <div className="flex justify-end">{footer}</div>}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
