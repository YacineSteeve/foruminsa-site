'use client';

import { Button } from '@heroui/button';
import { Form, type FormProps } from '@heroui/form';
import { Input, Textarea, type InputProps, type TextAreaProps } from '@heroui/input';
import { Select, SelectItem, type SelectProps } from '@heroui/select';
import { ContactService } from '@lib/api-services';
import { CONTACT_SUBJECTS, DEFAULT_LANGUAGE, URL_PARAMS } from '@lib/constants/core';
import { useMutation, useValidation } from '@lib/hooks';
import { type ContactData, contactDataSchema } from '@lib/types/dtos';
import { toast } from '@lib/utils';
import { type Locale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { type FunctionComponent, useCallback, useState } from 'react';
import { RiSendPlaneFill } from 'react-icons/ri';

interface ContactFormProps {
    locale?: Locale;
}

export const ContactForm: FunctionComponent<ContactFormProps> = ({ locale = DEFAULT_LANGUAGE }) => {
    const t = useTranslations('ContactForm');
    const searchParams = useSearchParams();
    const [data, setData] = useState<ContactData>({
        lang: locale,
        email: searchParams.get(URL_PARAMS.email) ?? undefined,
        subject: (searchParams.get(URL_PARAMS.subject) as ContactData['subject']) ?? undefined,
    } as ContactData);
    const { validate, validationErrors } = useValidation(contactDataSchema);

    const { trigger, isMutating } = useMutation(
        'send-contact-email',
        async (_, { arg: payload }: { arg: ContactData }) => {
            return ContactService.sendContactEmail(payload);
        },
    );

    const handleChange = useCallback<
        (
            key: keyof ContactData,
        ) => NonNullable<
            InputProps['onChange'] & TextAreaProps['onChange'] & SelectProps['onChange']
        >
    >(
        (key) => (event) => {
            setData((prevData) => ({
                ...prevData,
                [key]: event.target.value,
            }));
        },
        [],
    );

    const handleClear = useCallback<(key: keyof ContactData) => NonNullable<InputProps['onClear']>>(
        (key) => () => {
            setData((prevData) => ({
                ...prevData,
                [key]: undefined,
            }));
        },
        [],
    );

    const handleSubmit = useCallback<NonNullable<FormProps['onSubmit']>>(
        async (event) => {
            event.preventDefault();

            if (isMutating) {
                return;
            }

            const validatedData = validate(data);

            if (!validatedData) {
                return;
            }

            try {
                await trigger(validatedData);

                toast.success(t('successMessage'), {
                    description: t('successDescription'),
                });
            } catch (error) {
                console.error('Error submitting contact form:', error);
            }
        },
        [t, data, validate, trigger, isMutating],
    );

    return (
        <Form
            className="w-full space-y-8"
            aria-label={t('contactForm')}
            validationErrors={validationErrors}
            onSubmit={handleSubmit}
        >
            <div className="grid grid-cols-1 sm:max-lg:grid-cols-2 2xl:grid-cols-2 gap-4 md:gap-y-8 w-full">
                <Select
                    name="subject"
                    isRequired
                    isDisabled={isMutating}
                    label={t('subjectLabel')}
                    placeholder={t('subjectPlaceholder')}
                    selectedKeys={[data.subject]}
                    onChange={handleChange('subject')}
                    listboxProps={{
                        emptyContent: t('noOptions'),
                    }}
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
                    isReadOnly={isMutating}
                    label={t('emailLabel')}
                    value={data.email}
                    onChange={handleChange('email')}
                    onClear={handleClear('email')}
                />
                {data.subject === 'companies' && (
                    <Input
                        name="companyName"
                        isRequired
                        isClearable
                        className="sm:max-lg:col-span-2 2xl:col-span-2"
                        isReadOnly={isMutating}
                        label={t('companyNameLabel')}
                        value={data.companyName}
                        onChange={handleChange('companyName')}
                        onClear={handleClear('companyName')}
                    />
                )}
                <Input
                    name="name"
                    isRequired
                    isClearable
                    isReadOnly={isMutating}
                    label={t('nameLabel')}
                    value={data.name}
                    onChange={handleChange('name')}
                    onClear={handleClear('name')}
                />
                <Input
                    name="phone"
                    isClearable
                    type="tel"
                    isReadOnly={isMutating}
                    label={t('phoneLabel')}
                    value={data.phone}
                    onChange={handleChange('phone')}
                    onClear={handleClear('phone')}
                />
                <Textarea
                    name="message"
                    isRequired
                    isClearable
                    maxRows={10}
                    className="sm:max-lg:col-span-2 2xl:col-span-2"
                    isReadOnly={isMutating}
                    label={t('messageLabel')}
                    value={data.message}
                    onChange={handleChange('message')}
                    onClear={handleClear('message')}
                />
            </div>
            <Button
                type="submit"
                color="primary"
                variant="solid"
                className="ml-auto"
                isLoading={isMutating}
                startContent={isMutating ? null : <RiSendPlaneFill className="size-5" />}
            >
                {t('submitButtonLabel')}
            </Button>
        </Form>
    );
};
