import { type CorsOptions, withCors } from '@lib/middlewares/cors';
import { type RateLimitOptions, withRateLimit } from '@lib/middlewares/rate-limiting';
import type { RequestHandler, RequestHandlerContext } from '@lib/middlewares/types';

export type AllMiddlewaresOptions = {
    cors?: boolean | CorsOptions;
    rateLimit?: boolean | RateLimitOptions;
};

const withMiddlewares = <C extends RequestHandlerContext = RequestHandlerContext>(
    handler: RequestHandler<C>,
    options?: AllMiddlewaresOptions,
): RequestHandler<C> => {
    return async (request, context) => {
        return withRateLimit(
            withCors(
                handler,
                typeof options?.cors === 'boolean'
                    ? {
                          method: request.method as NonNullable<CorsOptions>['method'],
                      }
                    : options?.cors,
            ),
            typeof options?.rateLimit === 'boolean' ? {} : options?.rateLimit,
        )(request, context);
    };
};

export { withCors, withRateLimit, withMiddlewares };
