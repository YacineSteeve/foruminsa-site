import type { FunctionComponent, PropsWithChildren } from 'react';

export const CompanyDetailsWrapper: FunctionComponent<PropsWithChildren> = ({ children }) => {
    return (
        <div>
            {children}
        </div>
    );
};
