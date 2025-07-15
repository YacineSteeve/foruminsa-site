import { type FunctionComponent, type PropsWithChildren, type ReactNode, Suspense } from 'react';
import { Loader } from '@components/ui/Loader';

interface SuspenseBoundaryProps
    extends PropsWithChildren<{
        fallback?: ReactNode | null;
    }> {
}

export const SuspenseBoundary: FunctionComponent<SuspenseBoundaryProps> = ({ fallback, children }) => {
    return (
        <Suspense
            fallback={
                fallback === undefined && (
                    <div className="flex-center size-full">
                        <Loader/>
                    </div>
                )
            }
        >
            {children ?? null}
        </Suspense>
    );
};
