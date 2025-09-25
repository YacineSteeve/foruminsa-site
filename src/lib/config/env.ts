import { z } from 'zod/v4';

const serverEnvSchema = z.object({
    NODE_ENV: z.enum(['development', 'production'], {
        error: 'NODE_ENV must be one of: development, production',
    }),
    MAIL_HOST: z
        .string({ error: 'MAIL_HOST must be a string' })
        .min(1, { error: 'MAIL_HOST must be at least 1 character long' }),
    MAIL_PORT: z.coerce
        .number({ error: 'MAIL_PORT must be a number' })
        .min(0, { error: 'MAIL_PORT value must be greater than 0' })
        .max(65535, { error: 'MAIL_PORT value must be less than or equal to 65535' }),
    MAIL_USER: z
        .string({ error: 'MAIL_USER must be a string' })
        .min(1, { error: 'MAIL_USER must be at least 1 character long' }),
    MAIL_PASSWORD: z
        .string({ error: 'MAIL_PASSWORD must be a string' })
        .min(1, { error: 'MAIL_PASSWORD must be at least 1 character long' }),
    MAIL_FROM: z
        .string({ error: 'MAIL_FROM must be a string' })
        .min(1, { error: 'MAIL_FROM must be at least 1 character long' }),
    MAIL_TO: z
        .string({ error: 'MAIL_TO must be a string' })
        .min(1, { error: 'MAIL_TO must be at least 1 character long' }),
    /* Add any other server-side environment variables here */
});

const clientEnvSchema = z.object({
    /* Add any other client-side environment variables here */
});

export type ServerEnvironmentVariables = z.infer<typeof serverEnvSchema>;

export type ClientEnvironmentVariables = z.infer<typeof clientEnvSchema>;

export const serverEnv: ServerEnvironmentVariables = serverEnvSchema.parse(process.env);

export const clientEnv: ClientEnvironmentVariables = clientEnvSchema.parse(process.env);
