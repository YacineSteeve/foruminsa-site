import { Button } from '@heroui/button';
import { JOBTEASER_EVENT_URL } from '@lib/constants/core';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import type { FunctionComponent } from 'react';

export const JobteaserSection: FunctionComponent = async () => {
    const t = await getTranslations('JobteaserSection');

    return (
        <section className="relative flex-center w-full h-100">
            <Image
                src="/conference-sit.jpg"
                alt={t('imageAlt')}
                fill
                sizes="100%,100%"
                quality={100}
                className="object-cover object-center brightness-50"
            />
            <div className="flex-center flex-col gap-4 glassy w-5/6 sm:w-2/3 md:w-1/2 lg:w-2/5 xl:w-1/3 3xl:w-1/4 aspect-video">
                <Link
                    href={JOBTEASER_EVENT_URL}
                    target="_blank"
                >
                    <Button
                        size="lg"
                        color="primary"
                        className="lg:text-xl lg:p-8"
                    >
                        {t('registerNow')}
                    </Button>
                </Link>
                <p className="text-white text-lg font-semibold">{t('on')}</p>
                <div className="relative w-2/3 aspect-[5/1] rounded-lg overflow-hidden">
                    <Image
                        src="/jobteaser.png"
                        alt={t('jobteaserLogoAlt')}
                        fill
                        quality={100}
                        sizes="100%,100%"
                        className="object-cover object-center"
                    />
                </div>
            </div>
        </section>
    );
};
