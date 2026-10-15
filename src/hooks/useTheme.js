import { useEffect, useState } from 'react';

const KEY = 'jdm:theme';

const getSystemTheme = () =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

// First, the user's saved choice; if that is not available, then the system preference.
function getInitialTheme() {
  try {
    const stored = window.localStorage.getItem(KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {
    // If storage is blocked then use system theme.
  }
  return getSystemTheme();
}

export function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark'); // Tailwind's `dark:` is powered by this class.
    root.style.colorScheme = theme; // Scrollbars and form controls should also follow the theme.
  }, [theme]);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    try {
      window.localStorage.setItem(KEY, next); // The choice is saved upon clicking.
    } catch {
      // ignore
    }
  };

  return { theme, toggleTheme };
}
