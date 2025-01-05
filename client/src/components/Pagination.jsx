import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

function Pagination({ totalItems, pageSize, currentPage, onPageChange }) {
  const totalPages = Math.ceil(totalItems / pageSize);

  if (totalPages === 1) return null; // Hide pagination if only one page

  // Helper function to generate page numbers with dots
  const generatePages = () => {
    const pages = [];
    const maxVisiblePages = 3; // Adjust this for how many numbers to show at once

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      if (startPage > 2) {
        pages.push("...");
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages - 1) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const pages = generatePages();

  return (
    <div className="flex justify-center items-center mt-4 space-x-2">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`size-10 p-2 rounded-full flex justify-center items-center text-gray-800 dark:text-gray-100 transition ${
          currentPage === 1
            ? "cursor-not-allowed opacity-50"
            : "cursor-pointer sm:hover:bg-gray-400 dark:sm:hover:bg-gray-700"
        }`}
        aria-label="Previous Page"
      >
        <FiChevronLeft className="text-xl" />
      </button>

      {/* Page Numbers */}
      {pages.map((page, index) =>
        page === "..." ? (
          <span
            key={`ellipsis-${index}`}
            className=" text-gray-800 text-3xl dark:text-gray-100"
            aria-hidden="true"
          >
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`p-2 rounded-full size-10 flex justify-center items-center ${
              page === currentPage
                ? "bg-blue-500 text-white"
                : "bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-100 hover:bg-gray-400 dark:hover:bg-gray-700"
            } transition`}
            aria-label={`Go to Page ${page}`}
          >
            {page}
          </button>
        )
      )}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`size-10 p-2 rounded-full flex justify-center items-center text-gray-800 dark:text-gray-100 transition ${
          currentPage === totalPages
            ? "cursor-not-allowed opacity-50"
            : "cursor-pointer sm:hover:bg-gray-400 dark:sm:hover:bg-gray-700"
        }`}
        aria-label="Next Page"
      >
        <FiChevronRight className="text-xl" />
      </button>
    </div>
  );
}

export default Pagination;
