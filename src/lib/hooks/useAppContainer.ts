import { useEffect, useRef } from 'react';

export const useAppContainer = () => {
    const appContainer = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        appContainer.current = document.querySelector<HTMLDivElement>('#app-container');

        if (!appContainer.current) {
            console.warn('App container not found');
        }

        return () => {
            appContainer.current = null; // Clean up reference on unmount
        };
    }, []);

    return appContainer.current;
};
