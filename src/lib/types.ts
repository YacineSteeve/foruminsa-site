import { CONTACT_SUBJECTS } from '@lib/constants';
import { z } from 'zod/v4';

export const contactDataSchema = z
    .object({
        subject: z.union(CONTACT_SUBJECTS.map((subject) => z.literal(subject))),
        email: z.email(),
        companyName: z.optional(z.string().min(1)),
        name: z.string().min(1),
        phone: z.string().regex(/^(?:(?:\\+33|0033)[1-9]\d{8}|0[1-9]\d{8})$/),
        message: z.string().min(1),
    })
    .refine(
        (data) => {
            if (data.subject === 'companies') {
                return data.companyName && data.companyName.length >= 1;
            }

            return true;
        },
        {
            path: ['companyName'],
        },
    )
    .refine(
        (data) => {
            if (data.subject === 'solidarityFund') {
                return data.email.endsWith('@insa-toulouse.fr');
            }

            return true;
        },
        {
            path: ['email'],
        },
    );

export type ContactData = z.infer<typeof contactDataSchema>;
