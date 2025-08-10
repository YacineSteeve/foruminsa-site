import { CompaniesStatsItem } from '@components/companies/CompaniesStatsItem';
import { Divider } from '@heroui/divider';
import { Spinner } from '@heroui/spinner';
import { getTranslations } from 'next-intl/server';
import { Fragment, type FunctionComponent } from 'react';

export const CompaniesStatsSkeleton: FunctionComponent = async () => {
    const t = await getTranslations('CompaniesStats');
    
    return (
        <Fragment>
            <CompaniesStatsItem
                title={t('companiesCount')}
                value={<Spinner color="white" variant="dots" size="lg"/>}
            />
            <Divider orientation="vertical"/>
            <CompaniesStatsItem
                title={t('sectorsCount')}
                value={<Spinner color="white" variant="dots" size="lg"/>}
            />
            <Divider orientation="vertical"/>
            <CompaniesStatsItem
                title={t('specialitiesCount')}
                value={<Spinner color="white" variant="dots" size="lg"/>}
            />
        </Fragment>
    );
}
