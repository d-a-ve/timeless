import { useEffect, useState } from "react";

export function useDebounce<TData>(
  enabled: boolean,
  value: TData,
  delay: number,
  callbackFn?: (value: TData) => void,
) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    if (!enabled) return;

    // for values that are not primitive e.g arrays, objects, we can't compare directly as their reference will be the same.
    if (typeof value === "object") {
      if (JSON.stringify(debouncedValue) === JSON.stringify(value)) return;
    }

    if (debouncedValue === value) return;

    const handler = setTimeout(() => {
      setDebouncedValue(value);
      if (callbackFn) {
        callbackFn(value);
      }
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay, callbackFn, enabled, debouncedValue]);

  return debouncedValue;
}
