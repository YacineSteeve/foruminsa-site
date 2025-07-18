import { useEffect, useState } from 'react';

export const useDebounce = <T>(args: { value: T; delay: number }): T => {
    const [debouncedValue, setDebouncedValue] = useState(args.value);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(args.value), args.delay);

        return () => clearTimeout(timer);
    }, [args.value, args.delay]);

    return debouncedValue;
};
