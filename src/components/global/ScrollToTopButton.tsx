'use client';

import { cn } from '@lib/utils';
import { type FunctionComponent, useCallback } from 'react';
import { RiArrowUpLine } from 'react-icons/ri';

interface ScrollToTopButtonProps {
    hidden?: boolean;
}

export const ScrollToTopButton: FunctionComponent<ScrollToTopButtonProps> = ({ hidden = true }) => {
    const handleClick = useCallback(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <button
            name="scroll-to-top-button"
            onClick={handleClick}
            className={cn(
                'z-50 fixed bottom-8 right-8 flex-center size-12 rounded-full bg-primary hover:bg-primary-light transition-all duration-300',
                hidden && 'hidden',
            )}
        >
            <RiArrowUpLine className="size-8 invert contrast-200" />
        </button>
    );
};
