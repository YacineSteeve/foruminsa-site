import { withMiddlewares } from '@lib/middlewares';
import { prismaClient } from '@lib/prisma/client';
import { NextResponse } from 'next/server';

const GET = withMiddlewares(
    async (_) => {
        const companies = await prismaClient.company.findMany();
        
        return NextResponse.json(companies);
    },
    {
        cors: {
            method: 'GET',
        },
        rateLimit: true
    }
);

const POST = withMiddlewares(
    async (_) => {
        return NextResponse.json({});
    },
    {
        cors: {
            method: 'POST',
        },
    }
);

export { GET, POST };
