import React, { useState, useEffect } from "react";

function Alert({ message, alertType }) {
    const [isAlertOccured, setIsAlertOccured] = useState(true);
  const classBasedOnType =
    alertType === "Error"
      ? "text-red-800 border-red-300 bg-red-50 dark:text-red-400 dark:border-red-800"
      : alertType === "Success"
      ? "text-green-800 border-green-300 bg-green-50 dark:text-green-400 dark:border-green-800"
      : alertType === "Info"
      ? "text-blue-800 border-blue-300 bg-blue-50 dark:text-blue-400 dark:border-blue-800"
      : "text-yellow-800 border-yellow-300 bg-yellow-50 dark:text-yellow-400 dark:border-yellow-800";

      useEffect(() => {
        const timer = setTimeout(() => {
          setIsAlertOccured(false); // Hide the alert after 3 seconds
        }, 2000);
    
        // Cleanup the timer when the component unmounts
        return () => clearTimeout(timer);
      }, []);
    
      if (!isAlertOccured) return null;
    
  return (
    <div
      class={`flex absolute right-1/4 left-1/4 top-10 z-50 items-center p-4 mb-4 text-sm border rounded-lg dark:bg-gray-800 ${classBasedOnType}`}
      role="alert"
    >
      <svg
        class="flex-shrink-0 inline w-4 h-4 me-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <span class="sr-only">Info</span>
      <div>
        <span class="font-medium">{alertType}!</span> {message}
      </div>
    </div>
  );
}

export default Alert;
