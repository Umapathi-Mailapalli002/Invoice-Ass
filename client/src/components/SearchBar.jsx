import React from "react";
import InputBox from "./InputBox";
import { FiSearch } from "react-icons/fi";

function SearchBar({ value, ref, onClick, className, placeholder, ...props }) {
  return (
    <div className="flex">
      <InputBox
        className={`border-r-0 ${className} rounded-r-none focus:outline-none focus:ring-0`}
        type="search"
        value={value}
        ref={ref}
        onChange={(e) => e.target.value}
        placeholder={placeholder}
        {...props}
      />{" "}
      <button
        type="button"
        className="p-2 h-12 flex rounded-l-none justify-center items-center border dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 bg-gray-50 border-gray-300 text-gray-900 rounded-lg "
        onClick={onClick}
      >
        <FiSearch className="text-2xl" />
      </button>
    </div>
  );
}

export default SearchBar;
