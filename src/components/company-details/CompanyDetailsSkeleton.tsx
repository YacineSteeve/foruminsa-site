import { CompanyDetailsSection } from '@components/company-details/CompanyDetailsSection';
import { ReturnButton } from '@components/company-details/ReturnButton';
import { Skeleton } from '@heroui/skeleton';
import { getTranslations } from 'next-intl/server';
import type { FunctionComponent } from 'react';
import { FaAward } from 'react-icons/fa6';
import {
    LuBuilding2,
    LuBusFront,
    LuFactory,
    LuGift,
    LuGlobe,
    LuLeaf,
    LuMapPin,
} from 'react-icons/lu';

export const CompanyDetailsSkeleton: FunctionComponent = async () => {
    const t = await getTranslations('CompanyDetailsPage');

    return (
        <div className="w-full">
            <div className="relative flex-center w-full px-4 py-16 bg-primary/75">
                <ReturnButton />
                <section className="flex flex-col items-center gap-4 md:gap-8">
                    <Skeleton className="size-40 md:size-60 shadow-lg rounded-2xl overflow-hidden" />
                    <div className="flex flex-col items-center gap-4">
                        <Skeleton className="w-64 h-10 rounded-xl" />
                        <Skeleton className="w-72 h-8 rounded-xl" />
                    </div>
                </section>
            </div>
            <div className="grid lg:grid-cols-2 gap-4 md:gap-8 w-full px-4 md:px-10 lg:px-20 xl:px-40 2xl:px-60 3xl:px-80 py-4 md:py-8 pb-16 bg-default/25">
                <CompanyDetailsSection
                    title={t('about')}
                    expand
                >
                    <div className="space-y-2">
                        <Skeleton className="w-full h-6 rounded-lg" />
                        <Skeleton className="w-3/4 h-6 rounded-lg" />
                        <Skeleton className="w-1/3 h-6 rounded-lg" />
                    </div>
                </CompanyDetailsSection>
                <CompanyDetailsSection title={t('sectors')}>
                    <div className="flex gap-4">
                        <LuFactory className="size-8 text-primary" />
                        <div className="flex flex-wrap items-center gap-4 flex-1">
                            {Array.from({ length: 2 }).map((_, index) => (
                                <Skeleton
                                    key={index}
                                    className="w-60 h-10 rounded-full"
                                />
                            ))}
                        </div>
                    </div>
                </CompanyDetailsSection>
                <CompanyDetailsSection title={t('forumLocation')}>
                    <div className="flex items-center gap-4">
                        <LuBuilding2 className="size-8 text-primary" />
                        <div className="flex-1 space-y-2">
                            <Skeleton className="w-60 h-6 rounded-lg" />
                            <Skeleton className="w-40 h-6 rounded-lg" />
                        </div>
                    </div>
                </CompanyDetailsSection>
                <CompanyDetailsSection title={t('wantedSpecialities')}>
                    <div className="flex flex-wrap gap-4 w-full">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <Skeleton
                                key={index}
                                className="w-40 h-10 rounded-full"
                            />
                        ))}
                    </div>
                </CompanyDetailsSection>
                <CompanyDetailsSection title={t('wantedStudyLevels')}>
                    <div className="flex flex-wrap gap-4 w-full">
                        {Array.from({ length: 2 }).map((_, index) => (
                            <Skeleton
                                key={index}
                                className="w-40 h-10 rounded-full"
                            />
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
                            <div className="flex-1 space-y-1">
                                <p className="text-lg font-semibold">
                                    {t('hasGreenTransportation')}
                                </p>
                                <Skeleton className="w-20 h-6 rounded-lg" />
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <LuGift className="size-8 text-warning-500" />
                            <div className="flex-1 space-y-1">
                                <p className="text-lg font-semibold">{t('hasNoGoodies')}</p>
                                <Skeleton className="w-20 h-6 rounded-lg" />
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <LuLeaf className="size-8 text-green-500" />
                            <div className="flex-1 space-y-1">
                                <p className="text-lg font-semibold">{t('carbonFootprint')}</p>
                                <Skeleton className="w-28 h-6 rounded-lg" />
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <FaAward className="size-12 grayscale" />
                            <div className="flex-1 space-y-2">
                                <Skeleton className="w-full h-6 rounded-lg" />
                                <Skeleton className="w-3/4 h-6 rounded-lg" />
                            </div>
                        </div>
                    </div>
                </CompanyDetailsSection>
                <CompanyDetailsSection title={t('contactInfo')}>
                    <div className="space-y-4 text-lg md:text-xl">
                        <div className="flex items-center gap-4">
                            <LuGlobe className="size-6 text-primary" />
                            <div className="flex-1">
                                <Skeleton className="w-32 h-6 rounded-lg" />
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <LuMapPin className="size-6 text-primary" />
                            <div className="flex-1 space-y-2">
                                <Skeleton className="w-72 h-6 rounded-lg" />
                                <Skeleton className="w-48 h-6 rounded-lg" />
                                <Skeleton className="w-40 h-6 rounded-lg" />
                            </div>
                        </div>
                    </div>
                </CompanyDetailsSection>
                <CompanyDetailsSection title={t('connectWithUs')}>
                    <div className="space-y-2 text-lg">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-4"
                            >
                                <Skeleton className="size-6 rounded-lg" />
                                <div className="flex-1">
                                    <Skeleton className="w-40 h-6 rounded-lg" />
                                </div>
                            </div>
                        ))}
                    </div>
                </CompanyDetailsSection>
            </div>
        </div>
    );
};
