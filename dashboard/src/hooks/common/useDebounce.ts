import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, timeout = 500) {
  const [debounceValue, setDebounceValue] = useState<T>(value);
  useEffect(() => {
    const timeoutId = setTimeout(() => setDebounceValue(value), timeout);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [value, timeout]);
  return debounceValue;
}
