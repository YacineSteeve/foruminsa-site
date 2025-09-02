import type { FunctionComponent } from 'react';
import { LuLoaderCircle } from 'react-icons/lu';

export const Loader: FunctionComponent = () => {
    return <LuLoaderCircle className="size-12 text-primary animate-spin" />;
};
