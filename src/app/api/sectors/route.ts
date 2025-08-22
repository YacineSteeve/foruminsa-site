import { withMiddlewares } from '@lib/middlewares';
import { prismaClient } from '@lib/prisma/client';
import { sectorListEntitySchema } from '@lib/types/entities';
import { ApiError } from '@lib/utils';
import { NextResponse } from 'next/server';

const GET = withMiddlewares(
    async () => {
        try {
            const sectors = await prismaClient.sector.findMany({
                select: {
                    id: true,
                    nameFR: true,
                    nameEN: true,
                },
            });

            return NextResponse.json(sectorListEntitySchema.parse(sectors));
        } catch (error) {
            return new ApiError(
                'INTERNAL_SERVER_ERROR',
                500,
                error instanceof Error
                    ? error
                    : new Error('An error occurred while fetching sectors.', {
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
