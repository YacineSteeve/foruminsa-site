'use client';

import { Pagination, type PaginationProps } from '@heroui/pagination';
import { URL_PARAMS } from '@lib/constants/core';
import { useSearchParamsChange } from '@lib/hooks';
import { type FunctionComponent, useCallback } from 'react';

interface CompaniesPaginationProps {
    totalPages: number;
}

export const CompaniesPagination: FunctionComponent<CompaniesPaginationProps> = ({
    totalPages,
}) => {
    const { searchParams, changeSearchParam } = useSearchParamsChange();

    const handlePageChange = useCallback<NonNullable<PaginationProps['onChange']>>(
        (page) => {
            changeSearchParam(URL_PARAMS.page)(page.toString());
        },
        [changeSearchParam],
    );

    if (totalPages <= 1) {
        return null;
    }

    return (
        <Pagination
            showControls
            loop
            dotsJump={3}
            classNames={{ item: 'cursor-pointer' }}
            key={searchParams.get(URL_PARAMS.page) ?? '1'}
            initialPage={Number(searchParams.get(URL_PARAMS.page) ?? '1')}
            total={totalPages}
            onChange={handlePageChange}
        />
    );
};
