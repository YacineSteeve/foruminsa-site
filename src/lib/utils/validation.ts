import type { Messages } from 'use-intl';
import { z, type ZodObject, type ZodRawShape } from 'zod/v4';

export type ValidationErrorMessage = keyof Messages['ValidationErrors'];

export type ValidationErrors<S extends ZodRawShape> = Record<keyof S, Array<string>>;

export const validateData = <D, S extends ZodRawShape>(
    data: D,
    schema: ZodObject<S>,
): [z.core.output<ZodObject<S>>, null] | [null, ValidationErrors<S>] => {
    const result = schema.safeParse(data);

    if (!result.success) {
        const formattedErrors = z.flattenError(result.error);

        const validationErrors = Object.keys(schema.shape).reduce((acc, key) => {
            const fieldError =
                formattedErrors.fieldErrors[key as keyof typeof formattedErrors.fieldErrors];

            if (fieldError) {
                acc[key as keyof S] = fieldError as Array<ValidationErrorMessage>;
            }

            return acc;
        }, {} as ValidationErrors<S>);

        return [null, validationErrors];
    } else {
        return [result.data, null];
    }
};
