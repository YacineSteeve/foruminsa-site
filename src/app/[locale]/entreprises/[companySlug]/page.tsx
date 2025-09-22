import { CompanyDetailsSection } from '@components/company-details/CompanyDetailsSection';
import { ReturnButton } from '@components/company-details/ReturnButton';
import { Alert } from '@heroui/alert';
import { Badge } from '@heroui/badge';
import { Chip } from '@heroui/chip';
import { ScrollShadow } from '@heroui/scroll-shadow';
import { Tooltip } from '@heroui/tooltip';
import { CompanyService } from '@lib/services';
import { COUNTRIES } from '@lib/constants/countries';
import { FORUM_LABEL_ICON, SOCIAL_LINKS_TYPES_METADATA } from '@lib/constants/ui';
import {
    buildGoogleMapsUrl,
    cn,
    getCompanyLogoUrl,
    getSortedSocialLinks,
    getStarsSequenceFromCarbonFootprint,
    hasGreenLabel,
} from '@lib/utils';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import {
    LuBuilding2,
    LuBusFront,
    LuCircleHelp,
    LuExternalLink,
    LuFactory,
    LuGift,
    LuGlobe,
    LuHandshake,
    LuLeaf,
    LuMapPin,
} from 'react-icons/lu';
import { RiStarFill, RiStarHalfFill, RiStarLine } from 'react-icons/ri';

interface CompanyDetailsPageProps {
    params: Promise<{
        companySlug: string;
        locale: string;
    }>;
}

export async function generateMetadata({ params }: CompanyDetailsPageProps): Promise<Metadata> {
    const awaitedParams = await params;
    const locale = awaitedParams.locale as Locale;

    try {
        const company = CompanyService.getCompanyByKey(awaitedParams.companySlug);

        return {
            title: company.name,
            description: company.description[locale],
            openGraph: {
                title: `${company.name} | Forum By INSA`,
                description: company.description[locale],
                images: [
                    {
                        url: getCompanyLogoUrl(company.logoFile),
                        alt: company.name,
                        width: 1200,
                        height: 630,
                    },
                ],
                locale: locale,
                type: 'website',
            },
        };
    } catch (error) {
        return {
            title: '404',
        };
    }
}

