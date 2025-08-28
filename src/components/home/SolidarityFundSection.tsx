import { Button } from '@heroui/button';
import { Link } from '@lib/i18n/navigation';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import type { FunctionComponent } from 'react';
import { LuChevronRight } from 'react-icons/lu';

export const SolidarityFundSection: FunctionComponent = async () => {
    const t = await getTranslations('SolidarityFundSection');

    return (
        <section className="flex max-lg:flex-col-reverse gap-x-8 md:gap-x-16 xl:gap-x-24 3xl:gap-x-32 gap-y-16 lg:gap-y-32 w-full px-4 md:px-8 xl:px-16 3xl:px-32 py-20 lg:*:flex-1">
            <div className="flex flex-col items-center lg:items-end gap-8 my-auto">
                <div className="xl:w-3/4 space-y-4 text-center lg:text-end">
                    <h2 className="text-primary">{t('title')}</h2>
                    <p className="text-lg">{t('description')}</p>
                </div>
                <Link href="/fonds-de-solidarite">
                    <Button
                        size="lg"
                        color="primary"
                        variant="ghost"
                        className="flex items-center text-xl p-6"
                        endContent={<LuChevronRight className="size-5" />}
                    >
                        {t('learnMore')}
                    </Button>
                </Link>
            </div>
            <div className="relative h-100 lg:h-120 aspect-video rounded-r-xl overflow-hidden">
                <Image
                    src="/coins.jpg"
                    alt={t('imageAlt')}
                    fill
                    sizes="100%,100%"
                    className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white to-50% to-transparent" />
            </div>
        </section>
    );
};
