import { DEFAULT_ERROR_MESSAGE } from '@lib/constants';
import { ApiError, toast } from '@lib/utils';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import useSWRMutation, { type SWRMutationHook } from 'swr/mutation';

export const useMutation: SWRMutationHook = (...args) => {
    const t = useTranslations('ApiErrors');
    const { error, ...rest } = useSWRMutation(...args);

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
