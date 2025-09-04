import { CONTACT_SUBJECTS, SUPPORTED_LANGUAGES } from '@lib/constants/core';
import {
    countryCodeSchema,
    sectorEntitySchema,
    specialitySchema,
    studyLevelSchema,
} from '@lib/types/entities';
import { nonEmptyStringSchema, stringSchema } from '@lib/types/primitives';
import { z } from 'zod/v4';

export const contactDataSchema = z
    .object({
        lang: z.enum(SUPPORTED_LANGUAGES, { error: 'invalidLanguage' }),
        subject: z.enum(CONTACT_SUBJECTS, { error: 'invalidSubject' }),
        email: z.email({ error: 'invalidEmail' }),
        companyName: nonEmptyStringSchema.optional(),
        name: nonEmptyStringSchema,
        phone: stringSchema
            .regex(/^(?:(?:\\+33|0033)[1-9]\d{8}|0[1-9]\d{8})$/, {
                error: 'invalidPhoneNumber',
            })
            .optional(),
        message: nonEmptyStringSchema,
    })
    .refine(
        (data) => {
            if (data.subject === 'companies') {
                return data.companyName && data.companyName.length >= 1;
            }

            return true;
        },
        {
            error: 'companyNameRequired',
            path: ['companyName'],
        },
    )
    .refine(
        (data) => {
            if (data.subject === 'solidarityFund') {
                return (
                    data.email.endsWith('@insa-toulouse.fr') ||
                    data.email.endsWith('@etud.insa-toulouse.fr')
                );
            }

            return true;
        },
        {
            error: 'invalidStudentEmail',
            path: ['email'],
        },
    );

export type ContactData = z.infer<typeof contactDataSchema>;

export const companiesFiltersSchema = z.object({
    search: nonEmptyStringSchema.nullish(),
    city: nonEmptyStringSchema.nullish(),
    countryCode: countryCodeSchema.nullish(),
    sector: sectorEntitySchema.shape.id.nullish(),
    speciality: specialitySchema.nullish(),
    studyLevel: studyLevelSchema.nullish(),
    page: z.coerce
        .number({ error: 'mustBeAValidNumber' })
        .int({ error: 'mustBeAnInteger' })
        .positive({ error: 'mustBePositive' })
        .nullish(),
    pageSize: z.coerce
        .number({ error: 'mustBeAValidNumber' })
        .int({ error: 'mustBeAnInteger' })
        .positive({ error: 'mustBePositive' })
        .nullish(),
    greenLabel: z.coerce.boolean({ error: 'mustBeABoolean' }).nullish(),
    sortByCarbonFootprint: z.coerce.boolean({ error: 'mustBeABoolean' }).nullish(),
});

export type CompaniesFilters = z.infer<typeof companiesFiltersSchema>;

export type CompaniesFiltersAsSearchParams = {
    [K in keyof CompaniesFilters]: string | string[] | undefined;
};
