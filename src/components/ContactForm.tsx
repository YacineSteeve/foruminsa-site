'use client';

import { Button } from '@heroui/button';
import { Form } from '@heroui/form';
import { Input, Textarea } from '@heroui/input';
import { Select, SelectItem } from '@heroui/select';
import { ContactService } from '@lib/api-services/contact';
import { CONTACT_SUBJECTS, URL_PARAMS } from '@lib/constants';
import { useMutation, useValidation } from '@lib/hooks';
import { type ContactData, contactDataSchema } from '@lib/types';
import { toast } from '@lib/utils';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import {
    type ChangeEventHandler,
    type FormEventHandler,
    type FunctionComponent,
    useCallback,
    useState,
} from 'react';
import { RiSendPlaneFill } from 'react-icons/ri';

export const ContactForm: FunctionComponent = () => {
    const t = useTranslations('ContactForm');
    const searchParams = useSearchParams();
    const [data, setData] = useState<ContactData>({} as ContactData);
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
        ) => ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    >(
        (key) => (event) => {
            setData((prevData) => ({
                ...prevData,
                [key]: event.target.value,
            }));
        },
        [],
    );

    const handleClear = useCallback<(key: keyof ContactData) => VoidFunction>(
        (key) => () => {
            setData((prevData) => ({
                ...prevData,
                [key]: '',
            }));
        },
        [],
    );

    const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
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
                    defaultValue={searchParams.get(URL_PARAMS.email) ?? undefined}
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
                className="text-white ml-auto"
                isLoading={isMutating}
                startContent={isMutating ? null : <RiSendPlaneFill className="size-5" />}
            >
                {t('submitButtonLabel')}
            </Button>
        </Form>
    );
};
