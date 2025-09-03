import { z } from 'zod/v4';

export const integerSchema = z.int({ error: 'mustBeAnInteger' });

export type Integer = z.infer<typeof integerSchema>;

export const nonNegativeIntegerSchema = integerSchema.nonnegative({ error: 'mustNotBeNegative' });

export type NonNegativeInteger = z.infer<typeof nonNegativeIntegerSchema>;

export const positiveIntegerSchema = integerSchema.positive();

export type PositiveInteger = z.infer<typeof positiveIntegerSchema>;

export const float32Schema = z.float32({ error: 'mustBeAValidFloat' });

export type Float32 = z.infer<typeof float32Schema>;

export const nonNegativeFloat32Schema = float32Schema.nonnegative({ error: 'mustNotBeNegative' });

export type NonNegativeFloat32 = z.infer<typeof nonNegativeFloat32Schema>;

export const booleanSchema = z.boolean({ error: 'mustBeABoolean' });

export type Boolean = z.infer<typeof booleanSchema>;

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

export const timeSchema = z.object({
    hours: integerSchema.min(0, { error: 'mustBeAtLeast0' }).max(23, { error: 'mustBeAtMost23' }),
    minutes: integerSchema.min(0, { error: 'mustBeAtLeast0' }).max(59, { error: 'mustBeAtMost59' }),
});

export type Time = z.infer<typeof timeSchema>;
