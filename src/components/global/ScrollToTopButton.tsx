'use client';

import { Button } from '@heroui/button';
import { Tooltip } from '@heroui/tooltip';
import { useAppContainer } from '@lib/hooks';
import { cn } from '@lib/utils';
import { useTranslations } from 'next-intl';
import { type FunctionComponent, useCallback } from 'react';
import { RiArrowUpLine } from 'react-icons/ri';

interface ScrollToTopButtonProps {
    hidden?: boolean;
}

export const ScrollToTopButton: FunctionComponent<ScrollToTopButtonProps> = ({ hidden = true }) => {
    const appContainer = useAppContainer();
    const t = useTranslations('ScrollToTopButton');

    const handleClick = useCallback(() => {
        appContainer?.scrollTo({ top: 0, behavior: 'smooth' });
    }, [appContainer]);

    return (
        <Tooltip content={t('tooltip')}>
            <Button
                aria-label={t('ariaLabel')}
                isIconOnly
                color="primary"
                size="lg"
                radius="full"
                onPress={handleClick}
                className={cn('z-50 fixed bottom-8 right-8', hidden && 'hidden')}
            >
                <RiArrowUpLine className="size-8" />
            </Button>
        </Tooltip>
    );
};
