import { useRef } from 'react';

export default function useThrottle(callback, delay) {
    const waiting = useRef(false);

    return (...args) => {
        if (waiting.current) return;

        callback(...args);

        waiting.current = true;

        setTimeout(() => {
            waiting.current = false;
        }, delay);
    };
}
