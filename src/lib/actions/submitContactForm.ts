'use server';

import { ContactService } from '@lib/services';
import { type ContactData, contactDataSchema } from '@lib/types/dtos';
import { validateData, type ValidationErrors } from '@lib/utils';

export type SubmitContactFormState = {
    success: boolean;
    data: Pick<ContactData, 'lang'> & Partial<Omit<ContactData, 'lang'>>;
    validationErrors?: ValidationErrors<typeof contactDataSchema.shape>;
    error?: unknown;
};

export const submitContactForm = async (
    initialState: SubmitContactFormState,
    formData: FormData,
) => {
    const formDataValues = Object.fromEntries(
        Object.entries(Object.fromEntries(formData.entries())).map(([key, value]) => [
            key,
            value.toString(),
        ]),
    );

    const data = {
        lang: initialState.data.lang,
        subject: formDataValues.subject || undefined,
        email: formDataValues.email || undefined,
        name: formDataValues.name || undefined,
        message: formDataValues.message || undefined,
        companyName: formDataValues.companyName || undefined,
        phone: formDataValues.phone || undefined,
    } as SubmitContactFormState['data'];

    const [validatedData, validationErrors] = validateData(data, contactDataSchema);

    if (validationErrors) {
        return { data, validationErrors, success: false };
    }

    try {
        await ContactService.sendContactEmail(validatedData);

        return { data, success: true };
    } catch (error) {
        return { data, error, success: false };
    }
};
