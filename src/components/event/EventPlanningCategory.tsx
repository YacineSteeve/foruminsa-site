'use client';

import { Accordion, AccordionItem } from '@heroui/accordion';
import { EVENT_DAY } from '@lib/constants/core';
import type { PlanningCategoryEntity, Time } from '@lib/types/entities';
import type { Locale } from 'next-intl';
import { Fragment, type FunctionComponent } from 'react';
import { LuMapPin } from 'react-icons/lu';

interface EventPlanningCategoryProps {
    category: PlanningCategoryEntity;
    locale: Locale;
}

export const EventPlanningCategory: FunctionComponent<EventPlanningCategoryProps> = ({
    category,
    locale,
}) => {
    return (
        <div className="space-y-4">
            <h3>{category.name[locale]}</h3>
            <Accordion
                keepContentMounted
                variant="bordered"
            >
                {category.entries.map((entry, index) => (
                    <AccordionItem
                        keepContentMounted
                        key={index}
                        aria-label={entry.title[locale]}
                        title={entry.title[locale]}
                        subtitle={
                            entry.location ? (
                                <div className="flex items-center gap-1">
                                    <LuMapPin className="size-4" />
                                    <p className="text-base">{entry.location}</p>
                                </div>
                            ) : undefined
                        }
                        startContent={
                            <div className="flex-center flex-col size-18 rounded-lg text-base text-white bg-primary *:leading-none">
                                {entry.isFullDay ? (
                                    <p className="!leading-normal">Journée entière</p>
                                ) : (
                                    <Fragment>
                                        <p>{formatEventTime(entry.startTime, locale)}</p>
                                        <p>-</p>
                                        <p>{formatEventTime(entry.endTime, locale)}</p>
                                    </Fragment>
                                )}
                            </div>
                        }
                        classNames={{ title: 'text-lg' }}
                    >
                        <p className="text-base ml-2 mb-4">{entry.description[locale]}</p>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
};

const formatEventTime = (time: Time, locale: Locale) => {
    const fullDate = new Date(
        EVENT_DAY.year,
        EVENT_DAY.month - 1,
        EVENT_DAY.day,
        time.hours,
        time.minutes,
        0,
        0,
    );

    return new Intl.DateTimeFormat(locale, {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Europe/Paris',
    })
        .format(fullDate)
        .replace(/ /g, '')
        .replace(':', 'h');
};
