import { withMiddlewares } from '@lib/middlewares';
import { NextResponse } from 'next/server';

const GET = withMiddlewares(
    async (_, __) => {
        return NextResponse.json({});
    },
    {
        cors: {
            method: 'GET',
        },
        rateLimit: true,
    },
);

const PATCH = withMiddlewares(
    async (_, __) => {
        return NextResponse.json({});
    },
    {
        cors: {
            method: 'PATCH',
        },
        rateLimit: true,
    },
);

const DELETE = withMiddlewares(
    async (_, __) => {
        return NextResponse.json({});
    },
    {
        cors: {
            method: 'DELETE',
        },
    },
);

export { GET, PATCH, DELETE };
