import type { MiddlewareFactory } from '@lib/middlewares/types';
import { prismaClient } from '@lib/prisma/client';
import { ApiError } from '@lib/utils';
import ipaddr from 'ipaddr.js';
import { NextRequest } from 'next/server';
import { type IRateLimiterOptions, RateLimiterPrisma, RateLimiterRes } from 'rate-limiter-flexible';

const rateLimiterStore = new RateLimiterPrisma({
    storeClient: prismaClient,
    points: 30, // 30 requests
    duration: 60, // Per minute
    blockDuration: 60, // Block for 60 seconds if the rate limit is exceeded
    tableCreated: true,
    tableName: 'RateLimit',
});

const IP_HEADER_NAMES = [
    'x-forwarded-for',
    'x-forwarded',
    'x-real-ip',
    'cf-connecting-ip',
    'x-client-ip',
    'x-cluster-client-ip',
    'forwarded-for',
    'forwarded',
] as const;

const getIp = (request: NextRequest): string => {
    // Iterate through the IP header names to find the first one that exists
    for (const headerName of IP_HEADER_NAMES) {
        const headerValue = request.headers.get(headerName);

        if (!headerValue) {
            continue;
        }

        const ip = headerValue.split(',')[0]?.trim();

        if (!ip) {
            continue;
        }

        const parsed = ipaddr.parse(ip);

        if (parsed.kind() === 'ipv6') {
            return ipaddr.IPv6.parse(ip).toNormalizedString();
        }

        return ipaddr.IPv4.parse(ip).toNormalizedString();
    }

    // If no valid IP header is found, return a default value
    return '127.0.0.1';
};

const getRateLimiterHeaders = (
    response: RateLimiterRes,
    maxPoints: NonNullable<IRateLimiterOptions['points']>,
) => {
    return {
        'Retry-After': (response.msBeforeNext / 1000).toString(),
        'X-RateLimit-Limit': maxPoints.toString(),
        'X-RateLimit-Remaining': response.remainingPoints.toString(),
        'X-RateLimit-Reset': Math.ceil((Date.now() + response.msBeforeNext) / 1000).toString(),
    };
};

export const withRateLimit: MiddlewareFactory = (handler) => {
    return async (request: NextRequest, context: unknown) => {
        const ip = getIp(request);

        let rateLimiterSuccessResponse: RateLimiterRes;

        try {
            rateLimiterSuccessResponse = await rateLimiterStore.consume(ip);
        } catch (error) {
            if (error instanceof RateLimiterRes) {
                return new ApiError(
                    'TOO_MANY_REQUESTS',
                    429,
                    new Error(`Rate limit exceeded for IP: ${ip}`),
                ).asNextResponse({
                    headers: getRateLimiterHeaders(error, rateLimiterStore.points),
                });
            }

            return new ApiError(
                'SOMETHING_WENT_WRONG',
                500,
                error instanceof Error
                    ? error
                    : new Error('An error occurred while processing the request.', {
                          cause: error,
                      }),
            ).asNextResponse();
        }

        const response = await handler(request, context);

        const headers = getRateLimiterHeaders(rateLimiterSuccessResponse, rateLimiterStore.points);

        for (const [key, value] of Object.entries(headers)) {
            response.headers.set(key, value);
        }

        return response;
    };
};
