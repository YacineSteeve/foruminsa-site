import type { Time } from '@lib/types/entities';

export const APP_URL =
    process.env.NODE_ENV === 'production'
        ? ('https://foruminsa-site.vercel.app' as const)
        : ('http://192.168.102.97:3000' as const);

export const JOBTEASER_EVENT_URL = 'https://insa-toulouse.jobteaser.com/fr/events/229266' as const;

export const EVENT_DAY = {
    year: 2025,
    month: 10,
    day: 21,
} as const;

export const EVENT_TIME = {
    start: { hours: 9, minutes: 0 },
    end: { hours: 16, minutes: 0 },
} as const satisfies { start: Time; end: Time };

export const STUDY_LEVELS = ['1A', '2A', '3A', '4A', '5A'] as const;

export const SPECIALITIES = ['AE', 'GB', 'GC', 'GM', 'GP', 'GP3E', 'IR', 'MA'] as const;

export const CONTACT_SUBJECTS = ['general', 'solidarityFund', 'companies'] as const;

export const SUPPORTED_LANGUAGES = ['fr', 'en'] as const;

export const DEFAULT_LANGUAGE = 'fr' as const;

export const LANGUAGE_METADATA: Record<
    (typeof SUPPORTED_LANGUAGES)[number],
    { label: string; countryName: string; countryCode: string }
> = {
    fr: {
        label: 'Français',
        countryName: 'France',
        countryCode: 'fr',
    },
    en: {
        label: 'English',
        countryName: 'United Kingdom',
        countryCode: 'gb',
    },
} as const;

export const MENU_ITEMS = [
    {
        label: 'home',
        href: '/',
    },
    {
        label: 'event',
        href: '/evenement',
    },
    {
        label: 'companies',
        href: '/entreprises',
    },
    {
        label: 'carbonBalance',
        href: '/bilan-carbone',
    },
    {
        label: 'solidarityFund',
        href: '/fonds-de-solidarite',
    },
    {
        label: 'contact',
        href: '/contact',
    },
] as const;

export const COMPANIES_LIST_PAGE_SIZE = 18 as const;

export const COMPANIES_RANKING_PAGE_SIZE = 10 as const;

export const SOCIAL_LINK_TYPES = [
    'facebook',
    'instagram',
    'linkedin',
    'x',
    'youtube',
    'tiktok',
    'other',
] as const;

export const PASSWORD_HASHING_ROUNDS = 10 as const;

export const DEFAULT_ERROR_MESSAGE = 'SOMETHING_WENT_WRONG' as const;

export const URL_PARAMS = {
    email: 'email',
    subject: 'subject',
    search: 'search',
    city: 'city',
    countryCode: 'countryCode',
    sector: 'sector',
    speciality: 'speciality',
    studyLevel: 'studyLevel',
    page: 'page',
    pageSize: 'pageSize',
    greenLabel: 'greenLabel',
    sortByCarbonFootprint: 'sortByCarbonFootprint',
} as const;
