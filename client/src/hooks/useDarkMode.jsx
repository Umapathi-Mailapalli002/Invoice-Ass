import React, {useEffect, useState} from 'react'
function useDarkMode() {
    const [isDarkMode, setIsDarkMode] = useState( () => {
        try {
            const storedTheme = localStorage.getItem('theme');
            if (storedTheme) {
                return storedTheme === 'dark';
                
            }
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        } catch (err) {
            console.error('Failed to access localStorage:', err);
            return false;
        }
    })
    useEffect(() => {
        const root = document.documentElement;
        if (isDarkMode) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark')
        }else{
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light')
        }
    }, [isDarkMode])
    
  return [isDarkMode, setIsDarkMode]
}

export default useDarkMode
