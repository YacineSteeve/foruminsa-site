import { withMiddlewares } from '@lib/middlewares';
import { prismaClient } from '@lib/prisma/client';
import type { CompanyKey } from '@lib/types/dtos';
import { companyEntitySchema } from '@lib/types/entities';
import { ApiError } from '@lib/utils';
import { NextResponse } from 'next/server';
import { Prisma, Company } from '@prisma/client';

interface RouteContext {
    params: Promise<{ companyKey: string }>;
}

const findCompanyByKey = async (
    key: CompanyKey,
    args: Pick<Prisma.CompanyFindFirstArgs, 'include' | 'select'> = {},
): Promise<[Company, null] | [null, NextResponse]> => {
    let company;

    try {
        company = await prismaClient.company.findFirst({
            where: {
                OR: [{ id: key }, { slug: key }],
            },
            ...args,
        });
    } catch (error) {
        return [
            null,
            new ApiError(
                'INTERNAL_SERVER_ERROR',
                500,
                error instanceof Error
                    ? error
                    : new Error('An error occurred while fetching companies.', {
                          cause: error,
                      }),
            ).asNextResponse(),
        ];
    }

    if (!company) {
        return [
            null,
            new ApiError(
                'COMPANY_NOT_FOUND',
                404,
                new Error(`Company with key "${key}" not found`),
            ).asNextResponse(),
        ];
    }

    return [company, null];
};

const GET = withMiddlewares<RouteContext>(
    async (_, context) => {
        const { companyKey } = await context.params;

        const [company, errorResponse] = await findCompanyByKey(companyKey, {
            include: {
                sectors: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                socialLinks: {
                    select: {
                        id: true,
                        type: true,
                        url: true,
                    },
                },
                room: {
                    select: {
                        id: true,
                        name: true,
                        floor: true,
                        building: true,
                    },
                },
            },
        });

        if (errorResponse) {
            return errorResponse;
        }

        return NextResponse.json(companyEntitySchema.parse(company));
    },
    {
        cors: {
            method: 'GET',
        },
        rateLimit: true,
    },
);

const PATCH = withMiddlewares<RouteContext>(
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

const DELETE = withMiddlewares<RouteContext>(
    async (_, context) => {
        const { companyKey } = await context.params;

        const [company, errorResponse] = await findCompanyByKey(companyKey, {
            select: {
                id: true,
            },
        });

        if (errorResponse) {
            return errorResponse;
        }

        try {
            await prismaClient.company.delete({
                where: {
                    id: company.id,
                },
            });
        } catch (error) {
            return new ApiError(
                'INTERNAL_SERVER_ERROR',
                500,
                error instanceof Error
                    ? error
                    : new Error('An error occurred while deleting the company.', {
                          cause: error,
                      }),
            ).asNextResponse();
        }

        return NextResponse.json({});
    },
    {
        cors: {
            method: 'DELETE',
        },
    },
);

export { GET, PATCH, DELETE };
