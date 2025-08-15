import { withMiddlewares } from '@lib/middlewares';
import { prismaClient } from '@lib/prisma/client';
import { cityListEntitySchema } from '@lib/types/entities';
import { ApiError } from '@lib/utils';
import { NextResponse } from 'next/server';

const GET = withMiddlewares(
    async () => {
        try {
            const companies = await prismaClient.company.findMany({
                distinct: 'city',
                select: {
                    city: true,
                },
            });

            return NextResponse.json(
                cityListEntitySchema.parse(companies.map((company) => company.city)),
            );
        } catch (error) {
            return new ApiError(
                'INTERNAL_SERVER_ERROR',
                500,
                error instanceof Error
                    ? error
                    : new Error('An error occurred while fetching companies cities.', {
                          cause: error,
                      }),
            ).asNextResponse();
        }
    },
    {
        cors: {
            method: 'GET',
        },
        rateLimit: true,
    },
);

export { GET };
