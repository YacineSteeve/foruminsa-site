import { cn } from '@lib/utils';
import type { FunctionComponent, PropsWithChildren } from 'react';

interface CompanyDetailsSectionProps extends PropsWithChildren {
    title: string;
    expand?: boolean;
}

export const CompanyDetailsSection: FunctionComponent<CompanyDetailsSectionProps> = ({
    title,
    expand = false,
    children,
}) => {
    return (
        <section
            className={cn(
                'w-full max-w-full p-4 md:p-6 space-y-4 bg-white rounded-2xl shadow-sm md:shadow-md',
                expand && 'lg:col-span-2',
            )}
        >
            <h3>{title}</h3>
            {children}
        </section>
    );
};
