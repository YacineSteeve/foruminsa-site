import { CompanyCard } from '@components/companies/CompanyCard';
import { Alert } from '@heroui/alert';
import { CompanyService } from '@lib/api-services';
import { getTranslations } from 'next-intl/server';
import { Fragment, type FunctionComponent } from 'react';

export const CompaniesList: FunctionComponent = async () => {
    const t = await getTranslations('CompaniesList');
    const companies = await CompanyService.getAllCompanies();
    
    if (!companies || companies.length === 0) {
        return (
            <Fragment>
                <span/>
                <Alert
                    color="danger"
                    title={t('cannotLoadCompanies')}
                />
                <span/>
            </Fragment>
        );
    }
    
    return (
        companies.length > 0 ? (
            companies.map((company) => (
                <li key={company.id}>
                    <CompanyCard company={company} />
                </li>
            ))
        ) : (
            <Fragment>
                <span/>
                <Alert
                    color="default"
                    title={t('noCompanies')}
                />
                <span/>
            </Fragment>
        )
    );
};
