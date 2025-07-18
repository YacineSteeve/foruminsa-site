import { Footer } from '@components/global/Footer';
import { Header } from '@components/global/Header';
import { SuspenseBoundary } from '@components/ui/SuspenseBoundary';
import { PRIMARY_COLOR } from '@lib/constants';
import { cn } from '@lib/utils';
import type { PropsWithChildren } from 'react';
import type { Metadata, Viewport } from 'next';
import { Lato } from 'next/font/google';
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

const appFont = Lato({
    subsets: ['latin'],
    weight: ['100', '300', '400', '700', '900'],
});

export default function RootLayout({ children }: PropsWithChildren) {
    return (
        <html lang="fr">
            <body
                id="app"
                className={cn(
                    'w-screen h-screen overflow-x-hidden overflow-y-auto',
                    appFont.className,
                )}
                suppressHydrationWarning
            >
                {/* Top loader for page loading indication (on navigation) */}
                <TopLoader
                    color={PRIMARY_COLOR}
                    shadow={`0 0 10px ${PRIMARY_COLOR}, 0 0 5px ${PRIMARY_COLOR}`}
                    initialPosition={0.1}
                    speed={300}
                    crawlSpeed={100}
                    showSpinner={false}
                />
                {/* Toast notifications for user feedback */}
                <Toaster
                    expand
                    richColors
                    offset={20}
                    position="top-center"
                    toastOptions={{
                        classNames: {
                            title: 'text-sm',
                        },
                    }}
                />
                <Header />
                <main className="w-full min-h-screen">
                    <SuspenseBoundary>{children}</SuspenseBoundary>
                </main>
                <Footer />
            </body>
        </html>
    );
}
