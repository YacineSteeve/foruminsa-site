'use client';

import { Accordion, AccordionItem } from '@heroui/accordion';
import { CompanyService } from '@lib/services';
import type { PlanningData } from '@lib/types/data';
import { formatPlanningTime } from '@lib/utils';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { Fragment, type FunctionComponent } from 'react';
import { LuExternalLink, LuMapPin, LuPresentation } from 'react-icons/lu';

export type PlanningDataGroup = PlanningData[number];

interface EventPlanningGroupProps {
    group: PlanningDataGroup;
}

export const EventPlanningGroup: FunctionComponent<EventPlanningGroupProps> = ({ group }) => {
    const t = useTranslations('EventPlanningGroup');
    const locale = useLocale();

    return (
        <div className="space-y-4">
            <h3>{group.name[locale]}</h3>
            <Accordion
                keepContentMounted
                variant="bordered"
            >
                {group.entries.map((entry, index) => (
                    <AccordionItem
                        keepContentMounted
                        classNames={{ title: 'text-lg' }}
                        key={index}
                        aria-label={entry.title[locale]}
                        title={entry.title[locale]}
                        subtitle={
                            entry.speaker || entry.location ? (
                                <div>
                                    {(() => {
                                        if (!entry.speaker) {
                                            return null;
                                        }

                                        const company = CompanyService.getCompanyByKey(
                                            entry.speaker.companyId,
                                        );

                                        return (
                                            <div className="flex items-center gap-1">
                                                <LuPresentation className="size-4" />
                                                <p className="flex-1 text-base">
                                                    {t('bySpeaker', { name: entry.speaker.name })},{' '}
                                                    <Link
                                                        href={`/entreprises/${company.slug}`}
                                                        className="underline underline-offset-3 hover:text-primary transition-all"
                                                    >
                                                        {t('fromCompany', {
                                                            companyName: company.name,
                                                        })}
                                                    </Link>
                                                </p>
                                            </div>
                                        );
                                    })()}
                                    {entry.location &&
                                        (entry.locationUrl ? (
                                            <Link
                                                href={entry.locationUrl}
                                                target="_blank"
                                                className="group"
                                            >
                                                <div className="flex items-center gap-1">
                                                    <LuMapPin className="size-4" />
                                                    <p className="flex-1 text-base underline underline-offset-3 group-hover:text-primary transition-all">
                                                        {entry.location}
                                                    </p>
                                                    <LuExternalLink className="not-group-hover:hidden" />
                                                </div>
                                            </Link>
                                        ) : (
                                            <div className="flex items-center gap-1">
                                                <LuMapPin className="size-4" />
                                                <p className="flex-1 text-base">{entry.location}</p>
                                            </div>
                                        ))}
                                </div>
                            ) : undefined
                        }
                        startContent={
                            <div className="flex-center flex-col size-18 rounded-lg text-base text-white bg-primary *:leading-none">
                                {entry.isFullDay ? (
                                    <p className="!leading-normal">{t('allDay')}</p>
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
