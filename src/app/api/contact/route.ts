import { serverEnv } from '@lib/config/env';
import { APP_URL } from '@lib/constants';
import type { ContactData } from '@lib/types';
import { ApiError } from '@lib/utils';
import { getTranslations } from 'next-intl/server';
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
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

export async function POST(request: NextRequest) {
    const t = await getTranslations('ContactForm');
    const data = (await request.json()) as ContactData;

    try {
        const contactMailInfo = await transporter.sendMail({
            from: {
                name: 'Site Web Forum By INSA',
                address: serverEnv.MAIL_FROM,
            },
            to: serverEnv.MAIL_TO,
            subject: `[Contact] ${t(data.subject)}`,
            text: data.message,
            html: `<p>${data.message}</p>`,
        });

        if (!contactMailInfo.accepted.includes(serverEnv.MAIL_TO)) {
            return new ApiError(
                'MESSAGE_NOT_DELIVERED',
                500,
                `Email not received by the recipient "${serverEnv.MAIL_TO}"`,
            ).asNextResponse();
        }

        const confirmationMailInfos = await transporter.sendMail({
            from: {
                name: 'Forum By INSA',
                address: serverEnv.MAIL_FROM,
            },
            to: data.email,
            subject: t('confirmationMessage'),
            text: 'Sent',
            html: `<p>Sent</p>`,
        });

        if (!confirmationMailInfos.accepted.includes(data.email)) {
            console.warn(`Email not received by the recipient "${data.email}"`);
        }

        return NextResponse.json({}, { status: 200 });
    } catch (error) {
        return new ApiError(
            'SOMETHING_WENT_WRONG',
            500,
            error instanceof Error
                ? error.stack
                : new Error('An unknown error occurred while sending the email.', { cause: error })
                      .stack,
        ).asNextResponse();
    }
}
