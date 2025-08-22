import { Tooltip } from '@heroui/tooltip';
import { getTranslations } from 'next-intl/server';
import type { FunctionComponent } from 'react';
import { FaAward } from 'react-icons/fa6';

export const CompanyGreenLabel: FunctionComponent = async () => {
    const t = await getTranslations('CompanyGreenLabel');

    return (
        <Tooltip content={t('description')}>
            <FaAward className="absolute -top-4 -right-5 size-12 text-success -rotate-12 bg-white outline-none" />
        </Tooltip>
    );
};
