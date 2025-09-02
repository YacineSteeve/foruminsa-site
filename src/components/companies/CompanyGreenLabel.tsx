import { Tooltip } from '@heroui/tooltip';
import { FORUM_LABEL_ICON } from '@lib/constants/ui';
import { getTranslations } from 'next-intl/server';
import type { FunctionComponent } from 'react';

export const CompanyGreenLabel: FunctionComponent = async () => {
    const t = await getTranslations('CompanyGreenLabel');

    return (
        <Tooltip content={t('description')}>
            <FORUM_LABEL_ICON className="absolute -top-4 -right-5 size-12 text-success -rotate-12 bg-transparent outline-none" />
        </Tooltip>
    );
};
