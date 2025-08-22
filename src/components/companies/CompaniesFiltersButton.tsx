'use client';

import { Badge } from '@heroui/badge';
import { Button } from '@heroui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@heroui/popover';
import type { PopoverProps, SelectProps, SwitchProps } from '@heroui/react';
import { Select, SelectItem } from '@heroui/select';
import { Switch } from '@heroui/switch';
import { CompanyService, SectorService } from '@lib/api-services';
import { COUNTRY_OPTIONS } from '@lib/constants/countries';
import { SPECIALITIES, STUDY_LEVELS, URL_PARAMS } from '@lib/constants/core';
import { useRequest, useSearchParamsChange } from '@lib/hooks';
import type { CompaniesFilters } from '@lib/types/dtos';
import { type Locale, useLocale, useTranslations } from 'next-intl';
import { type ChangeEventHandler, type FunctionComponent, useCallback, useMemo } from 'react';
import { RiFilter2Fill } from 'react-icons/ri';

type FilterOption<T> = {
    label: string;
    value: T;
};

type FiltersValues = {
    [K in keyof Required<
        Omit<CompaniesFilters, 'page' | 'greenLabel'>
    >]: SelectProps['selectedKeys'];
} & {
    [K in keyof Required<Pick<CompaniesFilters, 'greenLabel'>>]: SwitchProps['isSelected'];
};

interface CompaniesFiltersButtonProps {
    popupPlacement: PopoverProps['placement'];
}

