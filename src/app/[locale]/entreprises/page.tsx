import { CompaniesStats } from '@components/companies/CompaniesStats';
import { CompaniesStatsSkeleton } from '@components/companies/CompaniesStatsSkeleton';
import { SPECIALITIES, STUDY_LEVELS } from '@lib/constants/core';
import { COUNTRY_CODES } from '@lib/constants/countries';
import type { CompaniesFilters } from '@lib/types/dtos';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { CompaniesList } from '@components/companies/CompaniesList';
import { CompaniesListSkeleton } from '@components/companies/CompaniesListSkeleton';
import { SuspenseBoundary } from '@components/ui/SuspenseBoundary';
import Image from 'next/image';

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('AppMetadata');

    return {
        title: t('companiesPageTitle'),
    };
}

type CompaniesFiltersAsParams = {
    [K in keyof CompaniesFilters]: string | string[] | undefined;
};

interface CompaniesPageProps {
    searchParams: Promise<CompaniesFiltersAsParams>;
}

export default async function CompaniesPage({ searchParams }: CompaniesPageProps) {
    const t = await getTranslations('CompaniesPage');
    const filtersParams = await searchParams;

    const filters: CompaniesFilters = {
        page: typeof filtersParams.page === 'string' ? parseInt(filtersParams.page, 10) : undefined,
        sector: !Array.isArray(filtersParams.sector) ? filtersParams.sector : undefined,
        city: !Array.isArray(filtersParams.city) ? filtersParams.city : undefined,
        country:
            !Array.isArray(filtersParams.country) &&
            COUNTRY_CODES.includes(filtersParams.country as (typeof COUNTRY_CODES)[number])
                ? (filtersParams.country as (typeof COUNTRY_CODES)[number])
                : undefined,
        speciality:
            !Array.isArray(filtersParams.speciality) &&
            SPECIALITIES.includes(filtersParams.speciality as (typeof SPECIALITIES)[number])
                ? (filtersParams.speciality as (typeof SPECIALITIES)[number])
                : undefined,
        studyLevel:
            !Array.isArray(filtersParams.studyLevel) &&
            STUDY_LEVELS.includes(filtersParams.studyLevel as (typeof STUDY_LEVELS)[number])
                ? (filtersParams.studyLevel as (typeof STUDY_LEVELS)[number])
                : undefined,
        greenLabel:
            filtersParams.greenLabel &&
            !Array.isArray(filtersParams.greenLabel) &&
            ['true', 'false'].includes(filtersParams.greenLabel)
                ? Boolean(filtersParams.greenLabel)
                : undefined,
    };

    return (
        <div className="w-full pb-16">
            <div className="relative w-full h-80 md:h-100 xl:h-120">
                <Image
                    src="/entretien_dos.jpg"
                    alt={t('altText')}
                    fill
                    priority
                    quality={100}
                    className="object-cover object-center brightness-50"
                />
                <div className="absolute -bottom-52 md:-bottom-24 left-1/2 -translate-x-1/2 flex max-md:flex-col items-center justify-evenly gap-4 w-7/8 sm:w-6/7 md:w-5/6 lg:w-4/5 xl:w-3/4 2xl:w-2/3 md:h-48 p-8 animate-appearance-in glassy">
                    <SuspenseBoundary fallback={<CompaniesStatsSkeleton />}>
                        <CompaniesStats />
                    </SuspenseBoundary>
                </div>
            </div>
            <div className="flex flex-col items-center gap-y-16 w-full px-4 md:px-10 lg:px-20 xl:px-40 2xl:px-60 pt-40 max-md:pt-60">
                <div className="flex flex-col items-center gap-y-4 text-center">
                    <h1>{t('title')}</h1>
                    <p className="text-xl w-full sm:w-5/6 md:w-4/5 lg:w-3/4 xl:w-2/3 2xl:w-1/2">
                        {t('description')}
                    </p>
                </div>
                <SuspenseBoundary fallback={<CompaniesListSkeleton count={6} />}>
                    <CompaniesList filters={filters} />
                </SuspenseBoundary>
            </div>
        </div>
    );
}
