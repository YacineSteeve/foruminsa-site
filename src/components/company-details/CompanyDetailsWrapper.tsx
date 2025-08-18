import type { FunctionComponent, PropsWithChildren } from 'react';

export const CompanyDetailsWrapper: FunctionComponent<PropsWithChildren> = ({ children }) => {
    return <div className="w-full px-4 md:px-10 lg:px-20 xl:px-40 2xl:px-60 pb-40">{children}</div>;
};
