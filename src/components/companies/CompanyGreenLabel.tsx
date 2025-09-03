import { Tooltip } from '@heroui/tooltip';
import { FORUM_LABEL_ICON } from '@lib/constants/ui';
import type { FunctionComponent } from 'react';

interface CompanyGreenLabelProps {
    tooltip: string;
}

export const CompanyGreenLabel: FunctionComponent<CompanyGreenLabelProps> = ({ tooltip }) => {
    return (
        <Tooltip content={tooltip}>
            <FORUM_LABEL_ICON className="absolute -top-4 -right-5 size-12 text-success -rotate-12 bg-transparent outline-none" />
        </Tooltip>
    );
};
