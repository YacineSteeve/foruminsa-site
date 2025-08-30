import { Button } from '@heroui/button';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import type { FunctionComponent } from 'react';
import { LuCalendarDays } from 'react-icons/lu';

export const HeroSection: FunctionComponent = async () => {
    const t = await getTranslations('HeroSection');

    return (
        <section className="relative flex justify-between items-center 2xl:gap-16 w-full h-[calc(100vh-4.75rem)] min-h-max max-xl:py-16">
            <Image
                src="/entretien1.jpg"
                alt={t('backgroundImageAlt')}
                fill
                sizes="100%,100%"
                quality={100}
                priority
                className="object-cover object-center brightness-25"
            />
            <div className="z-10 flex flex-col max-md:items-center gap-20 flex-3/5 md:pl-10 lg:pl-20 xl:pl-40 2xl:pl-60 text-white">
                <div className="space-y-4 max-md:text-center">
                    <p className="text-2xl md:text-3xl xl:text-4xl">{t('titlePartOne')}</p>
                    <h1 className="!text-5xl md:!text-6xl 3xl:!text-7xl normal-case">
                        {t('titlePartTwo')}
                    </h1>
                    <p className="text-2xl md:text-3xl xl:text-4xl">{t('titlePartThree')}</p>
                </div>
                <div className="flex flex-wrap max-md:justify-center items-center gap-x-16 gap-y-8 *:block">
                    <Link
                        href="https://insa-toulouse.jobteaser.com/fr/events/229266"
                        target="_blank"
                    >
                        <Button
                            size="lg"
                            color="primary"
                            className="text-xl p-6 2xl:text-2xl lg:p-8 border-2 border-primary"
                        >
                            {t('register')}
                        </Button>
                    </Link>
                    <Link href="/insa">
                        <Button
                            size="lg"
                            variant="ghost"
                            className="text-xl p-6 2xl:text-2xl lg:p-8 not-data-[hover=true]:text-white"
                        >
                            {t('discoverINSA')}
                        </Button>
                    </Link>
                </div>
                <div className="flex items-center gap-4">
                    <LuCalendarDays className="size-8" />
                    <div className="*:text-xl *:uppercase">
                        <p>{t('eventDate')}</p>
                        <p>{t('eventTime')}</p>
                    </div>
                </div>
            </div>
            <div className="relative flex-2/5 aspect-square overflow-hidden max-xl:hidden">
                <svg
                    viewBox="0 0 200 200"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute right-0 scale-150"
                >
                    <path
                        fill="#fbeeee99"
                        d="M47.9,-60.7C54.4,-51.6,46.7,-29.3,47.1,-10.7C47.5,7.8,55.9,22.4,54.2,36.9C52.5,51.3,40.8,65.6,28.4,63.9C16.1,62.2,3.1,44.7,-12.6,37.6C-28.2,30.6,-46.6,34.1,-52,28.3C-57.3,22.6,-49.7,7.6,-45.8,-7C-42,-21.7,-42.1,-35.9,-35.1,-44.9C-28.1,-53.8,-14,-57.4,3.3,-61.4C20.7,-65.4,41.4,-69.7,47.9,-60.7Z"
                        transform="translate(100 100)"
                        className="glassy"
                    />
                </svg>
                <Image
                    src="/logo_square.png"
                    alt={t('foregroundImageAlt')}
                    width={800}
                    height={800}
                    quality={100}
                    priority
                    className="absolute right-0 scale-85 animate-float"
                />
            </div>
        </section>
    );
};
