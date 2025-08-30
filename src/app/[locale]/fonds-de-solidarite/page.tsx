import { Button } from '@heroui/button';
import { URL_PARAMS } from '@lib/constants/core';
import { Link } from '@lib/i18n/navigation';
import type { ContactSubject } from '@lib/types/core';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { LuChevronRight } from 'react-icons/lu';

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('AppMetadata');

    return {
        title: t('solidarityFundPageTitle'),
    };
}

export default async function SolidarityFundPage() {
    const t = await getTranslations('SolidarityFundPage');

    return (
        <div className="flex flex-col items-center gap-8 md:gap-16 w-full px-4 md:px-10 lg:px-20 xl:px-40 2xl:px-60 3xl:px-80 sm:pt-8 pb-16">
            <Image
                src="/building.svg"
                alt={t('imageAlt')}
                width={751}
                height={669}
                priority
                className="h-[50vh]"
            />
            <div className="flex flex-col items-center gap-8 md:w-5/6 lg:w-4/5 xl:w-3/4 2xl:w-2/3 3xl:w-1/2">
                <div className="text-center space-y-4">
                    <h2 className="!normal-case">{t('title')}</h2>
                    <p>{t('description')}</p>
                </div>
                <Link
                    href={{
                        pathname: '/contact',
                        query: {
                            [URL_PARAMS.subject]: 'solidarityFund' as ContactSubject,
                        },
                    }}
                >
                    <Button
                        size="lg"
                        color="primary"
                        variant="ghost"
                        className="flex items-center text-xl p-6"
                        endContent={<LuChevronRight className="size-5" />}
                    >
                        {t('askForMoreInformation')}
                    </Button>
                </Link>
            </div>
        </div>
    );
}
