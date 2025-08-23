import { CompanyDetailsSection } from '@components/company-details/CompanyDetailsSection';
import { CompanyDetailsSkeleton } from '@components/company-details/CompanyDetailsSkeleton';
import { ReturnButton } from '@components/company-details/ReturnButton';
import { SuspenseBoundary } from '@components/ui/SuspenseBoundary';
import { Alert } from '@heroui/alert';
import { Chip } from '@heroui/chip';
import { CompanyService } from '@lib/api-services';
import { COUNTRIES } from '@lib/constants/countries';
import { SOCIAL_LINKS_TYPES_METADATA } from '@lib/constants/ui';
import {
    buildGoogleMapsUrl,
    cn,
    getSortedSocialLinks,
    hasGreenLabel,
    parseSpecialities,
    parseStudyLevels,
} from '@lib/utils';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import type { FunctionComponent } from 'react';
import { FaAward } from 'react-icons/fa6';
import {
    LuBuilding2,
    LuBusFront,
    LuExternalLink,
    LuFactory,
    LuGift,
    LuGlobe,
    LuLeaf,
    LuMapPin,
} from 'react-icons/lu';

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
        title: company.name,
        description: localizedDescription,
        openGraph: {
            title: `${company.name} | Forum By INSA`,
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
    const { companySlug, locale } = await params;

    return (
        <SuspenseBoundary fallback={<CompanyDetailsSkeleton />}>
            <CompanyDetailsPageContent
                companySlug={companySlug}
                locale={locale as Locale}
            />
        </SuspenseBoundary>
    );
}

interface CompanyDetailsPageContentProps {
    companySlug: string;
    locale: Locale;
}

