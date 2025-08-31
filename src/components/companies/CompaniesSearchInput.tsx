'use client';

import { Input, type InputProps } from '@heroui/input';
import { URL_PARAMS } from '@lib/constants/core';
import { useSearchParamsChange } from '@lib/hooks';
import { useTranslations } from 'next-intl';
import { type FunctionComponent, useCallback, useState } from 'react';
import { LuSearch } from 'react-icons/lu';

export const CompaniesSearchInput: FunctionComponent = () => {
    const t = useTranslations('CompaniesSearchInput');
    const [value, setValue] = useState<string>();
    const { searchParams, changeSearchParam } = useSearchParamsChange();

    const handleChange = useCallback<NonNullable<InputProps['onValueChange']>>((value) => {
        setValue(value);
    }, []);

    const handleClear = useCallback<NonNullable<InputProps['onClear']>>(() => {
        changeSearchParam(URL_PARAMS.search)('');
    }, [changeSearchParam]);

    const handleConfirm = useCallback<NonNullable<InputProps['onBlur'] & InputProps['onKeyDown']>>(
        (event) => {
            if (value !== undefined) {
                if (
                    event.type === 'blur' ||
                    (event.type === 'keydown' && 'key' in event && event.key === 'Enter')
                ) {
                    changeSearchParam(URL_PARAMS.search)(value.trim() === '' ? '' : value);
                }
            }
        },
        [changeSearchParam, value],
    );

    return (
        <Input
            isClearable
            fullWidth={false}
            type="search"
            name="company-search"
            className="w-60"
            startContent={<LuSearch className="text-gray-500" />}
            placeholder={t('placeholder')}
            defaultValue={searchParams.get(URL_PARAMS.search) ?? ''}
            value={value}
            onValueChange={handleChange}
            onBlur={handleConfirm}
            onKeyDown={handleConfirm}
            onClear={handleClear}
        />
    );
};
