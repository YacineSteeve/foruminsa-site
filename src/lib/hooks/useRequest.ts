import { DEFAULT_ERROR_MESSAGE } from '@lib/constants/core';
import { ApiError, toast } from '@lib/utils';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import useSWR, { type Key, type Fetcher } from 'swr';

export const useRequest = <K extends Key, D>(key: K, fetcher: Fetcher<D, K>) => {
    const t = useTranslations('ApiErrors');
    const { error, ...rest } = useSWR(key, fetcher);

    useEffect(() => {
        if (error && error instanceof Error && error.cause instanceof ApiError) {
            toast.error(t(error.cause.message));
        }
    }, [t, error]);

    return {
        ...rest,
        error: error instanceof Error ? error : new Error(DEFAULT_ERROR_MESSAGE, { cause: error }),
    };
};
