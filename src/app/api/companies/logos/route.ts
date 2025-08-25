import { withMiddlewares } from '@lib/middlewares';
import { prismaClient } from '@lib/prisma/client';
import { companyLogoListEntitySchema } from '@lib/types/entities';
import { ApiError } from '@lib/utils';
import { NextResponse } from 'next/server';

const GET = withMiddlewares(
    async () => {
        try {
            const companies = await prismaClient.company.findMany({
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    logoUrl: true,
                },
            });

            return NextResponse.json(companyLogoListEntitySchema.parse(companies));
        } catch (error) {
            return new ApiError(
                'INTERNAL_SERVER_ERROR',
                500,
                error instanceof Error
                    ? error
                    : new Error('An error occurred while fetching companies logos.', {
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
