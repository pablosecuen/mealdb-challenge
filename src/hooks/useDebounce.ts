import { useState, useEffect } from 'react';

/**
 * Custom hook to debounce a value by a specified delay.
 *
 * @template T - The type of the value to debounce.
 * @param {T} value - The input value to debounce.
 * @param {number} delay - The delay in milliseconds to wait before updating the debounced value.
 * @returns {T} The debounced value.
 *
 * @example
 * ```typescript
 * const debouncedSearchTerm = useDebounce(searchTerm, 500);
 * ```
 */
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
