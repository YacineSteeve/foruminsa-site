import { withMiddlewares } from '@lib/middlewares';
import { prismaClient } from '@lib/prisma/client';
import { companiesStatsEntitySchema } from '@lib/types/entities';
import { ApiError } from '@lib/utils';
import { NextResponse } from 'next/server';

const GET = withMiddlewares(
    async () => {
        try {
            const companies = await prismaClient.company.findMany({
                select: {
                    specialities: true,
                    sectors: {
                        select: {
                            id: true,
                        },
                    },
                },
            });

            const companiesCount = companies.length;
            const sectorsCount = new Set<string>(
                companies.flatMap((company) => company.sectors.map((sector) => sector.id)),
            ).size;
            const specialitiesCount = new Set<string>(
                companies.flatMap((company) => company.specialities.split(',')),
            ).size;

            return NextResponse.json(
                companiesStatsEntitySchema.parse({
                    companiesCount,
                    sectorsCount,
                    specialitiesCount,
                }),
            );
        } catch (error) {
            return new ApiError(
                'INTERNAL_SERVER_ERROR',
                500,
                error instanceof Error
                    ? error
                    : new Error('An error occurred while fetching companies stats.', {
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
