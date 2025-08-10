import { Card } from '@heroui/card';
import { Skeleton } from '@heroui/skeleton';
import type { FunctionComponent } from 'react';

interface CompaniesListSkeletonProps {
    count: number;
}

export const CompaniesListSkeleton: FunctionComponent<CompaniesListSkeletonProps> = ({ count }) => {
    return (
        Array.from({ length: count }).map((_, index) => (
            <li key={index}>
                <Card
                    shadow="sm"
                    className="w-80 h-52 p-4 space-y-4"
                >
                    <div className="flex items-center gap-4 w-full">
                        <Skeleton className="size-20 rounded-lg" />
                        <Skeleton className="h-6 flex-1 rounded-lg" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="w-full h-4 rounded-lg"/>
                        <Skeleton className="w-5/6 h-4 rounded-lg"/>
                        <Skeleton className="w-4/5 h-4 rounded-lg"/>
                    </div>
                </Card>
            </li>
        ))
    );
};
