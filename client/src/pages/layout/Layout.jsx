import React from "react";
import {
  Navbar,
  Sidebar,
} from "../../components/index";
import { useSelector } from "react-redux";
function Layout({ children }) {
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  return (
    <div className="min-h-screen lg:overflow-hidden flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-200">
      {/* Sidebar */}
      <aside className="bg-gray-100 dark:bg-gray-800 shadow-md dark:shadow-gray-900">
        <Sidebar />
      </aside>
      <header
        className={`w-full  transition-all duration-500 ease-in-out ${
          isOpen ? "lg:w-10/12 lg:ml-[16.66666%]" : "lg:w-[95.5%] lg:ml-16"
        } shadow-md dark:shadow-gray-800`}
      >
        <Navbar threeBars={true} />
      </header>

      {/* Content */}
      <div
        className={`flex flex-1 transition-all duration-500 ease-in-out ${
          isOpen ? "lg:w-10/12 lg:ml-[17%]" : "lg:w-full lg:ml-0"
        }`}
      >
        {/* Main Content */}
        <main
          className={`w-full p-3 sm:p-7 md:pl-20 md:pr-5 transition-all duration-500 ease-in-out ${
            isOpen ? "lg:px-14" : "lg:pr-20 lg:pl-36"
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
