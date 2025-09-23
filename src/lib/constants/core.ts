import type { ForumRoomFilter } from '@lib/types/dtos';
import type { Time } from '@lib/types/primitives';

export const APP_URL =
    process.env.NODE_ENV === 'production'
        ? ('https://foruminsa-site.vercel.app' as const)
        : ('http://192.168.102.97:3000' as const);

export const JOBTEASER_EVENT_URL =
    'https://insa-toulouse.jobteaser.com/fr/events/262571-forum-by-insa-2025' as const;

export const EVENT_DAY = {
    year: 2025,
    month: 10,
    day: 21,
} as const;

export const EVENT_TIME = {
    start: { hours: 9, minutes: 0 },
    end: { hours: 16, minutes: 0 },
} as const satisfies { start: Time; end: Time };

export const STUDY_LEVELS = ['1A', '4A', '5A', 'ALTERNANCE_CONTRAT_PRO'] as const;

export const SPECIALITIES = ['AE', 'GB', 'GC', 'GM', 'GP', 'GP3E', 'IR', 'MA'] as const;

export const CONTACT_SUBJECTS = ['general', 'solidarityFund', 'companies'] as const;

export const SUPPORTED_LANGUAGES = ['fr', 'en'] as const;

export const DEFAULT_LANGUAGE = 'fr' as const;

export const LANGUAGE_METADATA = {
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
} as const satisfies Record<
    (typeof SUPPORTED_LANGUAGES)[number],
    { label: string; countryName: string; countryCode: string }
>;

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

export const MOCK_DATA_SEED = 21364890 as const;

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
    plan: 'plan',
} as const;

export const TABS = [
    {
        key: 'plan-1',
        image: 'rooms_plan_1.png',
        label: 'planOneLabel',
        filter: {
            floor: 1,
            buildingNumber: 20,
            roomIds: [5, 6, 7, 8],
        },
    },
    {
        key: 'plan-2',
        image: 'rooms_plan_2.png',
        label: 'planTwoLabel',
        filter: {
            floor: 1,
            buildingNumber: 20,
            roomIds: [9, 10, 11, 12, 13, 14, 15, 16, 17],
        },
    },
    {
        key: 'plan-3',
        image: 'rooms_plan_3.png',
        label: 'planThreeLabel',
        filter: {
            floor: 0,
            buildingNumber: 20,
            roomIds: null,
        },
    },
    {
        key: 'plan-4',
        image: 'rooms_plan_4.png',
        label: 'planFourLabel',
        filter: {
            floor: 3,
            buildingNumber: 17,
            roomIds: null,
        },
    },
] as const satisfies ReadonlyArray<{
    key: string;
    image: string;
    label: string;
    filter: ForumRoomFilter;
}>;

export const DEFAULT_TAB = TABS[0];

export const SHOW_CARBON_BALANCE_TABLE = true as const;