export const CompaniesFiltersButton: FunctionComponent<CompaniesFiltersButtonProps> = ({
    popupPlacement,
}) => {
    const locale = useLocale();
    const t = useTranslations('CompaniesFiltersButton');
    const tSpecialities = useTranslations('Specialities');
    const tStudyLevels = useTranslations('StudyLevels');
    const { searchParams, changeSearchParamMulti } = useSearchParamsChange();

    const { data: cityOptions, isLoading: isLoadingCityOptions } = useRequest<
        string,
        Array<FilterOption<CompaniesFilters['city']>>
    >('city-options', async (_) => {
        const cities = await CompanyService.getAllCompaniesCities();

        if (!cities) {
            return [];
        }

        return cities.map((city) => ({
            label: city,
            value: city,
        })).sort((a, b) => a.label.localeCompare(b.label));
    });

    const { data: sectorOptions, isLoading: isLoadingSectorOptions } = useRequest<
        [string, Locale],
        Array<FilterOption<CompaniesFilters['sector']>>
    >(['sector-options', locale], async ([_, locale]) => {
        const sectors = await SectorService.getAllSectors();

        if (!sectors) {
            return [];
        }

        return sectors.map((sector) => ({
            label: locale === 'en' ? sector.nameEN : sector.nameFR,
            value: sector.id,
        })).sort((a, b) => a.label.localeCompare(b.label));
    });

    const handleSwitchChange = useCallback<
        (
            key: keyof Required<Pick<CompaniesFilters, 'greenLabel'>>,
        ) => NonNullable<SwitchProps['onValueChange']>
    >(
        (key) => (isSelected) => {
            changeSearchParamMulti([URL_PARAMS.page, key])(['', isSelected ? 'true' : '']);
        },
        [changeSearchParamMulti],
    );

    const handleSelectChange = useCallback<
        (
            key: keyof Required<Omit<CompaniesFilters, 'greenLabel'>>,
        ) => ChangeEventHandler<HTMLSelectElement>
    >(
        (key) => (event) => {
            changeSearchParamMulti([URL_PARAMS.page, key])(['', event.target.value]);
        },
        [changeSearchParamMulti],
    );

    const handleClear = useCallback<
        (key: keyof Omit<CompaniesFilters, 'greenLabel'>) => VoidFunction
    >(
        (key) => () => {
            changeSearchParamMulti([URL_PARAMS.page, key])(['', '']);
        },
        [changeSearchParamMulti],
    );

    const handleClearAll = useCallback(() => {
        changeSearchParamMulti([
            URL_PARAMS.page,
            URL_PARAMS.city,
            URL_PARAMS.countryCode,
            URL_PARAMS.sector,
            URL_PARAMS.speciality,
            URL_PARAMS.studyLevel,
            URL_PARAMS.greenLabel,
        ])(['', '', '', '', '', '', '']);
    }, [changeSearchParamMulti]);

    const values = useMemo<FiltersValues>(() => {
        return {
            greenLabel: searchParams.has(URL_PARAMS.greenLabel)
                ? searchParams.get(URL_PARAMS.greenLabel) === 'true'
                : undefined,
            speciality: searchParams.get(URL_PARAMS.speciality)
                ? [searchParams.get(URL_PARAMS.speciality)!]
                : undefined,
            studyLevel: searchParams.get(URL_PARAMS.studyLevel)
                ? [searchParams.get(URL_PARAMS.studyLevel)!]
                : undefined,
            sector: searchParams.get(URL_PARAMS.sector)
                ? [searchParams.get(URL_PARAMS.sector)!]
                : undefined,
            city: searchParams.get(URL_PARAMS.city)
                ? [searchParams.get(URL_PARAMS.city)!]
                : undefined,
            countryCode: searchParams.get(URL_PARAMS.countryCode)
                ? [searchParams.get(URL_PARAMS.countryCode)!]
                : undefined,
        };
    }, [searchParams]);

    const activeFilters = useMemo(() => {
        const activeFiltersCount = Object.values(values).filter(
            (value) => value !== undefined,
        ).length;

        return {
            count: activeFiltersCount,
            isEmpty: activeFiltersCount === 0,
        };
    }, [values]);

    return (
        <Popover
            backdrop="opaque"
            placement={popupPlacement}
        >
            <Badge
                isOneChar
                size="lg"
                isInvisible={activeFilters.isEmpty}
                content={activeFilters.count}
            >
                <PopoverTrigger>
                    <Button
                        isIconOnly
                        color="primary"
                        title={t('tooltip')}
                    >
                        <RiFilter2Fill className="size-6" />
                    </Button>
                </PopoverTrigger>
            </Badge>
            <PopoverContent>
                {(titleProps) => (
                    <div className="w-68 md:w-80 xl:w-92 p-4 space-y-10">
                        <h4 {...titleProps}>{t('title')}</h4>
                        <div className="space-y-5">
                            <div className="space-y-10">
                                <Select
                                    isClearable
                                    labelPlacement="outside"
                                    label={t('specialityLabel')}
                                    placeholder={t('specialityPlaceholder')}
                                    listboxProps={{
                                        emptyContent: t('noOptions'),
                                    }}
                                    selectedKeys={values.speciality}
                                    onChange={handleSelectChange(URL_PARAMS.speciality)}
                                    onClear={handleClear(URL_PARAMS.speciality)}
                                >
                                    {SPECIALITIES.map((speciality) => (
                                        <SelectItem key={speciality}>{tSpecialities(speciality)}</SelectItem>
                                    ))}
                                </Select>
                                <Select
                                    isClearable
                                    labelPlacement="outside"
                                    label={t('studyLevelLabel')}
                                    placeholder={t('studyLevelPlaceholder')}
                                    listboxProps={{
                                        emptyContent: t('noOptions'),
                                    }}
                                    selectedKeys={values.studyLevel}
                                    onChange={handleSelectChange(URL_PARAMS.studyLevel)}
                                    onClear={handleClear(URL_PARAMS.studyLevel)}
                                >
                                    {STUDY_LEVELS.map((studyLevel) => (
                                        <SelectItem key={studyLevel}>{tStudyLevels(studyLevel)}</SelectItem>
                                    ))}
                                </Select>
                                <Select
                                    isClearable
                                    labelPlacement="outside"
                                    label={t('sectorLabel')}
                                    placeholder={t('sectorPlaceholder')}
                                    listboxProps={{
                                        emptyContent: t('noOptions'),
                                    }}
                                    isLoading={isLoadingSectorOptions}
                                    selectedKeys={values.sector}
                                    onChange={handleSelectChange(URL_PARAMS.sector)}
                                    onClear={handleClear(URL_PARAMS.sector)}
                                >
                                    {(sectorOptions ?? []).map((option) => (
                                        <SelectItem key={option.value}>{option.label}</SelectItem>
                                    ))}
                                </Select>
                                <Select
                                    isClearable
                                    labelPlacement="outside"
                                    label={t('cityLabel')}
                                    placeholder={t('cityPlaceholder')}
                                    listboxProps={{
                                        emptyContent: t('noOptions'),
                                    }}
                                    isLoading={isLoadingCityOptions}
                                    selectedKeys={values.city}
                                    onChange={handleSelectChange(URL_PARAMS.city)}
                                    onClear={handleClear(URL_PARAMS.city)}
                                >
                                    {(cityOptions ?? []).map((option) => (
                                        <SelectItem key={option.value}>{option.label}</SelectItem>
                                    ))}
                                </Select>
                                <Select
                                    isClearable
                                    labelPlacement="outside"
                                    label={t('countryLabel')}
                                    placeholder={t('countryPlaceholder')}
                                    listboxProps={{
                                        emptyContent: t('noOptions'),
                                    }}
                                    selectedKeys={values.countryCode}
                                    onChange={handleSelectChange(URL_PARAMS.countryCode)}
                                    onClear={handleClear(URL_PARAMS.countryCode)}
                                >
                                    {COUNTRY_OPTIONS.map((option) => (
                                        <SelectItem key={option.value}>{option.label}</SelectItem>
                                    ))}
                                </Select>
                            </div>
                            <Switch
                                key={values.greenLabel ? 'greenLabelOn' : 'greenLabelOff'}
                                color="primary"
                                size="sm"
                                isSelected={values.greenLabel}
                                onValueChange={handleSwitchChange(URL_PARAMS.greenLabel)}
                            >
                                {t('greenLabelOnly')}
                            </Switch>
                        </div>
                        {!activeFilters.isEmpty && (
                            <div className="flex items-center justify-end">
                                <Button
                                    variant="light"
                                    onPress={handleClearAll}
                                >
                                    {t('clearAll')}
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </PopoverContent>
        </Popover>
    );
};
