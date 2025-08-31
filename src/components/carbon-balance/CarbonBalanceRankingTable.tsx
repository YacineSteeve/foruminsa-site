'use client';

import { CompaniesPagination } from '@components/companies/CompaniesPagination';
import { CompaniesSearchInput } from '@components/companies/CompaniesSearchInput';
import { Loader } from '@components/ui/Loader';
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
import { CompanyService } from '@lib/api-services';
import { COMPANIES_RANKING_PAGE_SIZE, URL_PARAMS } from '@lib/constants/core';
import { COUNTRIES } from '@lib/constants/countries';
import { useRequest, useSearchParamsChange } from '@lib/hooks';
import { useRouter } from '@lib/i18n/navigation';
import { cn, hasGreenLabel } from '@lib/utils';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { type FunctionComponent, useCallback, useMemo } from 'react';
import { FaAward } from 'react-icons/fa6';

export const CarbonBalanceRankingTable: FunctionComponent = () => {
    const t = useTranslations('CarbonBalanceRankingTable');
    const locale = useLocale();
    const router = useRouter();
    const { searchParams, changeSearchParam } = useSearchParamsChange();

    const filters = useMemo(() => {
        const pageParam = searchParams.get(URL_PARAMS.page);
        const pageNumber = pageParam ? parseInt(pageParam, 10) : 1;
        const page = isNaN(pageNumber) || pageNumber < 1 ? 1 : pageNumber;

        const greenLabelParam = searchParams.get(URL_PARAMS.greenLabel);
        const greenLabelOnly = greenLabelParam ? greenLabelParam === 'true' : undefined;

        const searchParam = searchParams.get(URL_PARAMS.search);
        const search = searchParam ?? undefined;

        return { page, greenLabelOnly, search };
    }, [searchParams]);

    const { data: paginatedCompanies, isLoading } = useRequest(
        [
            'companies-carbon-footprint-ranking',
            filters.search,
            filters.page,
            filters.greenLabelOnly,
        ],
        async ([_, search, page, greenLabel]) => {
            return CompanyService.getAllCompanies({
                search,
                page,
                greenLabel,
                pageSize: COMPANIES_RANKING_PAGE_SIZE,
                sortByCarbonFootprint: true,
            });
        },
        {
            keepPreviousData: true,
        },
    );

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
                tr: 'h-18 cursor-pointer',
                th: 'text-lg',
                td: 'text-base',
            }}
            selectionMode="single"
            aria-label={t('tableDescription')}
            onRowAction={handleRowClick}
            topContent={
                paginatedCompanies ? (
                    <div className="sticky right-0 top-0 flex justify-end w-full">
                        <CompaniesSearchInput />
                    </div>
                ) : null
            }
            bottomContent={
                paginatedCompanies && paginatedCompanies.totalElements > 0 ? (
                    <div className="sticky left-0 bottom-0 flex flex-wrap justify-between items-center gap-8 w-full py-4">
                        <CompaniesPagination
                            totalPages={Math.ceil(
                                paginatedCompanies.totalElements /
                                    Math.max(paginatedCompanies.pageSize, 1),
                            )}
                        />
                        <Switch
                            key={filters.greenLabelOnly ? 'greenLabelOn' : 'greenLabelOff'}
                            color="primary"
                            size="sm"
                            isSelected={filters.greenLabelOnly}
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
            <TableBody
                isLoading={isLoading}
                loadingContent={<Loader />}
                emptyContent={t('noCompanies')}
            >
                {paginatedCompanies ? (
                    paginatedCompanies.data.map((company, index) => {
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
                                                src={company.logoUrl}
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
                                                {company.city},{' '}
                                                {COUNTRIES[company.countryCode][locale]}
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
                                        <FaAward className="size-6 text-success" />
                                    ) : (
                                        <p>-</p>
                                    )}
                                </TableCell>
                            </TableRow>
                        );
                    })
                ) : (
                    <></>
                )}
            </TableBody>
        </Table>
    );
};
