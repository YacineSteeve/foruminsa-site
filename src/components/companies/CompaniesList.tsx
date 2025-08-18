import { CompaniesFiltersButton } from '@components/companies/CompaniesFiltersButton';
import { CompaniesListWrapper } from '@components/companies/CompaniesListWrapper';
import { CompaniesPagination } from '@components/companies/CompaniesPagination';
import { CompanyCard } from '@components/companies/CompanyCard';
import { Alert } from '@heroui/alert';
import { CompanyService } from '@lib/api-services';
import type { CompaniesFilters } from '@lib/types/dtos';
import { getTranslations } from 'next-intl/server';
import { Fragment, type FunctionComponent } from 'react';
import { FaAward } from 'react-icons/fa6';

interface CompaniesListProps {
    filters: CompaniesFilters;
}

export const CompaniesList: FunctionComponent<CompaniesListProps> = async ({ filters }) => {
    const t = await getTranslations('CompaniesList');
    const paginatedCompanies = await CompanyService.getAllCompanies(filters);

    if (!paginatedCompanies) {
        return (
            <CompaniesListWrapper>
                <Alert
                    color="danger"
                    title={t('cannotLoadCompanies')}
                    className="md:col-span-2 xl:col-span-3"
                />
            </CompaniesListWrapper>
        );
    }

    const companiesCount = paginatedCompanies.data.length;
    const noExistingCompanyAtAll =
        Object.values(filters).every((value) => value === undefined) && companiesCount === 0;

    return (
        <div className="flex flex-col items-center gap-y-16 w-full">
            <CompaniesListWrapper>
                {companiesCount > 0 ? (
                    <Fragment>
                        <div className="flex justify-end items-center max-md:w-full md:col-span-2 xl:col-span-3">
                            <CompaniesFiltersButton popupPlacement="left" />
                        </div>
                        {paginatedCompanies.data.map((company) => (
                            <li key={company.id}>
                                <CompanyCard company={company} />
                            </li>
                        ))}
                    </Fragment>
                ) : (
                    <div className="md:col-span-2 xl:col-span-3">
                        <Alert
                            color="default"
                            title={t('noCompanies')}
                            className="w-fit mx-auto"
                        />
                    </div>
                )}
                {!noExistingCompanyAtAll && (
                    <Fragment>
                        <div className="flex items-center justify-center sm:justify-end gap-4 md:gap-8 max-md:w-full md:col-span-2 xl:col-span-3">
                            <CompaniesPagination
                                totalPages={Math.ceil(
                                    paginatedCompanies.totalElements / paginatedCompanies.pageSize,
                                )}
                            />
                            <CompaniesFiltersButton popupPlacement="left-end" />
                        </div>
                    </Fragment>
                )}
            </CompaniesListWrapper>
            <div className="flex max-md:w-full md:col-span-2 xl:col-span-3 px-4 lg:max-xl:px-20 3xl:px-40">
                <div className="flex items-cente max-sm:justify-center gap-4 w-full sm:w-5/6 md:w-4/5 lg:w-3/4 xl:w-2/3 2xl:w-1/2 border border-default/75 p-4 rounded-lg">
                    <FaAward className="size-8 text-success" />
                    <p className="text-base flex-1 leading-relaxed">
                        {t('companyGreenLabelDescription')}
                    </p>
                </div>
            </div>
        </div>
    );
};
