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
import type { PaginatedCompanyEntities } from '@lib/services';
import { URL_PARAMS } from '@lib/constants/core';
import { COUNTRIES } from '@lib/constants/countries';
import { FORUM_LABEL_ICON } from '@lib/constants/ui';
import { useSearchParamsChange } from '@lib/hooks';
import { useRouter } from '@lib/i18n/navigation';
import type { CompaniesFilters } from '@lib/types/dtos';
import {
    cn,
    getCompanyLogoUrl,
    getStarsSequenceFromCarbonFootprint,
    hasGreenLabel,
} from '@lib/utils';
import { type Locale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { type FunctionComponent, useCallback } from 'react';
import { RiStarFill, RiStarHalfFill, RiStarLine } from 'react-icons/ri';

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
    const { changeSearchParamMulti } = useSearchParamsChange();

    const handleSwitchChange = useCallback<NonNullable<SwitchProps['onValueChange']>>(
        (isSelected) => {
            changeSearchParamMulti([URL_PARAMS.page, URL_PARAMS.greenLabel])([
                '',
                isSelected ? 'true' : '',
            ]);
        },
        [changeSearchParamMulti],
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
                tr: 'h-20 cursor-pointer',
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
                {paginatedCompanies.data.map((company) => (
                    <TableRow key={company.slug}>
                        <TableCell>
                            <Chip
                                radius="full"
                                variant="flat"
                                className={cn(
                                    'size-10 max-w-auto text-center',
                                    company.carbonBalanceRank === 1 &&
                                        'text-purple-800 bg-purple-500/40',
                                    company.carbonBalanceRank === 2 &&
                                        'text-blue-800 bg-blue-500/40',
                                    company.carbonBalanceRank === 3 &&
                                        'text-yellow-800 bg-yellow-500/40',
                                    company.carbonBalanceRank >= 4 &&
                                        'text-default-800 bg-default-500/40',
                                )}
                            >
                                {company.carbonBalanceRank}
                            </Chip>
                        </TableCell>
                        <TableCell>
                            <div className="flex items-center gap-4 min-w-80">
                                <Image
                                    src={getCompanyLogoUrl(company.logoFile)}
                                    alt={t('companyLogoAlt', {
                                        companyName: company.name,
                                    })}
                                    width={40}
                                    height={40}
                                    sizes="100%,100%"
                                    className="w-20 h-auto"
                                />
                                <div>
                                    <p>{company.name}</p>
                                    <p className="text-sm text-gray-500">
                                        {company.city}, {COUNTRIES[company.countryCode][locale]}
                                    </p>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell>
                            <div className="flex items-center gap-0.5">
                                {company.carbonFootprint ? (
                                    getStarsSequenceFromCarbonFootprint(
                                        company.carbonFootprint,
                                    ).map((sequenceItem, index) => {
                                        const Icon = {
                                            full: RiStarFill,
                                            half: RiStarHalfFill,
                                            empty: RiStarLine,
                                        }[sequenceItem];

                                        return (
                                            <Icon
                                                key={index}
                                                className={cn(
                                                    'size-5',
                                                    sequenceItem === 'empty'
                                                        ? 'text-default'
                                                        : 'text-yellow-500',
                                                )}
                                            />
                                        );
                                    })
                                ) : (
                                    <p className="text-gray-500 font-bold">{t('undefined')}</p>
                                )}
                            </div>
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
                ))}
            </TableBody>
        </Table>
    );
};
