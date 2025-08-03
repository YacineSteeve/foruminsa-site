import { serverEnv } from '@lib/config/env';
import { withMiddlewares } from '@lib/middlewares';
import type { ContactData } from '@lib/types';
import { transporter } from '@lib/mailing/transporter';
import { getTranslations } from 'next-intl/server';
import { NextRequest, NextResponse } from 'next/server';
import { ApiError } from '@lib/utils';

const POST = withMiddlewares(
    async (request: NextRequest) => {
        const t = await getTranslations('ContactForm');
        const data = (await request.json()) as ContactData;

        try {
            const mockContent = [
                `${data.subject === 'companies' ? `Nom de l'entreprise: ${data.companyName ?? 'N/A'}` : ''}`,
                `Nom: ${data.name}`,
                `Email: ${data.email}`,
                `Téléphone: ${data.phone}`,
                '',
                'Message:',
                `${data.message}`,
            ];

            const contactMailInfo = await transporter.sendMail({
                from: {
                    name: 'Site Web Forum By INSA',
                    address: serverEnv.MAIL_FROM,
                },
                to: serverEnv.MAIL_TO,
                subject: `[Contact] ${t(data.subject)}`,
                text: mockContent.join('\n'),
                html: `<p>${mockContent.join('<br/>')}</p>`,
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
                    : new Error('An unknown error occurred while sending the email.', {
                          cause: error,
                      }).stack,
            ).asNextResponse();
        }
    },
    {
        cors: {
            method: 'POST',
        },
        rateLimiting: true,
    },
);

export { POST };
