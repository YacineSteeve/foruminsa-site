import { CarbonBalanceRankingTable } from '@components/carbon-balance/CarbonBalanceRankingTable';
import { Card } from '@heroui/card';
import { FORUM_LABEL_ICON } from '@lib/constants/ui';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { LuHandshake, LuLeaf } from 'react-icons/lu';

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('AppMetadata');

    return {
        title: t('carbonBalancePageTitle'),
    };
}

export default async function CarbonBalancePage() {
    const t = await getTranslations('CarbonBalancePage');

    return (
        <div className="w-full *:px-4 *:md:px-10 *:lg:px-20 *:xl:px-40 *:2xl:px-60 *:3xl:px-80">
            <section className="flex max-md:flex-col-reverse justify-between items-center max-lg:gap-8 w-full py-8 bg-gradient-to-t from-primary/10 to-white shadow-lg *:flex-1">
                <div className="space-y-4 max-md:text-center">
                    <h1 className="text-primary">{t('title')}</h1>
                    <p className="text-xl">{t('description')}</p>
                </div>
                <div className="relative size-100 min-w-100 min-h-100">
                    <Image
                        src="/ecology2.svg"
                        alt={t('imageOneAlt')}
                        fill
                        sizes="100%,100%"
                        priority
                        className="object-contain object-center"
                    />
                </div>
            </section>
            <section className="flex max-md:flex-col justify-between items-center gap-8 lg:gap-16 w-full py-8 md:py-16 *:flex-1">
                <div className="relative size-100 min-w-100 min-h-100 max-md:mt-0.5">
                    <Image
                        src="/environmental-study.svg"
                        alt={t('imageTwoAlt')}
                        fill
                        priority
                        sizes="100%,100%"
                        className="object-contain object-center"
                    />
                </div>
                <div className="space-y-4 max-md:text-center">
                    <h2 className="text-primary">{t('methodology')}</h2>
                    <p className="text-xl">{t('methodologyDescription')}</p>
                </div>
            </section>
            <section className="space-y-8 w-full px-2 *:sm:px-4 *:md:px-10 *:lg:px-20 *:xl:px-40 *:2xl:px-60 *:3xl:px-80 py-8 md:py-16 bg-default/20">
                <div className="flex-center flex-col gap-4 text-center">
                    <LuLeaf className="size-12 text-success" />
                    <h2 className="text-primary">{t('companiesRanking')}</h2>
                    <p className="text-lg">{t('companiesRankingDescription')}</p>
                </div>
                <CarbonBalanceRankingTable />
            </section>
            <section className="flex max-lg:flex-col justify-center gap-8 lg:gap-16 w-full py-8 md:py-16 *:flex-1">
                <Card
                    disableAnimation
                    disableRipple
                    shadow="md"
                    className="space-y-4 p-8"
                >
                    <div className="flex items-center gap-4 text-success">
                        <FORUM_LABEL_ICON className="size-8" />
                        <h3 className="!normal-case">{t('theForumGreenLabel')}</h3>
                    </div>
                    <p className="text-lg">{t('theForumGreenLabelDescription')}</p>
                </Card>
                <Card
                    disableAnimation
                    disableRipple
                    shadow="md"
                    className="space-y-4 p-8"
                >
                    <div className="flex items-center gap-4 text-purple-500">
                        <LuHandshake className="size-8" />
                        <h3 className="!normal-case">{t('ourPartner')}</h3>
                    </div>
                    <p className="text-lg">{t('ourPartnerDescription')}</p>
                </Card>
            </section>
        </div>
    );
}
