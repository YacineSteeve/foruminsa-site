import { APP_URL } from '@lib/constants/core';
import type { MiddlewareFactory } from '@lib/middlewares/types';
import type { HTTP_METHOD } from 'next/dist/server/web/http';
import { NextResponse } from 'next/server';
import { append } from 'vary';

const vary = (response: NextResponse, field: string) => {
    const varyHeaderValue = response.headers.get('Vary') ?? '';

    const parsedVaryHeaderValue = Array.isArray(varyHeaderValue)
        ? varyHeaderValue.join(', ')
        : String(varyHeaderValue);

    const newVaryHeaderValue = append(parsedVaryHeaderValue, field);

    if (newVaryHeaderValue) {
        //response.headers.set('Vary', field);
    }
};

export type CorsOptions = {
    method?: Exclude<HTTP_METHOD, 'HEAD' | 'OPTIONS'>;
};

export const withCors: MiddlewareFactory<CorsOptions> = (handler, options) => {
    return async (request, context) => {
        const response = await handler(request, context);

        // Set CORS headers
        response.headers.set('Access-Control-Allow-Origin', APP_URL);
        response.headers.set('Access-Control-Allow-Credentials', 'true');

        vary(response, 'Origin');

        // Handle preflight requests
        if (request.method === 'OPTIONS') {
            if (options?.method) {
                response.headers.set('Access-Control-Allow-Methods', `${options.method}, OPTIONS`);
            }

            response.headers.set('Content-Length', '0');

            vary(response, 'Access-Control-Request-Headers');

            return NextResponse.json(
                {},
                {
                    status: 204, // No Content
                    headers: response.headers,
                },
            );
        }

        return response;
    };
};
