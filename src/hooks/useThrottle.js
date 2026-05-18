// Simple throttle hook: rapid calls ko limit karta hai
import { useRef } from 'react';

export default function useThrottle(callback, delay) {
    // Ref holds whether we are waiting for timeout
    const waiting = useRef(false);

    // Return throttled function
    return (...args) => {
        // Agar abhi waiting me hain to ignore kar do
        if (waiting.current) return;

        // Otherwise call the callback
        callback(...args);

        // Mark waiting and reset after delay
        waiting.current = true;

        setTimeout(() => {
            waiting.current = false;
        }, delay);
    };
}
