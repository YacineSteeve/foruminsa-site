'use client';

import { Button } from '@heroui/button';
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
        <Button
            aria-label="Revenir en haut de la page"
            isIconOnly
            color="primary"
            size="lg"
            radius="full"
            onPress={handleClick}
            className={cn(
                'z-50 fixed bottom-8 right-8',
                hidden && 'hidden',
            )}
        >
            <RiArrowUpLine className="size-8 invert contrast-200" />
        </Button>
    );
};
