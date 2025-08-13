import type { FunctionComponent, PropsWithChildren } from 'react';

export const CompaniesListWrapper: FunctionComponent<PropsWithChildren> = ({ children }) => {
    return (
        <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-12">
            {children}
        </ul>
    );
};
