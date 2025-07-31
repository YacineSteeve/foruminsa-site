import { z } from 'zod';

const serverEnvSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test'], {
        error: 'NODE_ENV must be one of: development, production, test',
    }),
    MAIL_HOST: z.string(),
    MAIL_PORT: z.coerce.number(),
    MAIL_USER: z.string().min(1, 'MAIL_USER must be at least 1 character long'),
    MAIL_PASSWORD: z.string().min(1, 'MAIL_PASSWORD must be at least 1 character long'),
    MAIL_FROM: z.string().min(1, 'MAIL_FROM must be at least 1 character long'),
    MAIL_TO: z.string().min(1, 'MAIL_TO must be at least 1 character long'),
    /* Add any other server-side environment variables here */
});

export type ServerEnvironmentVariables = z.infer<typeof serverEnvSchema>;

const serverEnv: ServerEnvironmentVariables = serverEnvSchema.parse(process.env);

const clientEnvSchema = z.object({
    /* Add any other client-side environment variables here */
});

export type ClientEnvironmentVariables = z.infer<typeof clientEnvSchema>;

const clientEnv: ClientEnvironmentVariables = clientEnvSchema.parse(process.env);

export { serverEnv, clientEnv };
