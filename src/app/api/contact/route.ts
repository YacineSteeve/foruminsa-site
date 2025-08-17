import { serverEnv } from '@lib/config/env';
import { withMiddlewares } from '@lib/middlewares';
import type { ContactData } from '@lib/types/dtos';
import { sendMail } from '@lib/mailing';
import { getMessages } from 'next-intl/server';
import { NextResponse } from 'next/server';
import { ApiError } from '@lib/utils';
import type { Messages } from 'use-intl';

const POST = withMiddlewares(
    async (request) => {
        const data = (await request.json()) as ContactData;
        const messages = await getMessages({ locale: data.lang });

        const t = (key: keyof Messages['ContactForm']) => messages['ContactForm'][key] ?? key;

        try {
            const contactMailInfo = await sendMail({
                lang: 'fr',
                from: {
                    name: 'Site Web Forum By INSA',
                    address: serverEnv.MAIL_FROM,
                },
                to: serverEnv.MAIL_TO,
                subject: `[Contact] ${t(data.subject)}`,
                template: 'contact-message',
                context: {
                    subject: t(data.subject),
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    companyName: data.companyName,
                    message: data.message,
                },
            });

            if (!contactMailInfo.accepted.includes(serverEnv.MAIL_TO)) {
                return new ApiError(
                    'MESSAGE_NOT_DELIVERED',
                    500,
                    new Error(`Email not received by the recipient "${serverEnv.MAIL_TO}"`),
                ).asNextResponse();
            }

            const confirmationMailInfos = await sendMail({
                lang: data.lang,
                from: {
                    name: 'Forum By INSA',
                    address: serverEnv.MAIL_FROM,
                },
                to: data.email,
                subject: t('confirmationMessage'),
                template: 'contact-confirmation',
                context: {
                    name: data.name,
                    subject: t(data.subject),
                },
            });

            if (!confirmationMailInfos.accepted.includes(data.email)) {
                console.warn(`Email not received by the recipient "${data.email}"`);
            }

            return NextResponse.json({}, { status: 200 });
        } catch (error) {
            return new ApiError(
                'INTERNAL_SERVER_ERROR',
                500,
                error instanceof Error
                    ? error
                    : new Error('An error occurred while sending the email.', {
                          cause: error,
                      }),
            ).asNextResponse();
        }
    },
    {
        cors: {
            method: 'POST',
        },
        rateLimit: true,
    },
);

export { POST };
