import { serverEnv } from '@lib/config/env';
import { type CorsOptions, withCors } from '@lib/middlewares/cors';
import { type RateLimitOptions, withRateLimit } from '@lib/middlewares/rate-limiting';
import type { RequestHandler, RequestHandlerContext, RequestHandlerContextBase } from '@lib/middlewares/types';

export { withCors, withRateLimit };

export type AllMiddlewaresOptions = {
    cors?: boolean | CorsOptions;
    rateLimit?: boolean | RateLimitOptions;
};

export const withMiddlewares = <C extends RequestHandlerContext = RequestHandlerContextBase>(
    handler: RequestHandler<C>,
    options?: AllMiddlewaresOptions,
): RequestHandler<C> => {
    return async (request, context) => {
        let chain = handler;

        if (!serverEnv.DISABLE_RATE_LIMIT && options?.rateLimit) {
            chain = withRateLimit(
                handler,
                typeof options.rateLimit === 'boolean' ? {} : options.rateLimit,
            );
        }

        chain = withCors(
            chain,
            typeof options?.cors === 'boolean'
                ? {
                      method: request.method as NonNullable<CorsOptions>['method'],
                  }
                : options?.cors,
        );

        return chain(request, context);
    };
};
