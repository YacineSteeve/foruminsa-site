import { format, set } from 'date-fns';
import { fr, enUS, type Locale as DateFnsLocale } from 'date-fns/locale';
import { EVENT_DAY } from '@lib/constants/core';
import type { Time } from '@lib/types/primitives';
import type { Locale } from 'next-intl';

const localesMap: Readonly<Record<Locale, DateFnsLocale>> = {
    en: enUS,
    fr: fr,
} as const;

export const getFormattedEventDate = (locale: Locale) => {
    const date = set(new Date(), {
        year: EVENT_DAY.year,
        month: EVENT_DAY.month - 1,
        date: EVENT_DAY.day,
    });

    return format(date, 'd MMMM yyyy', { locale: localesMap[locale] });
};

const formatTime = (time: Time, locale: Locale, hourFormat: 'numeric' | '2-digit') => {
    const fullDate = set(new Date(), {
        year: EVENT_DAY.year,
        month: EVENT_DAY.month - 1,
        date: EVENT_DAY.day,
        hours: time.hours,
        minutes: time.minutes,
    });

    let formatted = format(fullDate, hourFormat === 'numeric' ? "H'h'mm" : "HH'h'mm", {
        locale: localesMap[locale],
    });

    if (formatted.endsWith('h00')) {
        formatted = formatted.slice(0, -2);
    }

    return formatted;
};

export const formatEventTime = (time: Time, locale: Locale) => {
    return formatTime(time, locale, 'numeric');
};

export const formatPlanningTime = (time: Time, locale: Locale) => {
    return formatTime(time, locale, '2-digit');
};
