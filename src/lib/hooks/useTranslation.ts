import { DictionaryContext } from '@components/providers/DictionaryProvider';
import { useCallback, useContext } from 'react';
import type { TranslationGetter } from '@lib/types';

export const useTranslation = (args: { scope: string }): TranslationGetter => {
    const dictionary = useContext(DictionaryContext);
    
    const translationGetter = useCallback((key: string): string => {
        const scopedDictionary = dictionary?.[args.scope];
        
        if (!scopedDictionary || !scopedDictionary[key]) {
            return key;
        }
        
        return scopedDictionary[key];
    }, [dictionary, args]);
    
    return {
        get: translationGetter
    };
};
