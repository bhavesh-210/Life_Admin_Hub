// Debounce hook: fast-changing value ko delay karke stable value provide karta hai
import { useEffect, useState } from 'react';

export default function useDebounce(value, delay) {
    // Internal state to hold debounced value
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        // Timer start — agar value change nahi hoti hai to delay ke baad update
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Cleanup: agar value change ho jayegi to previous timer clear ho jayega
        return () => clearTimeout(timer);
    }, [value, delay]);

    return debouncedValue;
}
