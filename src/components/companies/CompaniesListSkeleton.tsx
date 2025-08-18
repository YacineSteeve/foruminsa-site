import { CompaniesListWrapper } from '@components/companies/CompaniesListWrapper';
import { Card } from '@heroui/card';
import { Skeleton } from '@heroui/skeleton';
import type { FunctionComponent } from 'react';

interface CompaniesListSkeletonProps {
    count: number;
}

export const CompaniesListSkeleton: FunctionComponent<CompaniesListSkeletonProps> = ({ count }) => {
    return (
        <CompaniesListWrapper>
            {Array.from({ length: count }).map((_, index) => (
                <li key={index}>
                    <Card
                        shadow="sm"
                        className="w-84 h-56 p-4 space-y-4"
                    >
                        <div className="flex gap-4 w-full">
                            <Skeleton className="size-24 rounded-lg" />
                            <div className="flex-1 space-y-2">
                                <Skeleton className="h-6 flex-1 rounded-lg" />
                                <div className="flex flex-wrap gap-x-2 gap-y-1 w-full">
                                    <Skeleton className="w-1/3 h-6 rounded-full" />
                                    <Skeleton className="w-1/3 h-6 rounded-full" />
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="w-full h-4 rounded-lg" />
                            <Skeleton className="w-5/6 h-4 rounded-lg" />
                            <Skeleton className="w-4/5 h-4 rounded-lg" />
                        </div>
                    </Card>
                </li>
            ))}
        </CompaniesListWrapper>
    );
};
