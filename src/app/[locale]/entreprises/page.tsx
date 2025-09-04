import { CompaniesFiltersButton } from '@components/companies/CompaniesFiltersButton';
import { CompaniesPagination } from '@components/companies/CompaniesPagination';
import { CompaniesSearchInput } from '@components/companies/CompaniesSearchInput';
import { CompaniesStatsItem } from '@components/companies/CompaniesStatsItem';
import { CompanyCard } from '@components/companies/CompanyCard';
import { CompanyGreenLabel } from '@components/companies/CompanyGreenLabel';
import { Alert } from '@heroui/alert';
import { Divider } from '@heroui/divider';
import { CompanyService } from '@lib/services';
import { COMPANIES_LIST_PAGE_SIZE, SPECIALITIES, STUDY_LEVELS } from '@lib/constants/core';
import { COUNTRY_CODES } from '@lib/constants/countries';
import { FORUM_LABEL_ICON } from '@lib/constants/ui';
import type { CountryCode, Speciality, StudyLevel } from '@lib/types/entities';
import type { CompaniesFilters, CompaniesFiltersAsSearchParams } from '@lib/types/dtos';
import { hasGreenLabel } from '@lib/utils';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Fragment } from 'react';

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('AppMetadata');

    return {
        title: t('companiesPageTitle'),
    };
}

interface CompaniesPageProps {
    params: Promise<{
        locale: Locale;
    }>;
    searchParams: Promise<CompaniesFiltersAsSearchParams>;
}

export default async function CompaniesPage({ params, searchParams }: CompaniesPageProps) {
    const [{ locale }, filtersParams, t] = await Promise.all([
        params,
        searchParams,
        getTranslations('CompaniesPage'),
    ]);

    const companiesStats = CompanyService.getCompaniesStats();

    const filters: CompaniesFilters = {
        search: typeof filtersParams.search === 'string' ? filtersParams.search : undefined,
        page: typeof filtersParams.page === 'string' ? parseInt(filtersParams.page, 10) : undefined,
        sector:
            typeof filtersParams.sector === 'string'
                ? parseInt(filtersParams.sector, 10)
                : undefined,
        city: typeof filtersParams.city === 'string' ? filtersParams.city : undefined,
        countryCode:
            typeof filtersParams.countryCode === 'string' &&
            COUNTRY_CODES.includes(filtersParams.countryCode as CountryCode)
                ? (filtersParams.countryCode as CountryCode)
                : undefined,
        speciality:
            typeof filtersParams.speciality === 'string' &&
            SPECIALITIES.includes(filtersParams.speciality as Speciality)
                ? (filtersParams.speciality as Speciality)
                : undefined,
        studyLevel:
            typeof filtersParams.studyLevel === 'string' &&
            STUDY_LEVELS.includes(filtersParams.studyLevel as StudyLevel)
                ? (filtersParams.studyLevel as StudyLevel)
                : undefined,
        greenLabel:
            typeof filtersParams.greenLabel === 'string' &&
            ['true', 'false'].includes(filtersParams.greenLabel)
                ? Boolean(filtersParams.greenLabel)
                : undefined,
    };

    const paginatedCompanies = CompanyService.getAllCompanies({
        ...filters,
        pageSize: COMPANIES_LIST_PAGE_SIZE,
    });

    const companiesCount = paginatedCompanies.data.length;
    const noExistingCompanyAtAll =
        Object.values(filters).every((value) => value === undefined) && companiesCount === 0;

    return (
        <div className="w-full pb-16">
            <div className="relative w-full h-80 md:h-100 xl:h-120">
                <Image
                    src="/entretien_dos.jpg"
                    alt={t('altText')}
                    fill
                    sizes="100%,100%"
                    priority
                    quality={100}
                    className="object-cover object-center brightness-50"
                />
                <div className="absolute -bottom-52 md:-bottom-24 left-1/2 -translate-x-1/2 flex max-md:flex-col items-center justify-evenly gap-4 w-7/8 sm:w-6/7 md:w-5/6 lg:w-4/5 xl:w-3/4 2xl:w-2/3 md:h-48 p-8 animate-appearance-in glassy">
                    <CompaniesStatsItem
                        title={t('companiesCount')}
                        value={companiesStats.companiesCount}
                    />
                    <Divider orientation="vertical" />
                    <CompaniesStatsItem
                        title={t('sectorsCount')}
                        value={companiesStats.sectorsCount}
                    />
                    <Divider orientation="vertical" />
                    <CompaniesStatsItem
                        title={t('specialitiesCount')}
                        value={companiesStats.specialitiesCount}
                    />
                </div>
            </div>
            <div className="flex flex-col items-center gap-y-16 w-full px-4 md:px-10 lg:px-20 xl:px-40 2xl:px-60 pt-40 max-md:pt-60">
                <div className="flex flex-col items-center gap-y-4 text-center">
                    <h1>{t('title')}</h1>
                    <p className="text-xl w-full sm:w-5/6 md:w-4/5 lg:w-3/4 xl:w-2/3 2xl:w-1/2">
                        {t('description')}
                    </p>
                </div>
                <div className="flex flex-col items-center gap-y-16 w-full">
                    <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 max-md:justify-items-center gap-8 md:gap-12">
                        <div className="flex justify-end items-center gap-4 md:gap-8 max-md:w-full md:col-span-2 xl:col-span-3">
                            <CompaniesSearchInput />
                            <CompaniesFiltersButton popupPlacement="left" />
                        </div>
                        {companiesCount > 0 ? (
                            paginatedCompanies.data.map((company) => (
                                <li
                                    key={company.id}
                                    className="relative"
                                >
                                    <CompanyCard
                                        company={company}
                                        logoAlt={t('companyLogoAlt', { companyName: company.name })}
                                        locale={locale}
                                    />
                                    {hasGreenLabel(company) && (
                                        <CompanyGreenLabel tooltip={t('greenLabelTooltip')} />
                                    )}
                                </li>
                            ))
                        ) : (
                            <div className="md:col-span-2 xl:col-span-3">
                                <div className="w-268 md:w-276">
                                    <Alert
                                        color="default"
                                        title={t('noCompanies')}
                                        className="w-fit mx-auto"
                                    />
                                </div>
                            </div>
                        )}
                        {!noExistingCompanyAtAll && (
                            <Fragment>
                                <div className="flex items-center justify-end gap-4 md:gap-8 max-md:w-full md:col-span-2 xl:col-span-3">
                                    <CompaniesPagination
                                        totalPages={paginatedCompanies.totalPages}
                                    />
                                    <CompaniesFiltersButton popupPlacement="left-end" />
                                </div>
                            </Fragment>
                        )}
                    </ul>
                    <div className="flex max-md:w-full md:col-span-2 xl:col-span-3 px-4 lg:max-xl:px-20 3xl:px-40">
                        <div className="flex items-cente max-sm:justify-center gap-4 w-full sm:w-5/6 md:w-4/5 lg:w-3/4 xl:w-2/3 2xl:w-1/2 border border-default/75 p-4 rounded-lg">
                            <FORUM_LABEL_ICON className="size-8 text-success" />
                            <p className="text-base flex-1 leading-relaxed">
                                {t('companyGreenLabelDescription')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
