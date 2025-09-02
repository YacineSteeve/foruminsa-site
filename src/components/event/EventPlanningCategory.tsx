'use client';

import { Accordion, AccordionItem } from '@heroui/accordion';
import type { PlanningCategoryEntity } from '@lib/types/entities';
import { formatPlanningTime } from '@lib/utils';
import type { Locale } from 'next-intl';
import { Fragment, type FunctionComponent } from 'react';
import { LuMapPin } from 'react-icons/lu';

interface EventPlanningCategoryProps {
    category: PlanningCategoryEntity;
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
                                <div className="flex items-center gap-1">
                                    <LuMapPin className="size-4" />
                                    <p className="text-base">{entry.location}</p>
                                </div>
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
