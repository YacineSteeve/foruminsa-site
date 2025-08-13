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

type ExtractProperties<T extends object | undefined> = { [K in keyof T]: T[K] };

export interface SendMailOptions<K extends keyof MailTemplateContext>
    extends Omit<BaseSendMailOptions, 'from' | 'to' | 'subject' | 'html'> {
    lang: Locale;
    from: NonNullable<BaseSendMailOptions['from']>;
    to: NonNullable<BaseSendMailOptions['to']>;
    subject: NonNullable<BaseSendMailOptions['subject']>;
    template: K; // Template name
    context?: ExtractProperties<MailTemplateContext[K]>; // Dynamic payload type based on the template name
}

export const sendMail = async <K extends keyof MailTemplateContext>(
    options: SendMailOptions<K>,
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
