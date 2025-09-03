import {
    localizedStringSchema,
    nonEmptyStringSchema,
    timeSchema,
    urlStringSchema,
} from '@lib/types/primitives';
import {
    forumRoomEntitySchema,
    sectorEntitySchema,
    companyEntitySchema,
} from '@lib/types/entities';
import { z } from 'zod/v4';

export const sectorsDataSchema = z.array(sectorEntitySchema.pick({ id: true, name: true }), {
    error: 'mustBeAnArray',
});

export type SectorsData = z.infer<typeof sectorsDataSchema>;

export const forumRoomsDataSchema = z.array(
    forumRoomEntitySchema.pick({
        id: true,
        name: true,
        floor: true,
        building: true,
    }),
    { error: 'mustBeAnArray' },
);

export type ForumRoomsData = z.infer<typeof forumRoomsDataSchema>;

export const companiesDataSchema = z.array(
    companyEntitySchema.pick({
        id: true,
        name: true,
        description: true,
        logoFile: true,
        providesGoodies: true,
        hasGreenTransport: true,
        socialLinks: true,
        studyLevels: true,
        specialities: true,
        city: true,
        countryCode: true,
        address: true,
        postalCode: true,
        websiteUrl: true,
        hiringPlatformUrl: true,
        carbonFootprint: true,
        roomId: true,
        sectorIds: true,
    }),
    { error: 'mustBeAnArray' },
);

export type CompaniesData = z.infer<typeof companiesDataSchema>;

export const planningEntrySchema = z.intersection(
    z.intersection(
        z.object({
            title: localizedStringSchema,
            description: localizedStringSchema,
        }),
        z.discriminatedUnion('location', [
            z.object({
                location: z.literal(null),
                locationUrl: z.null().optional(),
            }),
            z.object({
                location: nonEmptyStringSchema,
                locationUrl: urlStringSchema.nullish(),
            }),
        ]),
    ),
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

export type PlanningEntry = z.infer<typeof planningEntrySchema>;

export const planningDataSchema = z.array(
    z.object({
        name: localizedStringSchema,
        entries: z.array(planningEntrySchema, { error: 'mustBeAnArray' }),
    }),
    { error: 'mustBeAnArray' },
);

export type PlanningData = z.infer<typeof planningDataSchema>;
