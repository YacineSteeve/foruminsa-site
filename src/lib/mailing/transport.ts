import { serverEnv } from '@lib/config/env';
import { APP_URL } from '@lib/constants';
import { createTransport } from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import path from 'node:path';
import process from 'node:process';

const transport = createTransport({
    name: new URL(APP_URL).hostname,
    host: serverEnv.MAIL_HOST,
    port: serverEnv.MAIL_PORT,
    auth: {
        user: serverEnv.MAIL_USER,
        pass: serverEnv.MAIL_PASSWORD,
    },
    secure: serverEnv.MAIL_PORT === 465, // true for 465, false for other ports
    logger: true,
});

const templatesDir = path.join(process.cwd(), 'src', 'lib', 'mailing', 'templates');

const partialsDir = path.join(templatesDir, 'partials');

transport.use(
    'compile',
    hbs({
        viewEngine: {
            extname: '.hbs',
            partialsDir: partialsDir,
            defaultLayout: undefined, // Important to tell nodemailer not to use a default layout
            helpers: {
                eq(a: unknown, b: unknown): boolean {
                    return a === b;
                },
            },
        },
        viewPath: templatesDir,
        extName: '.hbs',
    }),
);

export { transport };
