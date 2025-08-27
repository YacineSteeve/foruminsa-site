import { Button } from '@heroui/button';
import { Link } from '@lib/i18n/navigation';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import type { FunctionComponent } from 'react';
import { LuBuilding2, LuChevronRight } from 'react-icons/lu';

export const EventSection: FunctionComponent = async () => {
    const t = await getTranslations('EventSection');

    return (
        <section className="flex max-lg:flex-col justify-between gap-x-8 xl:gap-x-16 gap-y-24 lg:gap-y-32 w-full px-4 md:px-10 lg:px-20 xl:px-40 2xl:px-60 3xl:px-80 pt-8 md:pt-16 pb-16 lg:pb-24 xl:pb-32 lg:*:flex-1">
            <div className="max-lg:flex max-lg:justify-center">
                <div className="relative max-sm:-translate-x-18 sm:max-lg:-translate-x-20">
                    <div className="relative w-52 sm:w-60 xl:w-72 3xl:w-80 h-90 sm:h-100 xl:h-110 3xl:h-120 shadow-md overflow-hidden">
                        <Image
                            src="/interview-papers.jpg"
                            alt={t('imageOneAlt')}
                            fill
                            sizes="100%,100%"
                            className="object-cover object-center hover:scale-110 transition-transform duration-300"
                        />
                    </div>
                    <div className="absolute top-16 left-36 sm:left-40 xl:left-52 3xl:left-64">
                        <div className="relative w-52 sm:w-60 xl:w-72 3xl:w-80 h-90 sm:h-100 xl:h-110 3xl:h-120 border-l-4 border-t-4 border-white overflow-hidden">
                            <Image
                                src="/entretien2.jpg"
                                alt={t('imageTwoAlt')}
                                fill
                                sizes="100%,100%"
                                className="object-cover object-center hover:scale-110 transition-transform duration-300"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center max-sm:items-center gap-8">
                <div className="space-y-4 max-sm:text-center">
                    <h2 className="text-primary">{t('title')}</h2>
                    <p className="text-lg">{t('description')}</p>
                </div>
                <div className="flex flex-wrap max-sm:justify-center items-center gap-4 md:gap-8 *:block">
                    <Link href="/evenement">
                        <Button
                            size="lg"
                            color="primary"
                            variant="ghost"
                            className="flex items-center text-xl p-6"
                            endContent={<LuChevronRight className="size-5" />}
                        >
                            {t('discoverEvent')}
                        </Button>
                    </Link>
                    <Link href="/entreprises">
                        <Button
                            size="lg"
                            color="primary"
                            className="flex items-center text-xl p-6 border-2 border-primary"
                            startContent={<LuBuilding2 className="size-5" />}
                        >
                            {t('exploreCompanies')}
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};
