'use client';

import { Alert } from '@heroui/alert';
import { Button } from '@heroui/button';
import { useTranslations } from 'next-intl';

interface ErrorProps {
    error: Error;
    reset: VoidFunction;
}

// The error boundary component that displays an error message and a retry button
export default function ErrorPage({ error, reset }: ErrorProps) {
    const t = useTranslations('ErrorPage');

    console.error(error);

    return (
        <div className="relative flex-center size-full">
            <div className="flex flex-col items-center gap-10 w-full px-4 py-40">
                <h4 className="!normal-case">{t('title')}</h4>
                <Alert
                    color="danger"
                    description={
                        <pre className="w-full max-h-80 p-5 rounded-md text-sm text-wrap overflow-y-auto">
                            {error.message.toLowerCase() === 'failed to fetch'
                                ? t('title')
                                : error.message}
                        </pre>
                    }
                    className="w-full md:w-192"
                />
                <div className="flex items-center gap-5">
                    <Button onPress={reset}>{t('retry')}</Button>
                </div>
            </div>
        </div>
    );
}
