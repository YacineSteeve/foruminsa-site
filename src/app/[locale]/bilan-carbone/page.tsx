import { CarbonBalanceRankingTable } from '@components/carbon-balance/CarbonBalanceRankingTable';
import { Card } from '@heroui/card';
import { CompanyService } from '@lib/services';
import {
    COMPANIES_RANKING_PAGE_SIZE,
    SHOW_CARBON_BALANCE_INFO,
    URL_PARAMS,
} from '@lib/constants/core';
import { FORUM_LABEL_ICON } from '@lib/constants/ui';
import type { CompaniesFiltersAsSearchParams } from '@lib/types/dtos';
import { cn } from '@lib/utils';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import type { FunctionComponent, HTMLAttributes } from 'react';
import type { IconType } from 'react-icons';
import {
    LuHandshake,
    LuLeaf,
    LuVegan,
    LuBusFront,
    LuGift,
    LuCalculator,
    LuFactory,
    LuUser,
    LuPlugZap,
} from 'react-icons/lu';

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('AppMetadata');

    return {
        title: t('carbonBalancePageTitle'),
    };
}

interface CarbonBalancePageProps {
    params: Promise<{
        locale: string;
    }>;
    searchParams: Promise<CompaniesFiltersAsSearchParams>;
}

export default async function CarbonBalancePage({ params, searchParams }: CarbonBalancePageProps) {
    const [awaitedParams, filtersParams, t] = await Promise.all([
        params,
        searchParams,
        getTranslations('CarbonBalancePage'),
    ]);

    const locale = awaitedParams.locale as Locale;
    const pageValue = filtersParams[URL_PARAMS.page];
    const pageNumber = typeof pageValue === 'string' ? parseInt(pageValue, 10) : 1;
    const page = isNaN(pageNumber) || pageNumber < 1 ? 1 : pageNumber;

    const greenLabelValue = filtersParams[URL_PARAMS.greenLabel];
    const greenLabel = typeof greenLabelValue === 'string' ? greenLabelValue === 'true' : undefined;

    const searchValue = filtersParams[URL_PARAMS.search];
    const search = typeof searchValue === 'string' ? searchValue : undefined;

    const paginatedCompanies = CompanyService.getAllCompanies({
        search,
        page,
        greenLabel,
        pageSize: COMPANIES_RANKING_PAGE_SIZE,
        sortByCarbonFootprint: true,
    });

    return (
        <div className="w-full *:px-4 *:md:px-10 *:lg:px-20 *:xl:px-40 *:2xl:px-60 *:3xl:px-80">
            <section className="w-full pb-8 space-y-8 bg-gradient-to-t from-primary/10 to-white shadow-lg">
                <div className="flex max-md:flex-col-reverse justify-between items-center max-lg:gap-8 w-full *:flex-1">
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
                </div>
                <div className="w-full space-y-4">
                    <h3 className="text-primary text-center">{t('ourEnvironmentalCommitments')}</h3>
                    <div className="w-max max-w-full mx-auto space-y-4">
                        <EnvironmentalCommitmentItem
                            icon={LuVegan}
                            color="#17C964"
                            description={t('commitmentOne')}
                        />
                        <EnvironmentalCommitmentItem
                            icon={LuBusFront}
                            color="#006FEE"
                            description={t('commitmentTwo')}
                        />
                        <EnvironmentalCommitmentItem
                            icon={LuGift}
                            color="#F5A524"
                            description={t('commitmentThree')}
                        />
                        <EnvironmentalCommitmentItem
                            icon={LuCalculator}
                            color="#7828C8"
                            description={t('commitmentFour')}
                        />
                    </div>
                </div>
            </section>
            <section className="w-full py-8 md:py-16 space-y-8">
                <div className="flex max-md:flex-col justify-between items-center gap-8 lg:gap-16 w-full *:flex-1">
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
                </div>
                {SHOW_CARBON_BALANCE_INFO && (
                    <div className="w-full space-y-4">
                        <h3 className="text-primary text-center">{t('theResult')}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 w-max max-w-full mx-auto">
                            <div className="sm:col-span-2 md:col-span-3 p-8 space-y-2 text-center text-white bg-primary rounded-xl">
                                <p className="text-lg">{t('totalCarbonFootprint')}</p>
                                <p className="text-6xl font-bold !leading-none">
                                    20.8{' '}
                                    <span className="text-xl font-normal !leading-none">
                                        t CO2e
                                    </span>
                                </p>
                            </div>
                            <CarbonBalanceInfoCard
                                icon={LuFactory}
                                color="#F5A524"
                                value="12.5"
                                label={t('scopeOne')}
                                unit="t CO2e"
                            />
                            <CarbonBalanceInfoCard
                                icon={LuPlugZap}
                                color="#7828C8"
                                value="8.3"
                                label={t('scopeTwo')}
                                unit="t CO2e"
                            />
                            <CarbonBalanceInfoCard
                                icon={LuUser}
                                color="#17C964"
                                value="0.45"
                                label={t('perStudent')}
                                unit="kgCO2e"
                                className="sm:max-md:col-span-2"
                            />
                        </div>
                    </div>
                )}
            </section>
            {SHOW_CARBON_BALANCE_INFO && (
                <section className="space-y-8 w-full px-2 *:sm:px-4 *:md:px-10 *:lg:px-20 *:xl:px-40 *:2xl:px-60 *:3xl:px-80 py-8 md:py-16 bg-default/20">
                    <div className="flex-center flex-col gap-4 text-center">
                        <LuLeaf className="size-12 text-success" />
                        <h2 className="text-primary">{t('companiesRanking')}</h2>
                        <p className="text-lg">{t('companiesRankingDescription')}</p>
                    </div>
                    <CarbonBalanceRankingTable
                        filters={{
                            search,
                            page,
                            greenLabel,
                        }}
                        paginatedCompanies={paginatedCompanies}
                        locale={locale}
                    />
                </section>
            )}
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

interface EnvironmentalCommitmentItemProps {
    icon: IconType;
    color: string;
    description: string;
}

const EnvironmentalCommitmentItem: FunctionComponent<EnvironmentalCommitmentItemProps> = ({
    icon: Icon,
    description,
    color,
}) => {
    return (
        <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-default/50">
            <Icon
                className="size-8"
                style={{ color }}
            />
            <p className="flex-1 text-lg">{description}</p>
        </div>
    );
};

interface CarbonBalanceInfoCardProps {
    icon: IconType;
    color: string;
    label: string;
    value: string;
    unit: string;
    className?: HTMLAttributes<HTMLDivElement>['className'];
}

const CarbonBalanceInfoCard: FunctionComponent<CarbonBalanceInfoCardProps> = ({
    icon: Icon,
    color,
    label,
    value,
    unit,
    className,
}) => {
    return (
        <div
            className={cn('p-4 bg-white rounded-xl border-2', className)}
            style={{ borderColor: `${color}40` }}
        >
            <Icon
                className="size-8"
                style={{ color }}
            />
            <p className="text-4xl font-bold !leading-none mt-4 mb-2">
                {value} <span className="text-lg font-normal !leading-none">{unit}</span>
            </p>
            <p className="md:text-lg text-gray-500 !leading-none">{label}</p>
        </div>
    );
};
