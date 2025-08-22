import { CompanyDetailsSkeleton } from '@components/company-details/CompanyDetailsSkeleton';
import { CompanyDetailsWrapper } from '@components/company-details/CompanyDetailsWrapper';
import { SuspenseBoundary } from '@components/ui/SuspenseBoundary';
import { Alert } from '@heroui/alert';
import { CompanyService } from '@lib/api-services';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import type { FunctionComponent } from 'react';

interface CompanyDetailsPageProps {
    params: Promise<{
        companySlug: string;
        locale: string;
    }>;
}

export async function generateMetadata({ params }: CompanyDetailsPageProps): Promise<Metadata> {
    const { companySlug, locale } = await params;
    const company = await CompanyService.getCompanyByKey(companySlug);

    if (!company) {
        return {
            title: 'Company Not Found',
            description: 'The requested company could not be found.',
        };
    }
    
    const localizedDescription = locale === 'en' ? company.descriptionEN : company.descriptionFR;

    return {
        title: `${company.name} | Forum By INSA`,
        description: localizedDescription,
        openGraph: {
            title: company.name,
            description: localizedDescription,
            images: [
                {
                    url: company.logoUrl,
                    alt: company.name,
                    width: 1200,
                    height: 630,
                },
            ],
            locale: locale,
            type: 'website',
        },
    };
}

export default async function CompanyDetailsPage({ params }: CompanyDetailsPageProps) {
    const { companySlug } = await params;

    return (
        <SuspenseBoundary fallback={<CompanyDetailsSkeleton />}>
            <CompanyDetailsPageContent companySlug={companySlug} />
        </SuspenseBoundary>
    );
}

interface CompanyDetailsPageContentProps {
    companySlug: string;
}

const CompanyDetailsPageContent: FunctionComponent<CompanyDetailsPageContentProps> = async ({
    companySlug,
}) => {
    const company = await CompanyService.getCompanyByKey(companySlug);
    const t = await getTranslations('CompanyDetailsPage');

    if (!company) {
        return (
            <CompanyDetailsWrapper>
                <Alert
                    color="danger"
                    title={t('cannotLoadCompany')}
                />
            </CompanyDetailsWrapper>
        );
    }

    return <CompanyDetailsWrapper></CompanyDetailsWrapper>;
};
