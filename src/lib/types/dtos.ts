import {
    CONTACT_SUBJECTS,
    SPECIALITIES,
    STUDY_LEVELS,
    SUPPORTED_LANGUAGES,
} from '@lib/constants/core';
import { COUNTRY_CODES } from '@lib/constants/countries';
import type { CompanyEntity } from '@lib/types/entities';
import { z } from 'zod/v4';

export const contactDataSchema = z
    .object({
        lang: z.enum(SUPPORTED_LANGUAGES, { error: 'invalidLanguage' }),
        subject: z.enum(CONTACT_SUBJECTS, { error: 'invalidSubject' }),
        email: z.email({ error: 'invalidEmail' }),
        companyName: z
            .string({ error: 'mustBeAString' })
            .min(1, { error: 'mustHaveAtLeastOneCharacter' })
            .optional(),
        name: z.string({ error: 'mustBeAString' }).min(1, { error: 'mustHaveAtLeastOneCharacter' }),
        phone: z
            .string({ error: 'mustBeAString' })
            .regex(/^(?:(?:\\+33|0033)[1-9]\d{8}|0[1-9]\d{8})$/, {
                error: 'invalidPhoneNumber',
            })
            .optional(),
        message: z
            .string({ error: 'mustBeAString' })
            .min(1, { error: 'mustHaveAtLeastOneCharacter' }),
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
    city: z
        .string({ error: 'mustBeAString' })
        .min(1, { error: 'mustHaveAtLeastOneCharacter' })
        .nullish(),
    countryCode: z.enum(COUNTRY_CODES, { error: 'mustBeAValidCountryCode' }).nullish(),
    sector: z.cuid2({ error: 'mustBeAValidId' }).nullish(),
    speciality: z.enum(SPECIALITIES, { error: 'mustBeAValidSpeciality' }).nullish(),
    studyLevel: z.enum(STUDY_LEVELS, { error: 'mustBeAValidStudyLevel' }).nullish(),
    page: z.coerce.number().int().nonnegative().nullish(),
    greenLabel: z.coerce.boolean({ error: 'mustBeABoolean' }).nullish(),
});

export type CompaniesFilters = z.infer<typeof companiesFiltersSchema>;

export type CompanyKey = CompanyEntity['id'] | CompanyEntity['slug'];
