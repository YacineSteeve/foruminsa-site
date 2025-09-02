import { EVENT_DAY } from '@lib/constants/core';
import type { Time } from '@lib/types/entities';
import type { Locale } from 'next-intl';

export const getFormattedEventDate = (locale: Locale) => {
    const date = new Date(EVENT_DAY.year, EVENT_DAY.month - 1, EVENT_DAY.day);

    return date.toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'Europe/Paris',
    });
};

const formatTime = (time: Time, locale: Locale, options?: Intl.DateTimeFormatOptions) => {
    const fullDate = new Date(
        EVENT_DAY.year,
        EVENT_DAY.month - 1,
        EVENT_DAY.day,
        time.hours,
        time.minutes,
        0,
        0,
    );

    const preFormatted = fullDate
        .toLocaleTimeString(locale, {
            timeZone: 'Europe/Paris',
            ...(options ?? {}),
        })
        .replace(/ /g, '')
        .replace(':', 'h');

    if (preFormatted.endsWith('h00')) {
        return preFormatted.slice(0, -2);
    }

    return preFormatted;
};

export const formatEventTime = (time: Time, locale: Locale) => {
    return formatTime(time, locale, {
        hour: 'numeric',
        minute: '2-digit',
        hour12: false,
    });
};

export const formatPlanningTime = (time: Time, locale: Locale) => {
    return formatTime(time, locale, {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });
};
