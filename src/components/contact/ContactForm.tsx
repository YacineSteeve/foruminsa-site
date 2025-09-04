'use client';

import { Button } from '@heroui/button';
import { Form } from '@heroui/form';
import { Input, Textarea } from '@heroui/input';
import { Select, SelectItem, type SelectProps } from '@heroui/select';
import { submitContactForm } from '@lib/actions/submitContactForm';
import { CONTACT_SUBJECTS, URL_PARAMS } from '@lib/constants/core';
import type { ContactData } from '@lib/types/dtos';
import { type ApiErrorMessage, toast, type ValidationErrorMessage } from '@lib/utils';
import { type Locale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import {
    type FunctionComponent,
    useActionState,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { RiSendPlaneFill } from 'react-icons/ri';

interface ContactFormProps {
    locale: Locale;
}

export const ContactForm: FunctionComponent<ContactFormProps> = ({ locale }) => {
    const t = useTranslations('ContactForm');
    const tApiErrors = useTranslations('ApiErrors');
    const tValidationErrors = useTranslations('ValidationErrors');
    const searchParams = useSearchParams();
    const [subject, setSubject] = useState<ContactData['subject']>();
    const [{ data, validationErrors, error, success }, formAction, isPending] = useActionState(
        submitContactForm,
        {
            data: {
                lang: locale,
                email: searchParams.get(URL_PARAMS.email) ?? undefined,
                subject:
                    (searchParams.get(URL_PARAMS.subject) as ContactData['subject']) ?? undefined,
            },
            validationErrors: undefined,
            error: undefined,
            success: false,
        },
    );

    const handleSelectChange = useCallback<NonNullable<SelectProps['onChange']>>((event) => {
        setSubject(event.target.value as ContactData['subject']);
    }, []);

    useEffect(() => {
        if (success) {
            toast.success(t('successMessage'), {
                description: t('successDescription'),
            });
        } else if (error) {
            console.error('Error submitting contact form');
            console.error(error);

            if (error instanceof Error) {
                toast.error(tApiErrors(error.message as ApiErrorMessage));
            }
        }
    }, [t, tApiErrors, success, error]);

    const translatedValidationErrors = useMemo(() => {
        if (!validationErrors) {
            return undefined;
        }

        return Object.fromEntries(
            Object.entries(validationErrors).map(([key, value]) => [
                key,
                value.map((error) => tValidationErrors(error as ValidationErrorMessage)),
            ]),
        );
    }, [tValidationErrors, validationErrors]);

    return (
        <Form
            className="w-full space-y-8"
            aria-label={t('contactForm')}
            action={formAction}
            validationErrors={translatedValidationErrors}
        >
            <div className="grid grid-cols-1 sm:max-lg:grid-cols-2 2xl:grid-cols-2 gap-4 md:gap-y-8 w-full">
                <Select
                    name="subject"
                    isRequired
                    isDisabled={isPending}
                    label={t('subjectLabel')}
                    placeholder={t('subjectPlaceholder')}
                    listboxProps={{
                        emptyContent: t('noOptions'),
                    }}
                    defaultSelectedKeys={data.subject ? [data.subject] : []}
                    selectedKeys={subject ? [subject] : data.subject ? [data.subject] : []}
                    onChange={handleSelectChange}
                >
                    {CONTACT_SUBJECTS.map((subject) => (
                        <SelectItem key={subject}>{t(subject)}</SelectItem>
                    ))}
                </Select>
                <Input
                    name="email"
                    isRequired
                    isClearable
                    type="email"
                    isReadOnly={isPending}
                    label={t('emailLabel')}
                    defaultValue={data.email}
                />
                {subject === 'companies' && (
                    <Input
                        name="companyName"
                        isRequired
                        isClearable
                        className="sm:max-lg:col-span-2 2xl:col-span-2"
                        isReadOnly={isPending}
                        label={t('companyNameLabel')}
                        defaultValue={data.companyName}
                    />
                )}
                <Input
                    name="name"
                    isRequired
                    isClearable
                    isReadOnly={isPending}
                    label={t('nameLabel')}
                    defaultValue={data.name}
                />
                <Input
                    name="phone"
                    isClearable
                    type="tel"
                    isReadOnly={isPending}
                    label={t('phoneLabel')}
                    defaultValue={data.phone}
                />
                <Textarea
                    name="message"
                    isRequired
                    isClearable
                    maxRows={10}
                    className="sm:max-lg:col-span-2 2xl:col-span-2"
                    isReadOnly={isPending}
                    label={t('messageLabel')}
                    defaultValue={data.message}
                />
            </div>
            <Button
                type="submit"
                color="primary"
                variant="solid"
                className="ml-auto"
                isLoading={isPending}
                startContent={isPending ? null : <RiSendPlaneFill className="size-5" />}
            >
                {t('submitButtonLabel')}
            </Button>
        </Form>
    );
};
