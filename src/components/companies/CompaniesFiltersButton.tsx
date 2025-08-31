'use client';

import { Badge } from '@heroui/badge';
import { Button } from '@heroui/button';
import { Popover, PopoverContent, PopoverTrigger, type PopoverProps } from '@heroui/popover';
import { Select, SelectItem, type SelectProps } from '@heroui/select';
import { Switch, type SwitchProps } from '@heroui/switch';
import { CompanyService, SectorService } from '@lib/api-services';
import { COUNTRIES } from '@lib/constants/countries';
import { SPECIALITIES, STUDY_LEVELS, URL_PARAMS } from '@lib/constants/core';
import { useRequest, useSearchParamsChange } from '@lib/hooks';
import type { CompaniesFilters } from '@lib/types/dtos';
import { type Locale, useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import {
    type ChangeEventHandler,
    type FunctionComponent,
    useCallback,
    useMemo,
    useState,
} from 'react';
import { RiFilter2Fill } from 'react-icons/ri';

type FilterOption<T> = {
    label: string;
    value: T;
};

type FiltersValues = {
    [K in keyof Required<
        Pick<CompaniesFilters, 'city' | 'countryCode' | 'sector' | 'speciality' | 'studyLevel'>
    >]: Exclude<SelectProps['selectedKeys'], 'all'>;
} & {
    [K in keyof Required<Pick<CompaniesFilters, 'greenLabel'>>]: SwitchProps['isSelected'];
};

interface CompaniesFiltersButtonProps {
    popupPlacement: PopoverProps['placement'];
}

export const CompaniesFiltersButton: FunctionComponent<CompaniesFiltersButtonProps> = ({
    popupPlacement,
}) => {
    const t = useTranslations('CompaniesFiltersButton');
    const searchParams = useSearchParams();

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
            <FiltersContent
                initialValues={values}
                activeFilters={activeFilters}
            />
        </Popover>
    );
};

interface FiltersContentProps {
    initialValues: FiltersValues;
    activeFilters: {
        count: number;
        isEmpty: boolean;
    };
}

