import { useCallback, useState } from 'react';
import { z, type ZodObject, type ZodRawShape } from 'zod/v4';

type Errors<S extends ZodRawShape> = Record<keyof S, string | Array<string>>;

export const useValidation = <T, S extends ZodRawShape>(schema: ZodObject<S>) => {
    const [errors, setErrors] = useState<Readonly<Errors<S>>>();

    const validate = useCallback(
        (data: T) => {
            const result = schema.safeParse(data);

            if (!result.success) {
                const formattedErrors = z.flattenError(result.error);

                const validationErrors = Object.keys(schema.shape).reduce((acc, key) => {
                    const fieldError =
                        formattedErrors.fieldErrors[
                            key as keyof typeof formattedErrors.fieldErrors
                        ];

                    if (fieldError) {
                        acc[key as keyof S] = Array.from(fieldError);
                    }

                    return acc;
                }, {} as Errors<S>);

                setErrors(validationErrors);

                return null;
            } else {
                setErrors(undefined);

                return result.data;
            }
        },
        [schema],
    );

    const clearErrors = useCallback(() => {
        setErrors(undefined);
    }, []);

    return {
        validationErrors: errors,
        validate,
        clearErrors,
    };
};
