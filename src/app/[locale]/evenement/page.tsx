import { EventRoomsPlanSection } from '@components/event/EventRoomsPlanSection';
import { EventPlanningGroup } from '@components/event/EventPlanningGroup';
import { planningData } from '@data/planning';
import { BrochureSection } from '@components/global/BrochureSection';
import { Button } from '@heroui/button';
import { DEFAULT_TAB, EVENT_TIME, JOBTEASER_EVENT_URL, TABS } from '@lib/constants/core';
import { Link } from '@lib/i18n/navigation';
import { CompanyService } from '@lib/services';
import type { ForumRoomList } from '@lib/types/dtos';
import { formatEventTime, getFormattedEventDate } from '@lib/utils';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import NextLink from 'next/link';
import type { FunctionComponent } from 'react';
import type { IconType } from 'react-icons';
import { LuCalendarDays, LuClock4, LuExternalLink, LuMapPin, LuUsers } from 'react-icons/lu';

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('AppMetadata');

    return {
        title: t('eventPageTitle'),
    };
}

interface EventPageProps {
    params: Promise<{
        locale: string;
    }>;
    searchParams: Promise<{
        plan: string;
    }>;
}

export default async function EventPage({ params, searchParams }: EventPageProps) {
    const [awaitedParams, awaitedSearchParams, t] = await Promise.all([
        params,
        searchParams,
        getTranslations('EventPage'),
    ]);

    const locale = awaitedParams.locale as Locale;

    const tab = TABS.find((tab) => tab.key === awaitedSearchParams.plan) ?? DEFAULT_TAB;

    const companiesByRoom = CompanyService.getCompaniesGroupedByRoom(tab.filter);

    return (
        <div className="w-full">
            <section className="relative flex-center w-full min-h-max px-4 md:px-10 lg:px-20 xl:px-40 2xl:px-60 py-8 md:py-16">
                <Image
                    src="/chairs.jpg"
                    alt={t('imageOneAlt')}
                    fill
                    priority
                    quality={100}
                    sizes="100%,100%"
                    className="object-cover object-center brightness-50"
                />
                <div className="z-10 flex max-lg:flex-col items-center gap-8 lg:gap-16 2xl:gap-32">
                    <div className="flex flex-col max-lg:items-center gap-8 flex-1">
                        <div className="space-y-4 max-lg:text-center text-white">
                            <h1>{t('title')}</h1>
                            <p className="text-xl">{t('description')}</p>
                        </div>
                        <NextLink
                            href={JOBTEASER_EVENT_URL}
                            target="_blank"
                        >
                            <Button
                                size="lg"
                                color="primary"
                                className="lg:text-xl lg:p-8"
                                startContent={<LuExternalLink />}
                            >
                                {t('registration')}
                            </Button>
                        </NextLink>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 size-fit min-w-max">
                        <EventInfosItem
                            icon={LuCalendarDays}
                            title={t('dateTitle')}
                            subtitle={getFormattedEventDate(locale)}
                        />
                        <EventInfosItem
                            icon={LuClock4}
                            title={t('timeTitle')}
                            subtitle={t('timeSubtitle', {
                                start: formatEventTime(EVENT_TIME.start, locale),
                                end: formatEventTime(EVENT_TIME.end, locale),
                            })}
                        />
                        <EventInfosItem
                            icon={LuMapPin}
                            title={t('placeTitle')}
                            subtitle={t('placeSubtitle')}
                            description={t('placeDescription')}
                        />
                        <EventInfosItem
                            icon={LuUsers}
                            title={t('participantsTitle')}
                            subtitle={t('participantsSubtitle')}
                        />
                    </div>
                </div>
            </section>
            <section className="flex max-lg:flex-col items-center gap-x-16 gap-y-8 w-full px-4 md:px-10 lg:px-20 xl:px-40 2xl:px-60 3xl:px-80 py-8 md:py-16 bg-gradient-to-t from-primary/10 to-white shadow-md">
                <Image
                    src="/conf_zoom.jpg"
                    alt={t('imageTwoAlt')}
                    width={1296}
                    height={864}
                    quality={100}
                    className="w-100 xl:w-120 h-auto rounded-2xl hover:rounded-4xl transition-all duration-300"
                />
                <div className="max-lg:text-center space-y-4">
                    <h2 className="text-primary !normal-case">{t('whyTitle')}</h2>
                    <div className="text-lg">
                        <ul className="list-disc list-inside">
                            <li>{t('whyItemOne')}</li>
                            <li>{t('whyItemTwo')}</li>
                            <li>{t('whyItemThree')}</li>
                        </ul>
                    </div>
                </div>
            </section>
            <section className="w-full px-4 md:px-10 lg:px-20 xl:px-40 2xl:px-60 3xl:px-80 py-8 md:py-16 space-y-4 md:space-y-8">
                <h2 className="text-primary text-center">{t('daySchedule')}</h2>
                <div className="space-y-8">
                    {planningData.map((group, index) => (
                        <EventPlanningGroup
                            key={index}
                            group={group}
                        />
                    ))}
                </div>
            </section>
            <BrochureSection />
            <section
                id="rooms-plan"
                className="w-full px-4 md:px-10 lg:px-20 xl:px-40 2xl:px-60 3xl:px-80 py-8 md:py-16 space-y-4 md:space-y-8"
            >
                <EventRoomsPlanSection selectedTab={tab.key}>
                    {companiesByRoom.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 gap-8">
                            {companiesByRoom.map((group) => (
                                <RoomGroupItem
                                    key={group.room.id}
                                    group={group}
                                />
                            ))}
                        </div>
                    )}
                </EventRoomsPlanSection>
            </section>
        </div>
    );
}

interface EventInfosItemProps {
    title: string;
    subtitle?: string;
    description?: string;
    icon: IconType;
}

const EventInfosItem: FunctionComponent<EventInfosItemProps> = ({
    title,
    subtitle,
    description,
    icon: Icon,
}) => {
    return (
        <div className="w-80 lg:max-xl:w-68 h-56 flex-center flex-col gap-4 p-4 text-center glassy">
            <div className="flex-center size-16 rounded-full bg-primary/50">
                <Icon className="size-8 text-white" />
            </div>
            <div className="space-y-2">
                <p className="text-2xl text-white font-semibold">{title}</p>
                {subtitle && <p className="text-lg text-white">{subtitle}</p>}
                {description && <p className="text-sm text-gray-300">{description}</p>}
            </div>
        </div>
    );
};

interface RoomGroupItemProps {
    group: ForumRoomList[number];
}

const RoomGroupItem: FunctionComponent<RoomGroupItemProps> = ({ group }) => {
    return (
        <div className="flex flex-wrap gap-4">
            <p className="text-2xl text-primary font-semibold">{group.room.name}</p>
            <ul className="list-disc list-inside space-y-1">
                {group.companies.map((company) => (
                    <li key={company.id}>
                        <Link
                            href={`/entreprises/${company.slug}`}
                            className="inline-block hover:font-semibold hover:underline underline-offset-2"
                        >
                            <p className="text-lg">{company.name}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};
