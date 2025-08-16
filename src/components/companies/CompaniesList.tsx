import { CompaniesFiltersButton } from '@components/companies/CompaniesFiltersButton';
import { CompaniesListWrapper } from '@components/companies/CompaniesListWrapper';
import { CompaniesPagination } from '@components/companies/CompaniesPagination';
import { CompanyCard } from '@components/companies/CompanyCard';
import { Alert } from '@heroui/alert';
import { CompanyService } from '@lib/api-services';
import type { CompaniesFilters } from '@lib/types/dtos';
import { getTranslations } from 'next-intl/server';
import { Fragment, type FunctionComponent } from 'react';

interface CompaniesListProps {
    filters: CompaniesFilters;
}

export const CompaniesList: FunctionComponent<CompaniesListProps> = async ({ filters }) => {
    const t = await getTranslations('CompaniesList');
    const paginatedCompanies = await CompanyService.getAllCompanies(filters);

    if (!paginatedCompanies) {
        return (
            <CompaniesListWrapper>
                <span />
                <Alert
                    color="danger"
                    title={t('cannotLoadCompanies')}
                />
                <span />
            </CompaniesListWrapper>
        );
    }

    const companiesCount = paginatedCompanies.data.length;
    const noExistingCompanyAtAll =
        Object.values(filters).every((value) => value === undefined) && companiesCount === 0;

    return (
        <div className="flex flex-col items-center md:items-end gap-y-16">
            <CompaniesListWrapper>
                {companiesCount > 0 ? (
                    paginatedCompanies.data.map((company) => (
                        <li key={company.id}>
                            <CompanyCard company={company} />
                        </li>
                    ))
                ) : (
                    <Fragment>
                        <span />
                        <Alert
                            color="default"
                            title={t('noCompanies')}
                        />
                        <span />
                    </Fragment>
                )}
            </CompaniesListWrapper>
            {!noExistingCompanyAtAll && (
                <div className="flex items-center gap-4 md:gap-8">
                    <CompaniesPagination
                        totalPages={Math.ceil(
                            paginatedCompanies.totalElements / paginatedCompanies.pageSize,
                        )}
                    />
                    <CompaniesFiltersButton />
                </div>
            )}
        </div>
    );
};
