import { Footer } from '@components/global/Footer';
import { Header } from '@components/global/Header';
import { SuspenseBoundary } from '@components/ui/SuspenseBoundary';
import { APP_FONT, COLORS } from '@lib/constants';
import { i18nRouting } from '@lib/i18n/routing';
import { cn } from '@lib/utils';
import { HeroUIProvider } from '@heroui/react';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import type { PropsWithChildren } from 'react';
import type { Metadata, Viewport } from 'next';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import TopLoader from 'nextjs-toploader';
import { Toaster } from 'sonner';
import '@style/global.css';
import { SWRConfig } from 'swr';

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('AppMetadata');

    return {
        title: t('title'),
    };
}

export async function generateStaticParams(): Promise<Array<Record<string, string>>> {
    return i18nRouting.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
};

interface AppLayoutProps extends PropsWithChildren {
    params: Promise<{ locale: string }>;
}

export default async function AppLayout({ children, params }: AppLayoutProps) {
    const { locale } = await params;
    const messages = await getMessages();

    if (!hasLocale(i18nRouting.locales, locale)) {
        notFound();
    }

    setRequestLocale(locale);

    return (
        <html lang={locale}>
            <body
                className={cn('light', APP_FONT.className)}
                suppressHydrationWarning
            >
                <HeroUIProvider>
                    <NextIntlClientProvider
                        locale={locale}
                        messages={messages}
                    >
                        <SWRConfig value={{ shouldRetryOnError: false }}>
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
                            <div className="w-screen h-screen overflow-x-hidden">
                                <Header />
                                <main className="w-full min-h-[50vh]">
                                    <SuspenseBoundary>{children}</SuspenseBoundary>
                                </main>
                                <Footer />
                            </div>
                        </SWRConfig>
                    </NextIntlClientProvider>
                </HeroUIProvider>
            </body>
        </html>
    );
}
