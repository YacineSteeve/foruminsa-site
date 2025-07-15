import { SuspenseBoundary } from '@components/ui/SuspenseBoundary';
import type { PropsWithChildren } from 'react';
import type { Metadata, Viewport } from 'next';
import TopLoader from 'nextjs-toploader';
import { Toaster } from 'sonner';
import '@style/global.css';

export const metadata: Metadata = {
    title: 'Forum By INSA',
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
};

export default function RootLayout({ children }: PropsWithChildren) {
    return (
        <html lang="fr">
            <body
                id="app"
                suppressHydrationWarning
            >
                {/* Top loader for page loading indication (on navigation) */}
                <TopLoader
                    color="#9bcd5f"
                    shadow="0 0 10px #9bcd5f,0 0 5px #9bcd5f"
                    initialPosition={0.1}
                    speed={300}
                    crawlSpeed={100}
                />
                {/* Toast notifications for user feedback */}
                <Toaster
                    position="top-center"
                    offset={20}
                    toastOptions={{
                        classNames: {
                            title: 'text-sm',
                        },
                    }}
                    richColors
                    expand
                    pauseWhenPageIsHidden
                />
                <SuspenseBoundary>{children}</SuspenseBoundary>
            </body>
        </html>
    );
}
