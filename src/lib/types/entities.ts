import { SOCIAL_LINK_TYPES, SPECIALITIES, STUDY_LEVELS } from '@lib/constants/core';
import { COUNTRY_CODES } from '@lib/constants/countries';
import { z } from 'zod/v4';

export const localizedStringEntitySchema = z.object({
    fr: z.string({ error: 'mustBeAString' }).min(1, { error: 'mustHaveAtLeastOneCharacter' }),
    en: z.string({ error: 'mustBeAString' }).min(1, { error: 'mustHaveAtLeastOneCharacter' }),
});

export type LocalizedStringEntity = z.infer<typeof localizedStringEntitySchema>;

export const companiesStatsEntitySchema = z.object({
    companiesCount: z.int().nonnegative(),
    sectorsCount: z.int().nonnegative(),
    specialitiesCount: z.int().nonnegative(),
});

export type CompaniesStatsEntity = z.infer<typeof companiesStatsEntitySchema>;

export const cityEntitySchema = z
    .string({ error: 'mustBeAString' })
    .min(1, { error: 'mustHaveAtLeastOneCharacter' });

export type CityEntity = z.infer<typeof cityEntitySchema>;

export const cityListEntitySchema = z.array(cityEntitySchema, { error: 'mustBeAnArray' });

export type CityListEntity = z.infer<typeof cityListEntitySchema>;

export const sectorEntitySchema = z.object({
    id: z.cuid2({ error: 'mustBeAValidId' }),
    nameFR: z.string({ error: 'mustBeAString' }).min(1, { error: 'mustHaveAtLeastOneCharacter' }),
    nameEN: z.string({ error: 'mustBeAString' }).min(1, { error: 'mustHaveAtLeastOneCharacter' }),
});

export type SectorEntity = z.infer<typeof sectorEntitySchema>;

export const sectorListEntitySchema = z.array(sectorEntitySchema, { error: 'mustBeAnArray' });

export type SectorListEntity = z.infer<typeof sectorListEntitySchema>;

export const forumRoomEntitySchema = z.object({
    id: z.cuid2({ error: 'mustBeAValidId' }),
    name: z.string({ error: 'mustBeAString' }).min(1, { error: 'mustHaveAtLeastOneCharacter' }),
    floor: z.int(),
    building: z.string({ error: 'mustBeAString' }).min(1, { error: 'mustHaveAtLeastOneCharacter' }),
});

export type ForumRoomEntity = z.infer<typeof forumRoomEntitySchema>;

export const socialLinkEntitySchema = z.object({
    id: z.cuid2({ error: 'mustBeAValidId' }),
    type: z.enum(SOCIAL_LINK_TYPES, { error: 'mustBeAValidSocialLinkType' }),
    url: z.url({ error: 'mustBeAValidUrl' }),
});

export type SocialLinkEntity = z.infer<typeof socialLinkEntitySchema>;

export const companyEntitySchema = z.object({
    id: z.cuid2({ error: 'mustBeAValidId' }),
    name: z.string({ error: 'mustBeAString' }).min(1, { error: 'mustHaveAtLeastOneCharacter' }),
    slug: z.string({ error: 'mustBeAString' }).min(1, { error: 'mustHaveAtLeastOneCharacter' }),
    descriptionFR: z
        .string({ error: 'mustBeAString' })
        .min(1, { error: 'mustHaveAtLeastOneCharacter' }),
    descriptionEN: z
        .string({ error: 'mustBeAString' })
        .min(1, { error: 'mustHaveAtLeastOneCharacter' }),
    logoUrl: z.url({ error: 'mustBeAValidUrl' }),
    providesGoodies: z.boolean({ error: 'mustBeABoolean' }).default(false),
    hasGreenTransport: z.boolean({ error: 'mustBeABoolean' }).default(false),
    studyLevels: z
        .string({ error: 'mustBeAString' })
        .regex(new RegExp(`^((${STUDY_LEVELS.join('|')}),?)+$`), {
            error: 'mustBeAValidStudyLevel',
        }),
    specialities: z
        .string({ error: 'mustBeAString' })
        .regex(new RegExp(`^((${SPECIALITIES.join('|')}),?)+$`), {
            error: 'mustBeAValidSpeciality',
        }),
    city: cityEntitySchema,
    countryCode: z.enum(COUNTRY_CODES, { error: 'mustBeAValidCountryCode' }),
    address: z
        .string({ error: 'mustBeAString' })
        .min(1, { error: 'mustHaveAtLeastOneCharacter' })
        .nullable(),
    postalCode: z
        .string({ error: 'mustBeAString' })
        .min(1, { error: 'mustHaveAtLeastOneCharacter' })
        .nullable(),
    websiteUrl: z.url({ error: 'mustBeAValidUrl' }).nullable(),
    carbonFootprint: z.float32({ error: 'mustBeAValidFloat' }).nonnegative().nullable(),
    sectors: sectorListEntitySchema,
    socialLinks: z.array(socialLinkEntitySchema, { error: 'mustBeAnArray' }),
    roomId: z.cuid2({ error: 'mustBeAValidId' }).nullable(),
    room: forumRoomEntitySchema.nullable(),
});

