import { useEffect, useState } from 'react';

// The value is updated when the user stops typing for a duration of `delay` ms.
export function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer); // Cleanup: Cancel the timer on every keystroke
  }, [value, delay]);

  return debounced;
}
