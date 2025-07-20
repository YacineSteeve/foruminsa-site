import 'server-only';

import { getDictionary, type Language } from '@/lib/i18n';
import type { TranslationGetter } from '@lib/types';

export const getTranslation = async (args: { scope: string, language: Language }): Promise<TranslationGetter> => {
    const dictionary = await getDictionary(args.language);
    
    const translationGetter = (key: string): string => {
        const scopedDictionary = dictionary?.[args.scope];
        
        if (!scopedDictionary) {
            return key;
        }
        
        return scopedDictionary[key] || key;
    };
    
    return {
        get: translationGetter
    };
};
