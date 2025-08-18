import type { URL_PARAMS } from '@lib/constants/core';
import { usePathname, useRouter } from '@lib/i18n/navigation';
import { type ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

type Key = keyof typeof URL_PARAMS;

type Value = string | Array<string>;

export interface UseSearchParamsChange<K extends Key> {
    searchParams: ReadonlyURLSearchParams;
    changeSearchParam: (key: K) => (value: Value) => void;
    changeSearchParamMulti: (keys: Array<K>) => (values: Array<Value>) => void;
}

const isDefined = (value: string | undefined): value is string =>
    ![undefined, null, ''].includes(value);

export const useSearchParamsChange = <K extends Key>(
    { replace }: { replace: boolean } = { replace: true },
): UseSearchParamsChange<K> => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const changeSearchParamMulti = useCallback(
        (keys: Array<K>) => (values: Array<Value>) => {
            const params = new URLSearchParams(searchParams.toString());

            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                const value = values[i];

                if (key === undefined) {
                    continue;
                }

                if (Array.isArray(value)) {
                    params.delete(key);

                    value.forEach((subValue) => {
                        if (isDefined(subValue)) {
                            params.append(key, subValue);
                        }
                    });
                } else {
                    if (isDefined(value)) {
                        params.set(key, value);
                    } else {
                        params.delete(key);
                    }
                }
            }

            if (params.size > 0) {
                if (replace) {
                    router.replace(
                        {
                            pathname,
                            query: Object.fromEntries(params.entries()),
                        },
                        { scroll: false },
                    );
                } else {
                    router.push(
                        {
                            pathname,
                            query: Object.fromEntries(params.entries()),
                        },
                        { scroll: false },
                    );
                }
            } else {
                if (replace) {
                    router.replace(pathname, { scroll: false });
                } else {
                    router.push(pathname, { scroll: false });
                }
            }
        },
        [replace, searchParams, router, pathname],
    );

    const changeSearchParam = useCallback(
        (key: K) => (value: Value) => {
            changeSearchParamMulti([key])([value]);
        },
        [changeSearchParamMulti],
    );

    return { searchParams, changeSearchParam, changeSearchParamMulti };
};
