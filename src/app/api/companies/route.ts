import { COMPANIES_PAGE_SIZE, URL_PARAMS } from '@lib/constants/core';
import { withMiddlewares } from '@lib/middlewares';
import { prismaClient } from '@lib/prisma/client';
import { type CompaniesFilters, companiesFiltersSchema } from '@lib/types/dtos';
import { paginatedCompaniesEntitySchema } from '@lib/types/entities';
import { ApiError } from '@lib/utils';
import { NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { ZodError } from 'zod/v4';

const GET = withMiddlewares(
    async (request) => {
        const searchParams = request.nextUrl.searchParams;

        let query: CompaniesFilters;

        try {
            query = companiesFiltersSchema.parse({
                city: searchParams.get(URL_PARAMS.city),
                countryCode: searchParams.get(URL_PARAMS.countryCode),
                sector: searchParams.get(URL_PARAMS.sector),
                speciality: searchParams.get(URL_PARAMS.speciality),
                studyLevel: searchParams.get(URL_PARAMS.studyLevel),
                page: searchParams.get(URL_PARAMS.page),
                greenLabel: searchParams.get(URL_PARAMS.greenLabel),
            });
        } catch (error) {
            return new ApiError(
                'INVALID_QUERY_PARAMETERS',
                400,
                error instanceof Error
                    ? error
                    : error instanceof ZodError
                      ? new Error(
                            error.issues
                                .map((issue) => `[${issue.path}] ${issue.message}`)
                                .join(',\n'),
                            {
                                cause: error,
                            },
                        )
                      : new Error('An error occurred while parsing query parameters.', {
                            cause: error,
                        }),
            ).asNextResponse();
        }

        const page = query.page ?? 1;

        const filter: Prisma.CompanyFindManyArgs['where'] = {
            city: query.city ?? undefined,
            countryCode: query.countryCode ?? undefined,
            sectors: query.sector ? { some: { id: query.sector } } : undefined,
            specialities: query.speciality ? { contains: query.speciality } : undefined,
            studyLevels: query.studyLevel ? { contains: query.studyLevel } : undefined,
            ...(query.greenLabel
                ? {
                      AND: [{ providesGoodies: false }, { hasGreenTransport: true }],
                  }
                : {}),
        };

        try {
            const [companies, companiesCount] = await Promise.all([
                prismaClient.company.findMany({
                    where: filter,
                    skip: (page - 1) * COMPANIES_PAGE_SIZE,
                    take: COMPANIES_PAGE_SIZE,
                    include: {
                        sectors: {
                            select: {
                                id: true,
                                nameFR: true,
                                nameEN: true,
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
                }),
                prismaClient.company.count({
                    where: filter,
                }),
            ]);

            return NextResponse.json(
                paginatedCompaniesEntitySchema.parse({
                    data: companies,
                    totalElements: companiesCount,
                    page,
                    pageSize: COMPANIES_PAGE_SIZE,
                }),
            );
        } catch (error) {
            return new ApiError(
                'INTERNAL_SERVER_ERROR',
                500,
                error instanceof Error
                    ? error
                    : new Error('An error occurred while fetching companies.', {
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

const POST = withMiddlewares(
    async (_) => {
        return NextResponse.json({});
    },
    {
        cors: {
            method: 'POST',
        },
    },
);

export { GET, POST };
