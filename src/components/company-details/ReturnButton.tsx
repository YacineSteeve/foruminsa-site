'use client';

import { Button } from '@heroui/button';
import { useRouter } from '@lib/i18n/navigation';
import { type FunctionComponent, useCallback } from 'react';
import { LuChevronLeft } from 'react-icons/lu';

export const ReturnButton: FunctionComponent = () => {
    const router = useRouter();

    const handlePress = useCallback(() => {
        router.back();
    }, [router]);

    return (
        <Button
            isIconOnly
            color="primary"
            className="absolute top-4 left-4"
            onPress={handlePress}
        >
            <LuChevronLeft className="size-8" />
        </Button>
    );
};
