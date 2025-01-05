import React from "react";
import Pagination from "./Pagination";

function InfoTable({
  columns,
  data,
  actions,
  currentPage,
  pageSize,
  onPageChange,
  title,
  loading,
}) {
  // Calculate paginated data
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = data?.slice(startIndex, startIndex + pageSize);

  return (
    <div className="w-[93vw] sm:w-full sm:max-w-3xl lg:max-w-5xl mx-auto py-6 px-3 sm:px-6 bg-gradient-to-tr from-teal-400 via-cyan-400 to-blue-500 dark:from-gray-700 dark:via-gray-800 dark:to-black rounded-lg shadow-md">
      {title && (
        <h2 className="text-2xl font-bold text-gray-100 mb-4">{title}</h2>
      )}
      <div className="overflow-x-auto">
        <table className="bg-white mx-auto dark:bg-gray-800 rounded-lg">
          {/* Table Header */}
          <thead className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
            <tr>
              {columns?.map((col, index) => (
                <th key={index} className="p-3 text-left font-medium">
                  {col.label}
                </th>
              ))}
              {actions && actions.length > 0 && (
                <th className="p-3 text-left font-medium">Actions</th>
              )}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {loading
              ? // Placeholder rows for loading state
                Array.from({ length: 6 }).map((_, index) => (
                  <tr key={index} className="animate-pulse">
                    <td className="py-2 px-4 border-b bg-gray-200 dark:bg-gray-700">
                      &nbsp;
                    </td>
                    <td className="py-2 px-4 border-b bg-gray-200 dark:bg-gray-700">
                      &nbsp;
                    </td>
                    <td className="py-2 px-4 border-b bg-gray-200 dark:bg-gray-700">
                      &nbsp;
                    </td>
                    <td className="py-2 px-4 border-b bg-gray-200 dark:bg-gray-700">
                      &nbsp;
                    </td>
                  </tr>
                ))
              : paginatedData?.map((item, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={`border-b ${
                      rowIndex % 2 === 0
                        ? "bg-gray-100 dark:bg-gray-700"
                        : "bg-gray-200 dark:bg-gray-600"
                    } sm:hover:bg-gray-50 dark:sm:hover:bg-gray-500 transition`}
                  >
                    {/* Render Columns */}
                    {columns.map((col, colIndex) => (
                      <td
                        key={colIndex}
                        className="p-3 text-gray-800 dark:text-gray-100"
                      >
                        {item[col.key]}
                      </td>
                    ))}
                    {/* Render Actions */}
                    {actions && actions.length > 0 && (
                      <td className="p-3 flex gap-2">
                        {actions.map((action, actionIndex) => (
                          <button
                            key={actionIndex}
                            onClick={() => action.onClick(item)}
                            className={`text-xl px-2 py-1 rounded ${
                              action.type === "delete"
                                ? "text-red-500 sm:hover:text-red-700"
                                : "text-blue-500 sm:hover:text-blue-700"
                            } transition`}
                          >
                            {action.icon ? action.icon : action.label}
                          </button>
                        ))}
                      </td>
                    )}
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        totalItems={data?.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </div>
  );
}

export default InfoTable;
