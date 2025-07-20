import { Footer } from '@components/global/Footer';
import { Header } from '@components/global/Header';
import DictionaryProvider from '@components/providers/DictionaryProvider';
import { SuspenseBoundary } from '@components/ui/SuspenseBoundary';
import { APP_FONT, COLORS, SUPPORTED_LANGUAGES } from '@lib/constants';
import { getDictionary, type Language } from '@lib/i18n';
import type { GlobalRouteParams } from '@lib/types';
import { cn } from '@lib/utils';
import { HeroUIProvider } from '@heroui/react';
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

export async function generateStaticParams() {
    return Object.values(SUPPORTED_LANGUAGES)
        .map((language) => ({
            language,
        }));
}

interface RootLayoutProps extends PropsWithChildren {
    params: Promise<GlobalRouteParams>;
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
    const { language } = await params;
    const dictionary = await getDictionary(language as Language);
    
    return (
        <html lang={language}>
            <body
                className={cn(
                    'light w-screen h-screen overflow-x-hidden overflow-y-auto',
                    APP_FONT.className,
                )}
                suppressHydrationWarning
            >
                <HeroUIProvider>
                    <DictionaryProvider dictionary={dictionary}>
                        {/* Top loader for page loading indication (on navigation) */}
                        <TopLoader
                            color={COLORS.primary}
                            shadow={`0 0 10px ${COLORS.primary}, 0 0 5px ${COLORS.primary}`}
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
                        <Header/>
                        <main className="w-full min-h-screen">
                            <SuspenseBoundary>{children}</SuspenseBoundary>
                        </main>
                        <Footer/>
                    </DictionaryProvider>
                </HeroUIProvider>
            </body>
        </html>
    );
}