const CompanyDetailsPageContent: FunctionComponent<CompanyDetailsPageContentProps> = async ({
    companySlug,
    locale,
}) => {
    const company = await CompanyService.getCompanyByKey(companySlug);
    const [t, tSpecialities, tStudyLevels, tSocialLinks] = await Promise.all([
        getTranslations('CompanyDetailsPage'),
        getTranslations('Specialities'),
        getTranslations('StudyLevels'),
        getTranslations('SocialLinks'),
    ]);

    if (!company) {
        return (
            <div className="flex-center w-full py-16">
                <Alert
                    color="danger"
                    title={t('cannotLoadCompany')}
                />
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="relative flex-center w-full px-4 py-16 bg-primary/75">
                <ReturnButton />
                <section className="flex flex-col items-center gap-4 md:gap-8">
                    <div className="relative size-40 md:size-60 shadow-lg rounded-2xl overflow-hidden bg-white">
                        <Image
                            src={company.logoUrl}
                            alt={t('companyLogoAlt', { companyName: company.name })}
                            fill
                            priority
                            quality={100}
                            sizes="100%,100%"
                            className="object-center object-contain"
                        />
                    </div>
                    <div className="flex flex-col items-center gap-4 text-white text-center">
                        <h1>{company.name}</h1>
                        <div className="flex items-center gap-2">
                            <LuMapPin className="size-6" />
                            <p className="text-xl md:text-2xl">
                                {company.city}, {COUNTRIES[company.countryCode][locale]}
                            </p>
                        </div>
                    </div>
                </section>
            </div>
            <div className="grid lg:grid-cols-2 gap-4 md:gap-8 w-full px-4 md:px-10 lg:px-20 xl:px-40 2xl:px-60 3xl:px-80 py-4 md:py-8 pb-16 bg-default/25">
                <CompanyDetailsSection
                    title={t('about')}
                    expand
                >
                    <p className="text-lg">
                        {locale === 'en' ? company.descriptionEN : company.descriptionFR}
                    </p>
                </CompanyDetailsSection>
                <CompanyDetailsSection title={t('sectors')}>
                    <div className="flex gap-4">
                        <LuFactory className="size-8 text-primary" />
                        <div className="flex flex-wrap items-center gap-4 flex-1">
                            {company.sectors.map((sector) => (
                                <Chip
                                    key={sector.id}
                                    size="lg"
                                    variant="flat"
                                    classNames={{
                                        base: 'h-10 px-3 bg-green-100 text-green-800',
                                    }}
                                >
                                    {locale === 'en' ? sector.nameEN : sector.nameFR}
                                </Chip>
                            ))}
                        </div>
                    </div>
                </CompanyDetailsSection>
                <CompanyDetailsSection title={t('forumLocation')}>
                    <div className="flex items-center gap-4">
                        <LuBuilding2 className="size-8 text-primary" />
                        {company.room ? (
                            <div className="flex-1 md:text-lg">
                                <p className="text-lg md:text-xl font-semibold">
                                    {company.room.name}
                                </p>
                                <p className="text-gray-500">
                                    {company.room.floor === 0
                                        ? t('groundFloor')
                                        : t('floor', { floorNumber: company.room.floor })}
                                    , {t('building', { buildingName: company.room.building })}
                                </p>
                            </div>
                        ) : (
                            <p className="text-gray-500 text-lg">{t('unknown')}</p>
                        )}
                    </div>
                </CompanyDetailsSection>
                <CompanyDetailsSection title={t('wantedSpecialities')}>
                    <div className="flex flex-wrap gap-4 w-full">
                        {parseSpecialities(company.specialities).map((speciality) => (
                            <Chip
                                key={speciality}
                                size="lg"
                                variant="flat"
                                classNames={{
                                    base: 'h-10 px-3 bg-blue-100 text-blue-800',
                                }}
                            >
                                {tSpecialities(speciality)}
                            </Chip>
                        ))}
                    </div>
                </CompanyDetailsSection>
                <CompanyDetailsSection title={t('wantedStudyLevels')}>
                    <div className="flex flex-wrap gap-4 w-full">
                        {parseStudyLevels(company.studyLevels).map((studyLevel) => (
                            <Chip
                                key={studyLevel}
                                size="lg"
                                variant="flat"
                                classNames={{
                                    base: 'h-10 px-3 bg-purple-100 text-purple-800',
                                }}
                            >
                                {tStudyLevels(studyLevel)}
                            </Chip>
                        ))}
                    </div>
                </CompanyDetailsSection>
                <CompanyDetailsSection
                    title={t('environmentalCommitment')}
                    expand
                >
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-4">
                            <LuBusFront className="size-8 text-purple-500" />
                            <div className="flex-1">
                                <p className="text-lg font-semibold">
                                    {t('hasGreenTransportation')}
                                </p>
                                <p className="text-gray-500">
                                    {t(company.hasGreenTransport ? 'yes' : 'no')}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <LuGift className="size-8 text-warning-500" />
                            <div className="flex-1">
                                <p className="text-lg font-semibold">{t('hasNoGoodies')}</p>
                                <p className="text-gray-500">
                                    {t(company.providesGoodies ? 'no' : 'yes')}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <LuLeaf className="size-8 text-green-500" />
                            <div className="flex-1">
                                <p className="text-lg font-semibold">{t('carbonFootprint')}</p>
                                <p className="text-gray-500">
                                    {company.carbonFootprint
                                        ? `${company.carbonFootprint.toFixed(2)} tCO2e`
                                        : t('unknown')}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <FaAward
                                className={cn(
                                    'size-12 text-success',
                                    !hasGreenLabel(company) && 'grayscale',
                                )}
                            />
                            <p className="flex-1">
                                {t(
                                    hasGreenLabel(company)
                                        ? 'hasGreenLabelDescription'
                                        : 'noGreenLabelDescription',
                                )}
                            </p>
                        </div>
                    </div>
                </CompanyDetailsSection>
                <CompanyDetailsSection
                    title={t('contactInfo')}
                    expand={company.socialLinks.length === 0}
                >
                    <div className="space-y-4 text-lg md:text-xl">
                        {company.websiteUrl && (
                            <div className="flex items-center gap-4">
                                <LuGlobe className="size-6 text-primary" />
                                <div className="flex-1">
                                    <Link
                                        href={company.websiteUrl}
                                        target="_blank"
                                        className="group flex items-center"
                                    >
                                        <p className="inline-block group-hover:underline underline-offset-2">
                                            {t('website')}
                                        </p>
                                        <LuExternalLink className="ml-2 size-4 inline-block not-group-hover:hidden" />
                                    </Link>
                                </div>
                            </div>
                        )}
                        <div className="flex gap-4">
                            <LuMapPin className="size-6 text-primary" />
                            <div className="flex-1">
                                <Link
                                    href={buildGoogleMapsUrl({
                                        address: company.address,
                                        postalCode: company.postalCode,
                                        city: company.city,
                                        countryCode: company.countryCode,
                                    })}
                                    target="_blank"
                                    className="group hover:*:first:underline *:first:underline-offset-2"
                                >
                                    {company.address && (
                                        <p>
                                            {company.address}
                                            <LuExternalLink className="ml-2 size-4 inline-block not-group-hover:hidden" />
                                        </p>
                                    )}
                                    <p className="text-gray-500">
                                        {company.postalCode && `${company.postalCode}, `}
                                        {company.city}
                                        {!company.address && (
                                            <LuExternalLink className="ml-2 size-4 inline-block not-group-hover:hidden" />
                                        )}
                                    </p>
                                    <p className="text-gray-500">
                                        {COUNTRIES[company.countryCode][locale]}
                                    </p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </CompanyDetailsSection>
                {company.socialLinks.length > 0 && (
                    <CompanyDetailsSection title={t('connectWithUs')}>
                        <div className="space-y-2 text-lg">
                            {getSortedSocialLinks(company.socialLinks).map((socialLink) => {
                                const Icon = SOCIAL_LINKS_TYPES_METADATA[socialLink.type].icon;

                                return (
                                    <div
                                        key={socialLink.id}
                                        className="flex items-center gap-4"
                                    >
                                        <Icon className="size-6 text-primary" />
                                        <div className="flex-1">
                                            <Link
                                                href={socialLink.url}
                                                target="_blank"
                                                className="group flex items-center"
                                            >
                                                <p className="inline-block group-hover:underline underline-offset-2">
                                                    {socialLink.type === 'other'
                                                        ? new URL(socialLink.url).hostname.replace(
                                                              'www.',
                                                              '',
                                                          )
                                                        : tSocialLinks(socialLink.type)}
                                                </p>
                                                <LuExternalLink className="ml-2 size-4 inline-block not-group-hover:hidden" />
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </CompanyDetailsSection>
                )}
            </div>
        </div>
    );
};
