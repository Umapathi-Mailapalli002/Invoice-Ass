import React, { useEffect, useState } from "react";
import {
  Profile,
  Logout,
  ModeToggle,
  Loading
} from "../index.js";
import NavLinks from "./NavLinks.jsx";
import { data } from "./navData.jsx";
import { useSelector, useDispatch } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { closeSidebar, openSidebar } from "../../features/sidebarSlice.js";
import { useScreenSizes } from "../../utils/screens.js";
import { logout } from "../../auth/userAuthSlice.js";
function Sidebar() {
  const dispatch = useDispatch();
  //for responsiveness
  const { isMediumDevices, isLargeScreen, isTablet, isMobile } =
    useScreenSizes();

  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const {user, loading} = useSelector((state) => state.userAuth);
  
  const handleClose = (e) => {
    e.stopPropagation();
    dispatch(closeSidebar());
  };
  useEffect(() => {
    if (isOpen && (isMediumDevices || isMobile || isTablet)) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  if (loading) {
    return <Loading/>
  }
  return (
    <>
      {isOpen && (isMobile || isTablet || isMediumDevices) && (
        <div
          onClick={handleClose} // Close sidebar on clicking overlay
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
        ></div>
      )}

      {(isMobile || isTablet) && (
        <div
          onClick={(e) => e.stopPropagation()}
          className={` ${
            isOpen
              ? "w-2/3 sm:w-4/12 transition-all duration-500 px-2 shadow-md dark:shadow-gray-600"
              : "w-0 transition-all duration-500 px-0"
          } min-h-screen h-full absolute z-30 dark:bg-gray-900 text-gray-900 dark:text-blue-200 bg-gray-100 mb-2`}
        >
          <div className="flex justify-between">
            <div>
              {isOpen && (
                <Profile
                  profilePic={user?.data?.user?.username?.charAt(0).toUpperCase()}
                  username={user?.data?.user?.username}
                  isOpen={isOpen}
                  onClick={() => dispatch(openModal())}
                />
              )}
            </div>

            <RxCross2
              onClick={handleClose}
              className="text-3xl cursor-pointer mr-1 dark:text-gray-300"
            />
          </div>

          <nav className="flex-1 justify-center border-t  dark:border-gray-700">
            {data.map((nav) => (
              <NavLinks
                key={nav.name}
                to={nav.path}
                name={nav.name}
                icon={isOpen ? nav.icon : undefined}
              />
            ))}
            {isOpen && (
              <div  className="absolute bottom-16">
                <Logout onClick={() => dispatch(logout())}/> <ModeToggle />
              </div>
            )}
          </nav>
        </div>
      )}

      {/* For medium devices */}
      {(isMediumDevices) && (
        <div
          onClick={(e) => e.stopPropagation()}
          className={`min-h-screen h-full fixed px-2 md:px-[5px] ${
            isOpen
              ? "w-4/12 lg:w-2/12 transition-all duration-500"
              : "w-[66px] transition-all duration-500"
          } dark:bg-gray-900 text-gray-900 z-30 shadow-md dark:shadow-gray-600 dark:text-blue-200 bg-gray-100 mb-2`}
        >
          <div className="flex justify-between items-center">
            <Profile
              profilePic={user?.data?.user?.username?.charAt(0).toUpperCase()}
              username={user?.data?.user?.username}
              isOpen={isOpen}
              onClick={() => dispatch(openModal())}
            />

            {!isOpen ? (
              <FiChevronRight
                aria-label="Open Sidebar"
                onClick={() => dispatch(openSidebar())}
                className="text-2xl cursor-pointer absolute -right-3 dark:text-gray-300"
              />
            ) : (
              <FiChevronLeft
                aria-label="Close Sidebar"
                onClick={handleClose}
                className="text-2xl cursor-pointer absolute -right-0 dark:text-gray-300"
              />
            )}
          </div>

          <nav className="flex-1 justify-center border-t  dark:border-gray-700">
            {data.map((nav) => (
              <>
                <NavLinks
                  key={nav.name}
                  to={nav.path}
                  name={nav.name}
                  icon={nav.icon}
                />
              </>
            ))}
            <div  className="absolute bottom-3">
              <Logout onClick={() => dispatch(logout())} textClass={!isOpen ? "hidden" : ""} />
              <ModeToggle
                iconClass={!isOpen ? "hidden" : ""}
                textClass={!isOpen ? "hidden" : ""}
              />
            </div>
          </nav>
        </div>
      )}


      {/* For large devices */}
      {(isLargeScreen) && (
        <div
          className={`min-h-screen h-full fixed inset-0 px-2 md:px-[5px] ${
            isOpen
              ? "w-4/12 lg:w-2/12 transition-all duration-500"
              : "w-[66px] transition-all duration-500"
          } dark:bg-gray-900 text-gray-900 z-30 shadow-md dark:shadow-gray-600 dark:text-blue-200 bg-gray-100 mb-2`}
        >
          <div className="flex justify-between items-center">
            <Profile
              profilePic={user?.data?.user?.username?.charAt(0).toUpperCase()}
              username={user?.data?.user?.username}
              isOpen={isOpen}
              onClick={() => dispatch(openModal())}
            />

            {!isOpen ? (
              <FiChevronRight
                aria-label="Open Sidebar"
                onClick={() => dispatch(openSidebar())}
                className="text-2xl cursor-pointer absolute -right-3 dark:text-gray-300"
              />
            ) : (
              <FiChevronLeft
                aria-label="Close Sidebar"
                onClick={handleClose}
                className="text-2xl cursor-pointer absolute -right-0 dark:text-gray-300"
              />
            )}
          </div>

          <nav className="flex-1 justify-center border-t  dark:border-gray-700">
            {data.map((nav) => (
              <>
                <NavLinks
                  key={nav.name}
                  to={nav.path}
                  name={nav.name}
                  icon={nav.icon}
                />
              </>
            ))}
            <div className="absolute bottom-3">
              <Logout onClick={() => dispatch(logout())} textClass={!isOpen ? "hidden" : ""} />
              <ModeToggle
                iconClass={!isOpen ? "hidden" : ""}
                textClass={!isOpen ? "hidden" : ""}
              />
            </div>
          </nav>
        </div>
      )}
    </>
  );
}

export default Sidebar;
