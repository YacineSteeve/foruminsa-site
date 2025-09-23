import { withMiddlewares } from '@lib/middlewares';
import { NextResponse } from 'next/server';

const GET = withMiddlewares(
    async () => {
        return NextResponse.json({ message: 'OK' }, { status: 200 });
    },
    {
        cors: {
            method: 'GET',
        },
        rateLimit: false,
    },
);

export { GET };
