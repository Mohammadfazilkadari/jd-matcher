import { useEffect, useState } from 'react';

// It’s similar to `useState`, except the value is also saved in `localStorage` (so it doesn’t get lost on refresh).
export function useLocalStorage(key, initialValue) {
  // Lazy initialization: Storage is accessed only during the first render, not during every render.
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch {
      // Corrupt JSON or storage blocked (private mode): app not crash
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // If storage is full or blocked, just ignore it—let the app keep running.
    }
  }, [key, value]);

  return [value, setValue];
}
