import type { FunctionComponent } from 'react';
import { RiLoader4Fill } from 'react-icons/ri';

export const Loader: FunctionComponent = () => {
    return <RiLoader4Fill className="size-14 text-primary animate-spin"/>;
};