const FiltersContent: FunctionComponent<FiltersContentProps> = ({
    initialValues,
    activeFilters,
}) => {
    const locale = useLocale();
    const t = useTranslations('CompaniesFiltersButton');
    const tSpecialities = useTranslations('Specialities');
    const tStudyLevels = useTranslations('StudyLevels');
    const [values, setValues] = useState<FiltersValues>(initialValues);
    const { changeSearchParamMulti } = useSearchParamsChange({ scroll: true });

    const { data: cityOptions, isLoading: isLoadingCityOptions } = useRequest<
        string,
        Array<FilterOption<CompaniesFilters['city']>>
    >('city-options', async (_) => {
        const cities = await CompanyService.getAllCompaniesCities();

        if (!cities) {
            return [];
        }

        return cities
            .map((city) => ({
                label: city,
                value: city,
            }))
            .toSorted((a, b) => a.label.localeCompare(b.label));
    });

    const { data: sectorOptions, isLoading: isLoadingSectorOptions } = useRequest<
        [string, Locale],
        Array<FilterOption<CompaniesFilters['sector']>>
    >(['sector-options', locale], async ([_, locale]) => {
        const sectors = await SectorService.getAllSectors();

        if (!sectors) {
            return [];
        }

        return sectors
            .map((sector) => ({
                label: locale === 'en' ? sector.nameEN : sector.nameFR,
                value: sector.id,
            }))
            .toSorted((a, b) => a.label.localeCompare(b.label));
    });

    const handleSwitchChange = useCallback<
        (
            key: keyof Required<Pick<CompaniesFilters, 'greenLabel'>>,
        ) => NonNullable<SwitchProps['onValueChange']>
    >(
        (key) => (isSelected) => {
            setValues((prevValues) => ({ ...prevValues, [key]: isSelected }));
        },
        [],
    );

    const handleSelectChange = useCallback<
        (
            key: keyof Pick<
                CompaniesFilters,
                'city' | 'countryCode' | 'sector' | 'speciality' | 'studyLevel'
            >,
        ) => ChangeEventHandler<HTMLSelectElement>
    >(
        (key) => (event) => {
            setValues((prevValues) => ({ ...prevValues, [key]: new Set([event.target.value]) }));
        },
        [],
    );

    const handleSelectClear = useCallback<
        (
            key: keyof Pick<
                CompaniesFilters,
                'city' | 'countryCode' | 'sector' | 'speciality' | 'studyLevel'
            >,
        ) => VoidFunction
    >(
        (key) => () => {
            setValues((prevValues) => ({ ...prevValues, [key]: new Set([]) }));
        },
        [],
    );

    const handleClearAll = useCallback(() => {
        setValues({
            speciality: new Set([]),
            studyLevel: new Set([]),
            sector: new Set([]),
            city: new Set([]),
            countryCode: new Set([]),
            greenLabel: undefined,
        } satisfies FiltersValues);
    }, []);

    const handleApplyFilters = useCallback(() => {
        changeSearchParamMulti([
            URL_PARAMS.page,
            URL_PARAMS.city,
            URL_PARAMS.countryCode,
            URL_PARAMS.sector,
            URL_PARAMS.speciality,
            URL_PARAMS.studyLevel,
            URL_PARAMS.greenLabel,
        ])([
            '',
            values.city ? (Array.from(values.city).at(0)?.toString() ?? '') : '',
            values.countryCode ? (Array.from(values.countryCode).at(0)?.toString() ?? '') : '',
            values.sector ? (Array.from(values.sector).at(0)?.toString() ?? '') : '',
            values.speciality ? (Array.from(values.speciality).at(0)?.toString() ?? '') : '',
            values.studyLevel ? (Array.from(values.studyLevel).at(0)?.toString() ?? '') : '',
            values.greenLabel === true ? 'true' : '',
        ]);
    }, [values, changeSearchParamMulti]);

    const countryOptions = useMemo(() => {
        return Object.entries(COUNTRIES).map(([code, name]) => ({
            value: code,
            label: locale === 'en' ? name.en : name.fr,
        }));
    }, [locale]);

    return (
        <PopoverContent>
            {(titleProps) => (
                <div className="w-68 md:w-80 xl:w-92 p-4 space-y-10">
                    <h4 {...titleProps}>{t('title')}</h4>
                    <div className="space-y-6">
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
                                onClear={handleSelectClear(URL_PARAMS.speciality)}
                            >
                                {SPECIALITIES.map((speciality) => (
                                    <SelectItem key={speciality}>
                                        {tSpecialities(speciality)}
                                    </SelectItem>
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
                                onClear={handleSelectClear(URL_PARAMS.studyLevel)}
                            >
                                {STUDY_LEVELS.map((studyLevel) => (
                                    <SelectItem key={studyLevel}>
                                        {tStudyLevels(studyLevel)}
                                    </SelectItem>
                                ))}
                            </Select>
                            <Select
                                isClearable
                                labelPlacement="outside"
                                label={t('sectorLabel')}
                                placeholder={t('sectorPlaceholder')}
                                listboxProps={{
                                    emptyContent: t(
                                        isLoadingSectorOptions ? 'loading' : 'noOptions',
                                    ),
                                }}
                                isLoading={isLoadingSectorOptions}
                                selectedKeys={values.sector}
                                onChange={handleSelectChange(URL_PARAMS.sector)}
                                onClear={handleSelectClear(URL_PARAMS.sector)}
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
                                    emptyContent: t(isLoadingCityOptions ? 'loading' : 'noOptions'),
                                }}
                                isLoading={isLoadingCityOptions}
                                selectedKeys={values.city}
                                onChange={handleSelectChange(URL_PARAMS.city)}
                                onClear={handleSelectClear(URL_PARAMS.city)}
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
                                onClear={handleSelectClear(URL_PARAMS.countryCode)}
                            >
                                {countryOptions.map((option) => (
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
                    <div className="flex items-center justify-between gap-2">
                        {activeFilters.isEmpty ? (
                            <span />
                        ) : (
                            <Button
                                variant="light"
                                onPress={handleClearAll}
                            >
                                {t('clearAll')}
                            </Button>
                        )}
                        <Button
                            color="primary"
                            startContent={<RiFilter2Fill className="size-4" />}
                            onPress={handleApplyFilters}
                        >
                            {t('apply')}
                        </Button>
                    </div>
                </div>
            )}
        </PopoverContent>
    );
};
