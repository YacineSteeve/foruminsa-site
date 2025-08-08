import { transport } from '@lib/mailing/transport';
import type { Locale } from 'next-intl';
import path from 'node:path';
import type { SendMailOptions as BaseSendMailOptions } from 'nodemailer';

type MailTemplateContext = {
    'contact-confirmation': {
        name: string;
        subject: string;
    };
    'contact-message': {
        name: string;
        subject: string;
        email: string;
        message: string;
        phone?: string;
        companyName?: string;
    };
};

type ExtractProperties<T extends object | undefined> = { [P in keyof T]: T[P] };

export interface SendMailOptions<T extends keyof MailTemplateContext>
    extends Omit<BaseSendMailOptions, 'from' | 'to' | 'subject' | 'html'> {
    lang: Locale;
    from: NonNullable<BaseSendMailOptions['from']>;
    to: NonNullable<BaseSendMailOptions['to']>;
    subject: NonNullable<BaseSendMailOptions['subject']>;
    template: T; // Template name
    context?: ExtractProperties<MailTemplateContext[T]>; // Dynamic payload type based on the template name
}

export const sendMail = async <T extends keyof MailTemplateContext>(
    options: SendMailOptions<T>,
): ReturnType<typeof transport.sendMail> => {
    const { lang, subject, attachments, context, ...otherOptions } = options;

    return transport.sendMail({
        ...otherOptions,
        subject,
        attachments: [
            ...(attachments || []),
            {
                cid: 'logo',
                filename: 'logo.png',
                path: path.join('public', 'logo_line.png'),
            },
        ],
        context: {
            ...context,
            lang,
            title: subject,
        },
    } as BaseSendMailOptions);
};
