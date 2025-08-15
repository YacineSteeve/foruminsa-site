import { CompaniesFiltersButton } from '@components/companies/CompaniesFiltersButton';
import { CompaniesListWrapper } from '@components/companies/CompaniesListWrapper';
import { CompaniesPagination } from '@components/companies/CompaniesPagination';
import { CompanyCard } from '@components/companies/CompanyCard';
import { Alert } from '@heroui/alert';
import { CompanyService } from '@lib/api-services';
import type { CompaniesFilters } from '@lib/types/dtos';
import { getTranslations } from 'next-intl/server';
import type { FunctionComponent } from 'react';

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

    return paginatedCompanies.data.length > 0 ? (
        <div className="flex flex-col items-center md:items-end gap-y-16">
            <CompaniesListWrapper>
                {paginatedCompanies.data.map((company) => (
                    <li key={company.id}>
                        <CompanyCard company={company} />
                    </li>
                ))}
            </CompaniesListWrapper>
            <div className="flex items-center gap-4 md:gap-8">
                <CompaniesPagination
                    totalPages={Math.ceil(
                        paginatedCompanies.totalElements / paginatedCompanies.pageSize,
                    )}
                />
                <CompaniesFiltersButton />
            </div>
        </div>
    ) : (
        <CompaniesListWrapper>
            <span />
            <Alert
                color="default"
                title={t('noCompanies')}
            />
            <span />
        </CompaniesListWrapper>
    );
};
