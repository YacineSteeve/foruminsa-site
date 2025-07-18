import { useEffect, useRef, useState } from 'react';

export const useInView = (options?: IntersectionObserverInit) => {
    const ref = useRef<HTMLElement | null>(null);
    const [isIntersecting, setIsIntersecting] = useState(false);

    useEffect(() => {
        const element = ref.current;

        if (!element) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (!entry) return;

            setIsIntersecting(entry.isIntersecting);
        }, options);

        observer.observe(element);

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, [ref, options]);

    return { ref, inView: isIntersecting };
};
