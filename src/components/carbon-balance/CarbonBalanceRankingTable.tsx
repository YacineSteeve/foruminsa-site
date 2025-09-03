'use client';

import { CompaniesPagination } from '@components/companies/CompaniesPagination';
import { CompaniesSearchInput } from '@components/companies/CompaniesSearchInput';
import { Chip } from '@heroui/chip';
import { Switch, type SwitchProps } from '@heroui/switch';
import {
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    type TableProps,
} from '@heroui/table';
import type { PaginatedCompanyEntities } from '@lib/api-services';
import { URL_PARAMS } from '@lib/constants/core';
import { COUNTRIES } from '@lib/constants/countries';
import { FORUM_LABEL_ICON } from '@lib/constants/ui';
import { useSearchParamsChange } from '@lib/hooks';
import { useRouter } from '@lib/i18n/navigation';
import type { CompaniesFilters } from '@lib/types/dtos';
import { cn, hasGreenLabel } from '@lib/utils';
import { type Locale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { type FunctionComponent, useCallback } from 'react';

interface CarbonBalanceRankingTableProps {
    filters: Pick<CompaniesFilters, 'search' | 'page' | 'greenLabel'>;
    paginatedCompanies: PaginatedCompanyEntities;
    locale: Locale;
}

export const CarbonBalanceRankingTable: FunctionComponent<CarbonBalanceRankingTableProps> = ({
    filters,
    paginatedCompanies,
    locale,
}) => {
    const t = useTranslations('CarbonBalanceRankingTable');
    const router = useRouter();
    const { changeSearchParam } = useSearchParamsChange();

    const handleSwitchChange = useCallback<NonNullable<SwitchProps['onValueChange']>>(
        (isSelected) => {
            changeSearchParam(URL_PARAMS.greenLabel)(isSelected ? 'true' : '');
        },
        [changeSearchParam],
    );

    const handleRowClick = useCallback<NonNullable<TableProps['onRowAction']>>(
        (companySlug) => {
            router.push(`/entreprises/${companySlug}`);
        },
        [router],
    );

    return (
        <Table
            isStriped
            color="primary"
            classNames={{
                base: '!p-0',
                wrapper: '!relative',
                loadingWrapper: 'inset-x-0 inset-y-auto bottom-2 h-40',
                tr: 'h-18 cursor-pointer',
                th: 'text-lg',
                td: 'text-base',
            }}
            selectionMode="single"
            aria-label={t('tableDescription')}
            onRowAction={handleRowClick}
            topContent={
                <div className="sticky left-0 top-0 flex justify-end w-full">
                    <CompaniesSearchInput />
                </div>
            }
            bottomContent={
                paginatedCompanies.totalElements > 0 ? (
                    <div className="sticky left-0 bottom-0 flex flex-wrap justify-between items-center gap-8 w-full py-4">
                        <CompaniesPagination totalPages={paginatedCompanies.totalPages} />
                        <Switch
                            key={filters.greenLabel === true ? 'greenLabelOn' : 'greenLabelOff'}
                            color="primary"
                            size="sm"
                            isSelected={filters.greenLabel === true}
                            onValueChange={handleSwitchChange}
                        >
                            {t('greenLabelOnly')}
                        </Switch>
                    </div>
                ) : null
            }
        >
            <TableHeader>
                <TableColumn key="rank">{t('rank')}</TableColumn>
                <TableColumn key="company">{t('company')}</TableColumn>
                <TableColumn key="carbon-footprint">{t('carbonFootprint')}</TableColumn>
                <TableColumn key="green-transportation">{t('greenTransportation')}</TableColumn>
                <TableColumn key="no-goodies">{t('withoutGoodies')}</TableColumn>
                <TableColumn key="green-label">{t('greenLabel')}</TableColumn>
            </TableHeader>
            <TableBody emptyContent={t('noCompanies')}>
                {paginatedCompanies.data.map((company, index) => {
                    const rank =
                        paginatedCompanies.pageSize * (paginatedCompanies.page - 1) + index + 1;

                    return (
                        <TableRow key={company.slug}>
                            <TableCell>
                                <Chip
                                    radius="full"
                                    variant="flat"
                                    className={cn(
                                        'size-10 max-w-auto text-center',
                                        rank === 1 && 'text-purple-800 bg-purple-500/40',
                                        rank === 2 && 'text-blue-800 bg-blue-500/40',
                                        rank === 3 && 'text-yellow-800 bg-yellow-500/40',
                                        rank >= 4 && 'text-default-800 bg-default-500/40',
                                    )}
                                >
                                    {rank}
                                </Chip>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2 min-w-80">
                                    <div className="relative size-10">
                                        <Image
                                            src={company.logoFile}
                                            alt={t('companyLogoAlt', {
                                                companyName: company.name,
                                            })}
                                            fill
                                            sizes="100%,100%"
                                            className="object-contain object-center"
                                        />
                                    </div>
                                    <div>
                                        <p>{company.name}</p>
                                        <p className="text-sm text-gray-500">
                                            {company.city}, {COUNTRIES[company.countryCode][locale]}
                                        </p>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <p>
                                    <span className="font-bold">{company.carbonFootprint}</span>{' '}
                                    <span className="text-sm text-gray-500">
                                        t C0<sub>2</sub>eq
                                    </span>
                                </p>
                            </TableCell>
                            <TableCell>
                                <Chip
                                    variant="flat"
                                    color={company.hasGreenTransport ? 'success' : 'danger'}
                                >
                                    {company.hasGreenTransport ? t('yes') : t('no')}
                                </Chip>
                            </TableCell>
                            <TableCell>
                                <Chip
                                    variant="flat"
                                    color={company.providesGoodies ? 'danger' : 'success'}
                                >
                                    {company.providesGoodies ? t('no') : t('yes')}
                                </Chip>
                            </TableCell>
                            <TableCell>
                                {hasGreenLabel(company) ? (
                                    <FORUM_LABEL_ICON className="size-6 text-success" />
                                ) : (
                                    <p>-</p>
                                )}
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
};