export default async function CompanyDetailsPage({ params }: CompanyDetailsPageProps) {
    const [awaitedParams, t, tSpecialities, tStudyLevels, tStudyLevelsDetails, tSocialLinks] =
        await Promise.all([
            params,
            getTranslations('CompanyDetailsPage'),
            getTranslations('Specialities'),
            getTranslations('StudyLevels'),
            getTranslations('StudyLevelsDetails'),
            getTranslations('SocialLinks'),
        ]);

    const locale = awaitedParams.locale as Locale;
    const company = CompanyService.getCompanyByKey(awaitedParams.companySlug);

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
        <div className="grid lg:grid-cols-2 gap-4 md:gap-8 w-full max-w-full px-4 md:px-10 lg:px-20 xl:px-40 2xl:px-60 3xl:px-80 py-4 md:py-8 pb-16 bg-default/20">
            <section className="relative flex-center flex-col gap-4 md:gap-8 w-full h-88 px-4 pt-20 pb-12 bg-gradient-to-t from-primary/20 to-white rounded-2xl shadow-sm md:shadow-md">
                <Image
                    src={getCompanyLogoUrl(company.logoFile)}
                    alt={t('companyLogoAlt', { companyName: company.name })}
                    height={160}
                    width={160}
                    priority
                    quality={100}
                    sizes="100%,100%"
                    className="w-60 h-auto max-h-40"
                />
                <div className="flex flex-col items-center gap-2 w-full whitespace-break-spaces break-after-left">
                    <h1 className="text-center">{company.name}</h1>
                    <div className="flex items-center gap-2 text-gray-800">
                        <LuMapPin className="size-6" />
                        <p className="text-xl flex-1">
                            {company.city}, {COUNTRIES[company.countryCode][locale]}
                        </p>
                    </div>
                </div>
                <ReturnButton />
            </section>
            <CompanyDetailsSection title={t('about')}>
                <ScrollShadow
                    size={60}
                    className="w-full max-h-60 xl:max-h-80"
                >
                    <p className="text-lg pr-2">{company.description[locale]}</p>
                </ScrollShadow>
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
                                    base: 'min-w-auto max-w-full min-h-10 h-max px-3 py-1 bg-green-100 text-green-800',
                                    content: 'block w-full break-words whitespace-normal',
                                }}
                            >
                                {sector.name[locale]}
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
                                {t('room', { roomNumber: company.room.name })}
                            </p>
                            <p className="text-gray-500">
                                {company.room.floor === 0
                                    ? t('groundFloor')
                                    : t('floor', { floorNumber: company.room.floor })}
                                , {t('building', { buildingNumber: company.room.buildingNumber })} (
                                {company.room.buildingName})
                            </p>
                        </div>
                    ) : (
                        <p className="text-gray-500 text-lg wrap">{t('unknown')}</p>
                    )}
                </div>
            </CompanyDetailsSection>
            <CompanyDetailsSection title={t('wantedSpecialities')}>
                <div className="flex flex-wrap gap-4 w-full">
                    {company.specialities.toSorted().map((speciality) => (
                        <Chip
                            key={speciality}
                            size="lg"
                            variant="flat"
                            classNames={{
                                base: 'min-w-auto max-w-full min-h-10 h-max px-3 py-1 bg-blue-100 text-blue-800',
                                content: 'block w-full break-words whitespace-normal',
                            }}
                        >
                            {tSpecialities(speciality)}
                        </Chip>
                    ))}
                </div>
            </CompanyDetailsSection>
            <CompanyDetailsSection title={t('wantedStudyLevels')}>
                <div className="flex flex-wrap gap-4 w-full">
                    {company.studyLevels.toSorted().map((studyLevel) => (
                        <Badge
                            isOneChar
                            key={studyLevel}
                            content={
                                <Tooltip
                                    size="lg"
                                    content={tStudyLevelsDetails(studyLevel)}
                                >
                                    <LuCircleHelp className="text-gray-500 size-5 cursor-pointer" />
                                </Tooltip>
                            }
                        >
                            <Chip
                                size="lg"
                                variant="flat"
                                classNames={{
                                    base: 'min-w-auto max-w-full min-h-10 h-max px-3 py-1 bg-purple-100 text-purple-800',
                                    content: 'block w-full break-words whitespace-normal',
                                }}
                            >
                                {tStudyLevels(studyLevel)}
                            </Chip>
                        </Badge>
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
                            <p className="text-lg font-semibold">{t('hasGreenTransportation')}</p>
                            <p className="text-gray-500">
                                {t(company.hasGreenTransport ? 'yes' : 'no')}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <LuGift className="size-8 text-warning-500" />
                        <div className="flex-1">
                            <p className="text-lg font-semibold">{t('hasGoodies')}</p>
                            <p className="text-gray-500">
                                {t(company.providesGoodies ? 'yes' : 'no')}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <LuLeaf className="size-8 text-green-500" />
                        <div className="flex-1">
                            <p className="text-lg font-semibold">{t('carbonFootprint')}</p>
                            {company.carbonFootprint ? (
                                <div className="flex items-center gap-0.5">
                                    {getStarsSequenceFromCarbonFootprint(
                                        company.carbonFootprint,
                                    ).map((sequenceItem, index) => {
                                        const Icon = {
                                            full: RiStarFill,
                                            half: RiStarHalfFill,
                                            empty: RiStarLine,
                                        }[sequenceItem];

                                        return (
                                            <Icon
                                                key={index}
                                                className={cn(
                                                    'size-5',
                                                    sequenceItem === 'empty'
                                                        ? 'text-default'
                                                        : 'text-yellow-500',
                                                )}
                                            />
                                        );
                                    })}
                                </div>
                            ) : (
                                <p className="text-gray-500">{t('unknown')}</p>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <FORUM_LABEL_ICON
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
                    {company.hiringPlatformUrl && (
                        <div className="flex items-center gap-4">
                            <LuHandshake className="size-6 text-primary" />
                            <div className="flex-1">
                                <Link
                                    href={company.hiringPlatformUrl}
                                    target="_blank"
                                    className="group flex items-center"
                                >
                                    <p className="inline-block group-hover:underline underline-offset-2">
                                        {t('hiringPlatform')}
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
                                    key={socialLink.type}
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
    );
}
