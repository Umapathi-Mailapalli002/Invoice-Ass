import React, { useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { useSelector } from "react-redux";
function Logout({ textClass, iconClass, onClick }) {
  const [isNavHovered, setIsNavHovered] = useState(false);
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  return (
    <>
      {(isNavHovered && !isOpen) && (
        <span
          className="absolute hidden md:block left-20 mt-4 text-nowrap px-3 py-1 text-sm font-medium 
            rounded-md shadow-md transition-opacity duration-1000
            dark:bg-gray-100 dark:shadow-gray-700 dark:text-gray-900 bg-gray-950 text-gray-100"
        >
          Logout
        </span>
      )}
      <button onClick={onClick}
        onMouseEnter={() => setIsNavHovered(true)}
        onMouseLeave={() => setIsNavHovered(false)}
        type="button"
        className="flex size-14 w-full cursor-pointer text-gray-900 dark:text-gray-400 items-center rounded font-medium"
      >
        <BiLogOut className={`text-2xl mx-4 ${iconClass}`} />{" "}
        <span className={textClass}>Logout</span>
      </button>
    </>
  );
}

export default Logout;
