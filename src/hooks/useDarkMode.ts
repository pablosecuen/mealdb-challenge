import { useEffect, useState } from 'react';
import { DARK, DARK_MODE } from '../constants/constants';

/**
 * Custom hook to manage dark mode.
 * @param initialValue Initial value for dark mode (default: false).
 * @returns A tuple containing the `darkMode` state and the `toggleDarkMode` function.
 */
const useDarkMode = (initialValue: boolean = false): [boolean, () => void] => {
  const [darkMode, setDarkMode] = useState<boolean>(initialValue);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem(DARK_MODE);
    if (savedDarkMode !== null) {
      setDarkMode(savedDarkMode === 'true');
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add(DARK);
    } else {
      root.classList.remove(DARK);
    }
    localStorage.setItem(DARK_MODE, darkMode.toString());
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return [darkMode, toggleDarkMode];
};

export default useDarkMode;
