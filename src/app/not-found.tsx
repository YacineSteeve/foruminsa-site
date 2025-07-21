'use client';

import { APP_FONT, DEFAULT_LANGUAGE } from '@lib/constants';
import { cn } from '@lib/utils';
import Error from 'next/error';

export default function NotFound() {
    return (
        <html lang={DEFAULT_LANGUAGE}>
            <body
                className={cn(
                    'light w-screen h-screen overflow-x-hidden overflow-y-auto',
                    APP_FONT.className,
                )}
                suppressHydrationWarning
            >
                <Error statusCode={404}/>
            </body>
        </html>
    );
}
