import {
    type ComponentProps,
    type FunctionComponent,
    type PropsWithChildren,
    Suspense,
} from 'react';
import { Loader } from '@components/ui/Loader';

interface SuspenseBoundaryProps extends PropsWithChildren {
    fallback?: ComponentProps<typeof Suspense>['fallback'];
}

export const SuspenseBoundary: FunctionComponent<SuspenseBoundaryProps> = ({
    fallback,
    children,
}) => {
    return (
        <Suspense
            fallback={
                fallback === undefined ? (
                    <div className="flex-center size-full">
                        <Loader />
                    </div>
                ) : (
                    fallback
                )
            }
        >
            {children ?? null}
        </Suspense>
    );
};
