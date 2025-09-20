import { z } from 'zod/v4';

export const integerSchema = z.int({ error: 'mustBeAnInteger' });

export type Integer = z.infer<typeof integerSchema>;

export const nonNegativeIntegerSchema = integerSchema.nonnegative({ error: 'mustNotBeNegative' });

export type NonNegativeInteger = z.infer<typeof nonNegativeIntegerSchema>;

export const positiveIntegerSchema = integerSchema.positive({ error: 'mustBePositive' });

export type PositiveInteger = z.infer<typeof positiveIntegerSchema>;

export const booleanSchema = z.boolean({ error: 'mustBeABoolean' });

export type Boolean = z.infer<typeof booleanSchema>;

export const nullSchema = z.null({ error: 'mustBeNull' });

export type Null = z.infer<typeof nullSchema>;

export const stringSchema = z.string({ error: 'mustBeAString' });

export type String = z.infer<typeof stringSchema>;

export const nonEmptyStringSchema = stringSchema.nonempty({ error: 'mustHaveAtLeastOneCharacter' });

export type NonEmptyString = z.infer<typeof nonEmptyStringSchema>;

export const urlStringSchema = z.url({ error: 'mustBeAValidUrl' });

export type UrlString = z.infer<typeof urlStringSchema>;

export const localizedStringSchema = z.object({
    fr: nonEmptyStringSchema,
    en: nonEmptyStringSchema,
});

export type LocalizedString = z.infer<typeof localizedStringSchema>;

export const imageFilenameSchema = z
    .string()
    .regex(/^[a-zA-Z0-9._-]+\.(jpe?g|png|gif|bmp|webp|svg)$/i, {
        error: 'mustBeAValidImageFileName',
    });

export type ImageFilename = z.infer<typeof imageFilenameSchema>;

export const timeSchema = z.object({
    hours: integerSchema.min(0, { error: 'mustBeAtLeast0' }).max(23, { error: 'mustBeAtMost23' }),
    minutes: integerSchema.min(0, { error: 'mustBeAtLeast0' }).max(59, { error: 'mustBeAtMost59' }),
});

export type Time = z.infer<typeof timeSchema>;

export const ratingSchema = z.union([
    z.literal(0, { error: 'mustBe0' }),
    z.literal(0.5, { error: 'mustBe0Point5' }),
    z.literal(1, { error: 'mustBe1' }),
    z.literal(1.5, { error: 'mustBe1Point5' }),
    z.literal(2, { error: 'mustBe2' }),
    z.literal(2.5, { error: 'mustBe2Point5' }),
    z.literal(3, { error: 'mustBe3' }),
    z.literal(3.5, { error: 'mustBe3Point5' }),
    z.literal(4, { error: 'mustBe4' }),
    z.literal(4.5, { error: 'mustBe4Point5' }),
    z.literal(5, { error: 'mustBe5' }),
]);

export type Rating = z.infer<typeof ratingSchema>;
