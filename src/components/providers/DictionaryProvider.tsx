'use client';

import { createContext, type FunctionComponent, type PropsWithChildren } from 'react';
import type { Dictionary } from '@lib/i18n';

export const DictionaryContext = createContext<Dictionary | null>(null);

interface DictionaryProviderProps extends PropsWithChildren {
    dictionary: Dictionary | null;
}

const DictionaryProvider: FunctionComponent<DictionaryProviderProps> = ({ dictionary, children }) => {
    return <DictionaryContext value={dictionary}>{children}</DictionaryContext>;
};

export default DictionaryProvider;
