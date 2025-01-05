import React from "react";
import {
  ModeToggle,
} from "../index.js";
import { HiBars2 } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { openSidebar } from "../../features/sidebarSlice";
function Navbar({  threeBars, modeChange }) {
  const dispatch = useDispatch();
  return (
    <nav className="w-full relative dark:bg-gray-900  bg-gray-100 flex items-center h-16">
      {threeBars && (
        <HiBars2
          onClick={() => dispatch(openSidebar())}
          className="text-4xl sm:mx-3 ml-3 lg:hidden text-gray-900 cursor-pointer dark:text-gray-300"
        />
      )}{" "}
      <div className="absolute right-5">
        {modeChange && <ModeToggle textClass="hidden" />}
      </div>
    </nav>
  );
}

export default Navbar;
