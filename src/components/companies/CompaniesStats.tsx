import { CompaniesStatsItem } from '@components/companies/CompaniesStatsItem';
import { Alert } from '@heroui/alert';
import { Divider } from '@heroui/divider';
import { CompanyService } from '@lib/api-services';
import { getTranslations } from 'next-intl/server';
import { Fragment, type FunctionComponent } from 'react';

export const CompaniesStats: FunctionComponent = async () => {
    const t = await getTranslations('CompaniesStats');
    const companiesStats = await CompanyService.getCompaniesStats();
    
    if (!companiesStats) {
        return (
            <Alert
                color="danger"
                title={t('cannotLoadStats')}
            />
        );
    }
    
    return (
        <Fragment>
            <CompaniesStatsItem
                title={t('companiesCount')}
                value={companiesStats.companiesCount}
            />
            <Divider orientation="vertical"/>
            <CompaniesStatsItem
                title={t('sectorsCount')}
                value={companiesStats.sectorsCount}
            />
            <Divider orientation="vertical"/>
            <CompaniesStatsItem
                title={t('specialitiesCount')}
                value={companiesStats.specialitiesCount}
            />
        </Fragment>
    );
};
