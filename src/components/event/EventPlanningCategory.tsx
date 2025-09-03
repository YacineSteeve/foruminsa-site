'use client';

import { Accordion, AccordionItem } from '@heroui/accordion';
import type { PlanningData } from '@lib/types/data';
import { formatPlanningTime } from '@lib/utils';
import type { Locale } from 'next-intl';
import Link from 'next/link';
import { Fragment, type FunctionComponent } from 'react';
import { LuExternalLink, LuMapPin } from 'react-icons/lu';

export type PlanningDataCategory = PlanningData[number];

interface EventPlanningCategoryProps {
    category: PlanningDataCategory;
    locale: Locale;
    allDayLabel: string;
}

export const EventPlanningCategory: FunctionComponent<EventPlanningCategoryProps> = ({
    category,
    locale,
    allDayLabel,
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
                        classNames={{ title: 'text-lg' }}
                        key={index}
                        aria-label={entry.title[locale]}
                        title={entry.title[locale]}
                        subtitle={
                            entry.location ? (
                                entry.locationUrl ? (
                                    <Link
                                        href={entry.locationUrl}
                                        target="_blank"
                                        className="group"
                                    >
                                        <div className="flex items-center gap-1">
                                            <LuMapPin className="size-4" />
                                            <p className="text-base group-hover:underline underline-offset-3">
                                                {entry.location}
                                            </p>
                                            <LuExternalLink className="not-group-hover:hidden" />
                                        </div>
                                    </Link>
                                ) : (
                                    <div className="flex items-center gap-1">
                                        <LuMapPin className="size-4" />
                                        <p className="text-base">{entry.location}</p>
                                    </div>
                                )
                            ) : undefined
                        }
                        startContent={
                            <div className="flex-center flex-col size-18 rounded-lg text-base text-white bg-primary *:leading-none">
                                {entry.isFullDay ? (
                                    <p className="!leading-normal">{allDayLabel}</p>
                                ) : (
                                    <Fragment>
                                        <p>{formatPlanningTime(entry.startTime, locale)}</p>
                                        <p>-</p>
                                        <p>{formatPlanningTime(entry.endTime, locale)}</p>
                                    </Fragment>
                                )}
                            </div>
                        }
                    >
                        <p className="text-base ml-2 mb-4">{entry.description[locale]}</p>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
};
