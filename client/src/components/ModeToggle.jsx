import React from 'react'
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import useDarkMode from '../hooks/useDarkMode';
function ModeToggle({iconClass, textClass, containerCalss}) {
    const [isDarkMode, setIsDarkMode] = useDarkMode();
  return (
    <div className={`flex ${containerCalss} size-14 w-full text-gray-900 dark:text-gray-400 items-center rounded font-medium`}>
      <div className="flex">
  {isDarkMode ? (
    <>
      <MdOutlineDarkMode className={`text-2xl mx-4 ${iconClass}`} />
      <span className={`mr-4 ${textClass}`}>Dark Mode</span>
    </>
  ) : (
    <>
      <MdOutlineLightMode className={`text-2xl mx-4 ${iconClass}`} />
      <span className={`mr-4 ${textClass}`}>Light Mode</span>
    </>
  )}
</div>
<label className="inline-flex items-center cursor-pointer ml-1">
  <input aria-label="Toggle Dark Mode" onChange={() => setIsDarkMode(!isDarkMode)} type="checkbox" checked={isDarkMode} value="" className="sr-only peer"/>
  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
</label>

    </div>
  )
}

export default ModeToggle
