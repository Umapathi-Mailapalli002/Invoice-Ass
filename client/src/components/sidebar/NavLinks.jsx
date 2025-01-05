import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

function NavLinks({ to, icon, name }) {
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const [isNavHovered, setIsNavHovered] = useState(false);

  return (
    <>
      {(isNavHovered && !isOpen) && (
        <span
          className="absolute hidden md:block left-20 mt-4 text-nowrap px-3 py-1 text-sm font-medium 
            rounded-md shadow-md transition-opacity duration-1000
            dark:bg-gray-100 dark:shadow-gray-700 dark:text-gray-900 bg-gray-950 text-gray-100"
        >
          {name}
        </span>
      )}
      <NavLink
        to={to}
        onMouseEnter={() => setIsNavHovered(true)}
        onMouseLeave={() => setIsNavHovered(false)}
        className={({ isActive }) =>
          `flex items-center my-2 font-medium
         rounded hover:bg-gray-300 dark:hover:bg-gray-700
        ${
          isActive
            ? "bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            : "dark:text-gray-400 dark:bg-gray-900  text-gray-700 "
        }`
        }
        aria-current={({ isActive }) => (isActive ? "page" : undefined)}
      >
        <span
          className={`size-14 flex justify-center items-center text-xl ${({
            isActive,
          }) =>
            isActive
              ? "text-gray-900 dark:text-gray-100"
              : "text-gray-700 dark:text-gray-400"}`}
        >
          {icon}
        </span>
        {isOpen ? name : undefined}
      </NavLink>
    </>
  );
}

export default NavLinks;
