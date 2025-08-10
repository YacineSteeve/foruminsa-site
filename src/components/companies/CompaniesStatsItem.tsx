import type { FunctionComponent, ReactNode } from 'react';

interface CompaniesStatsItemProps {
    title: string;
    value: ReactNode;
}

export const CompaniesStatsItem: FunctionComponent<CompaniesStatsItemProps> = ({ title, value }) => {
    return (
        <div className="flex flex-col items-center gap-4">
            <p className="text-6xl font-semibold text-gray-300 md:text-gray-100">{value}</p>
            <p className="text-2xl max-md:font-semibold text-primary text-center">{title}</p>
        </div>
    );
};
