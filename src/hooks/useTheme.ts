import { useEffect, useState } from 'react';

type ThemeOption = 'light' | 'dark';

export default function useTheme() {
  const [theme, setTheme] = useState<ThemeOption>('light');

  function toggleTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light');

    localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light');
  }

  useEffect(() => {
    const themePreference = localStorage.getItem('theme');
    if (themePreference === 'dark' || themePreference === 'light') {
      setTheme(themePreference);
    } else {
      localStorage.setItem('theme', 'light');
    }
  }, []);

  return { theme, toggleTheme };
}
