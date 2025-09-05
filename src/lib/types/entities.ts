import { SOCIAL_LINK_TYPES, SPECIALITIES, STUDY_LEVELS } from '@lib/constants/core';
import { COUNTRY_CODES } from '@lib/constants/countries';
import {
    booleanSchema,
    imageFilenameSchema,
    integerSchema,
    localizedStringSchema,
    nonEmptyStringSchema,
    nonNegativeFloat32Schema,
    positiveIntegerSchema,
    urlStringSchema,
} from '@lib/types/primitives';
import { z } from 'zod/v4';

export const sectorEntitySchema = z.object({
    id: positiveIntegerSchema,
    name: localizedStringSchema,
});

export type SectorEntity = z.infer<typeof sectorEntitySchema>;

export const forumRoomEntitySchema = z.object({
    id: positiveIntegerSchema,
    name: nonEmptyStringSchema,
    floor: integerSchema,
    building: nonEmptyStringSchema,
});

export type ForumRoomEntity = z.infer<typeof forumRoomEntitySchema>;

export const studyLevelSchema = z.enum(STUDY_LEVELS, { error: 'mustBeAValidStudyLevel' });

export type StudyLevel = z.infer<typeof studyLevelSchema>;

export const specialitySchema = z.enum(SPECIALITIES, { error: 'mustBeAValidSpeciality' });

export type Speciality = z.infer<typeof specialitySchema>;

export const countryCodeSchema = z.enum(COUNTRY_CODES, { error: 'mustBeAValidCountryCode' });

export type CountryCode = z.infer<typeof countryCodeSchema>;

export const socialLinkSchema = z.object({
    type: z.enum(SOCIAL_LINK_TYPES, { error: 'mustBeAValidSocialLinkType' }),
    url: urlStringSchema,
});

export type SocialLink = z.infer<typeof socialLinkSchema>;

export const companyEntitySchema = z.object({
    id: positiveIntegerSchema,
    name: nonEmptyStringSchema,
    slug: nonEmptyStringSchema.lowercase({ error: 'mustBeALowercaseString' }),
    description: localizedStringSchema,
    logoFile: z.union([urlStringSchema, imageFilenameSchema]),
    providesGoodies: booleanSchema,
    hasGreenTransport: booleanSchema,
    socialLinks: z.array(socialLinkSchema, { error: 'mustBeAnArray' }),
    studyLevels: z.array(studyLevelSchema, { error: 'mustBeAnArray' }),
    specialities: z.array(specialitySchema, { error: 'mustBeAnArray' }),
    city: nonEmptyStringSchema,
    countryCode: countryCodeSchema,
    address: nonEmptyStringSchema.nullable(),
    postalCode: nonEmptyStringSchema.nullable(),
    websiteUrl: urlStringSchema.nullable(),
    hiringPlatformUrl: urlStringSchema.nullable(),
    carbonFootprint: nonNegativeFloat32Schema.nullable(),
    carbonBalanceRank: positiveIntegerSchema,
    roomId: forumRoomEntitySchema.shape.id.nullable(),
    room: forumRoomEntitySchema.nullable(),
    sectorIds: z.array(sectorEntitySchema.shape.id, { error: 'mustBeAnArray' }),
    sectors: z.array(sectorEntitySchema, { error: 'mustBeAnArray' }),
});

export type CompanyEntity = z.infer<typeof companyEntitySchema>;
