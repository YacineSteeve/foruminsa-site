import { ApiError, type ErrorResponseBody } from '@lib/utils';
import { join } from 'path';
import { APP_URL, DEFAULT_ERROR_MESSAGE } from '@lib/constants/core';

export type RequestConfigParams = Record<string, unknown>;

export type RequestConfigData = Record<string, unknown>;

export interface RequestConfig<P extends RequestConfigParams, D extends RequestConfigData>
    extends Omit<RequestInit, 'body'> {
    params?: P;
    data?: D;
    revalidateTags?: Array<string>;
    revalidatePages?: Array<string>;
    revalidateLayouts?: Array<string>;
}

export class BaseService {
    private static async request<
        R,
        P extends RequestConfigParams = {},
        D extends RequestConfigData = {},
    >(path: string, config: RequestConfig<P, D>): Promise<R | undefined> {
        const { method, headers, data, params, ...otherConfig } = config;

        const url = generateFullUrl(path, params);

        let response: Response;

        try {
            response = await fetch(url, {
                method: method ?? 'GET',
                headers: {
                    'Content-Type':
                        data instanceof FormData ? 'multipart/form-data' : 'application/json',
                },
                body: data ? (data instanceof FormData ? data : JSON.stringify(data)) : undefined,
                credentials: 'include',
                ...otherConfig,
            });
        } catch (error) {
            throw new Error(DEFAULT_ERROR_MESSAGE, {
                cause: new ApiError(
                    DEFAULT_ERROR_MESSAGE,
                    500,
                    error instanceof Error
                        ? error
                        : new Error('An error occurred while making the request.', {
                              cause: error,
                          }),
                ),
            });
        }

        let responseBody;

        try {
            responseBody = await response.json();
        } catch {
            responseBody = undefined;
        }

        if (!response.ok) {
            const errorResponseBody = (responseBody ?? {}) as ErrorResponseBody;

            throw new Error(errorResponseBody.message || DEFAULT_ERROR_MESSAGE, {
                cause: new ApiError(
                    errorResponseBody.message || DEFAULT_ERROR_MESSAGE,
                    response.status,
                    new Error(errorResponseBody.cause?.toString()),
                ),
            });
        }

        return responseBody as R;
    }

    public static async get<R, P extends RequestConfigParams = {}>(
        path: string,
        config?: RequestConfig<P, never>,
    ) {
        return this.request<R, P>(path, { ...config, method: 'GET' });
    }

    public static async post<
        R,
        P extends RequestConfigParams = {},
        D extends RequestConfigData = {},
    >(path: string, config?: RequestConfig<P, D>) {
        return this.request<R, P>(path, { ...config, method: 'POST' });
    }

    public static async put<
        R,
        P extends RequestConfigParams = {},
        D extends RequestConfigData = {},
    >(path: string, config?: RequestConfig<P, D>) {
        return this.request<R, P>(path, { ...config, method: 'PUT' });
    }

    public static async patch<
        R,
        P extends RequestConfigParams = {},
        D extends RequestConfigData = {},
    >(path: string, config?: RequestConfig<P, D>) {
        return this.request<R, P>(path, { ...config, method: 'PATCH' });
    }

    public static async delete<R, P extends RequestConfigParams = {}>(
        path: string,
        config?: RequestConfig<P, never>,
    ) {
        return this.request<R, P>(path, { ...config, method: 'DELETE' });
    }
}

const generateFullUrl = (path: string, params?: RequestConfigParams) => {
    const url = new URL(join('/api/', path), APP_URL);

    // Process query parameters
    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            // Skip undefined, null, or empty string values
            if (value === null || value === undefined || value === '') return;

            if (Array.isArray(value)) {
                if (value.length === 0) return;

                value.forEach((element) => {
                    url.searchParams.append(key, element);
                });
            } else {
                url.searchParams.append(key, String(value));
            }
        });
    }

    return url;
};
