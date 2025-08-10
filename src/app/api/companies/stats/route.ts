import { withMiddlewares } from '@lib/middlewares';
import { prismaClient } from '@lib/prisma/client';
import { companiesStatsSchema } from '@lib/types';
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
                        }
                    },
                }
            });
            
            const companiesCount = companies.length;
            const sectorsCount = new Set<string>(
                companies.flatMap((company) => company.sectors.map((sector) => sector.id))
            ).size;
            const specialitiesCount = new Set<string>(
                companies.flatMap((company) => company.specialities.split(','))
            ).size;
            
            return NextResponse.json(
                companiesStatsSchema.parse({
                    companiesCount,
                    sectorsCount,
                    specialitiesCount,
                })
            );
        } catch (error) {
            return new ApiError(
                'SOMETHING_WENT_WRONG',
                500,
                error instanceof Error
                    ? error.stack
                    : new Error('An error occurred while fetching companies stats.', {
                        cause: error,
                    }).stack,
            ).asNextResponse();
        }
    },
    {
        cors: {
            method: 'GET',
        },
        rateLimit: true,
    }
);

export { GET };
