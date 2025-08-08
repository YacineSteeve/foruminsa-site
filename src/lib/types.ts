import { CONTACT_SUBJECTS, SUPPORTED_LANGUAGES } from '@lib/constants';
import { z } from 'zod/v4';

export const contactDataSchema = z
    .object({
        lang: z.enum(SUPPORTED_LANGUAGES, { error: 'invalidLanguage' }),
        subject: z.enum(CONTACT_SUBJECTS, { error: 'invalidSubject' }),
        email: z.email({ error: 'invalidEmail' }),
        companyName: z.optional(
            z.string({ error: 'mustBeAString' }).min(1, { error: 'mustHaveAtLeastOneCharacter' }),
        ),
        name: z.string({ error: 'mustBeAString' }).min(1, { error: 'mustHaveAtLeastOneCharacter' }),
        phone: z.optional(
            z
                .string({ error: 'mustBeAString' })
                .regex(/^(?:(?:\\+33|0033)[1-9]\d{8}|0[1-9]\d{8})$/, {
                    error: 'invalidPhoneNumber',
                }),
        ),
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
