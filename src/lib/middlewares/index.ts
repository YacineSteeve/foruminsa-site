import { withCors } from '@lib/middlewares/cors';
import { withRateLimit } from '@lib/middlewares/rate-limiting';
import type { MiddlewareFactory } from '@lib/middlewares/types';

export { withCors, withRateLimit };

export type WithMiddlewaresOptions = {
    cors?: boolean | Parameters<typeof withCors>[1];
    rateLimit?: boolean | Parameters<typeof withRateLimit>[1];
};

export const withMiddlewares: MiddlewareFactory<WithMiddlewaresOptions> = (handler, options) => {
    return async (request, context) => {
        let chain = handler;

        if (options?.rateLimit) {
            chain = withRateLimit(
                handler,
                typeof options.rateLimit === 'boolean' ? {} : options.rateLimit,
            );
        }

        chain = withCors(
            chain,
            typeof options?.cors === 'boolean'
                ? {
                      method: request.method as NonNullable<
                          Parameters<typeof withCors>[1]
                      >['method'],
                  }
                : options?.cors,
        );

        return chain(request, context);
    };
};
