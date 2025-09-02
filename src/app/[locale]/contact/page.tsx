import { ContactForm } from '@components/contact/ContactForm';
import { BrochureSection } from '@components/global/BrochureSection';
import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import Image from 'next/image';

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('AppMetadata');

    return {
        title: t('contactPageTitle'),
    };
}

export default async function ContactPage() {
    const t = await getTranslations('ContactPage');
    const locale = await getLocale();

    return (
        <div>
            <section className="flex max-lg:flex-col max-lg:items-center gap-x-20 gap-y-8 px-4 md:px-10 lg:px-20 xl:px-40 2xl:px-60 md:pt-8 pb-16 shadow-md">
                <div className="lg:flex-1">
                    <Image
                        src="/contact.svg"
                        alt={t('imageAlt')}
                        width={600}
                        height={600}
                        priority
                    />
                </div>
                <div className="max-lg:w-full lg:flex-1 space-y-16">
                    <div className="space-y-4 max-md:text-center">
                        <h1>{t('title')}</h1>
                        <p className="text-lg">{t('description')}</p>
                    </div>
                    <ContactForm locale={locale} />
                </div>
            </section>
            <BrochureSection />
        </div>
    );
}
