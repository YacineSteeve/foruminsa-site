import { serverEnv } from '@lib/config/env';
import { APP_URL } from '@lib/constants';
import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
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