export type CompanyEntity = z.infer<typeof companyEntitySchema>;

export const paginatedCompaniesEntitySchema = z.object({
    data: z.array(companyEntitySchema, { error: 'mustBeAnArray' }),
    totalElements: z.int().nonnegative(),
    page: z.int().positive(),
    pageSize: z.int({ error: 'mustBeAnInteger' }).positive(),
});

export type PaginatedCompaniesEntity = z.infer<typeof paginatedCompaniesEntitySchema>;

export const companyLogoListEntitySchema = z.array(
    companyEntitySchema.pick({ logoUrl: true, name: true, id: true, slug: true }),
    { error: 'mustBeAnArray' },
);

export type CompanyLogoListEntity = z.infer<typeof companyLogoListEntitySchema>;

export const hourSchema = z
    .number({ error: 'mustBeANumber' })
    .int({ error: 'mustBeAnInteger' })
    .min(0, { error: 'mustBeAtLeast0' })
    .max(23, { error: 'mustBeAtMost23' });

export type Hour = z.infer<typeof hourSchema>;

export const minuteSchema = z
    .number({ error: 'mustBeANumber' })
    .int({ error: 'mustBeAnInteger' })
    .min(0, { error: 'mustBeAtLeast0' })
    .max(59, { error: 'mustBeAtMost59' });

export type Minute = z.infer<typeof minuteSchema>;

export const timeSchema = z.object({
    hours: hourSchema,
    minutes: minuteSchema,
});

export type Time = z.infer<typeof timeSchema>;

export const planningEntryEntitySchema = z.intersection(
    z.object({
        title: localizedStringEntitySchema,
        description: localizedStringEntitySchema,
        location: z
            .string({ error: 'mustBeAString' })
            .min(1, { error: 'mustHaveAtLeastOneCharacter' })
            .nullable(),
    }),
    z.discriminatedUnion('isFullDay', [
        z.object({
            isFullDay: z.literal(true),
            startTime: z.null(),
            endTime: z.null(),
        }),
        z
            .object({
                isFullDay: z.literal(false),
                startTime: timeSchema,
                endTime: timeSchema,
            })
            .refine(
                (data) => {
                    if (data.startTime.hours < data.endTime.hours) return true;

                    if (data.startTime.hours === data.endTime.hours) {
                        return data.startTime.minutes < data.endTime.minutes;
                    }

                    return false;
                },
                { message: 'endTimeMustBeAfterStartTime', path: ['endTime'] },
            ),
    ]),
);

export type PlanningEntryEntity = z.infer<typeof planningEntryEntitySchema>;

export const planningCategoryEntitySchema = z.object({
    name: localizedStringEntitySchema,
    entries: z.array(planningEntryEntitySchema, { error: 'mustBeAnArray' }),
});

export type PlanningCategoryEntity = z.infer<typeof planningCategoryEntitySchema>;

export const planningEntitySchema = z.array(planningCategoryEntitySchema, {
    error: 'mustBeAnArray',
});

export type PlanningEntity = z.infer<typeof planningEntitySchema>;
