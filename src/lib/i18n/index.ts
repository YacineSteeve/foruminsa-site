import { SUPPORTED_LANGUAGES } from '@/lib/constants';

export type Language = typeof SUPPORTED_LANGUAGES[keyof typeof SUPPORTED_LANGUAGES];

export type Dictionary = Record<string, Record<string, string>>;

type Dictionaries = Record<Language, () => Promise<Dictionary>>;

// This module dynamically imports language dictionary files based on the supported languages.
const dictionaries: Dictionaries = Object.fromEntries(
    Object.values(SUPPORTED_LANGUAGES)
        .map((language) => [
            language,
            () => import(`./dictionaries/${language}.json`).then((module) => module.default)
        ]),
) as Dictionaries;

/**
 * Retrieves the dictionary for the specified language.
 *
 * @param language - The language for which to retrieve the dictionary.
 * @returns A promise that resolves to the dictionary object or null if not found.
 */
export const getDictionary = async (language: Language): Promise<Dictionary | null> => {
    if (!dictionaries[language]) {
        return null;
    }
    
    return dictionaries[language]();
};
