export const APP_URL =
    process.env.NODE_ENV === 'production'
        ? ('https://foruminsa-site.vercel.app' as const)
        : ('http://192.168.1.227:3000' as const);

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
        href: '/fond-de-solidarite',
    },
    {
        label: 'contact',
        href: '/contact',
    },
] as const;

export const CONTACT_SUBJECTS = ['general', 'solidarityFund', 'companies'] as const;

export const STUDY_LEVELS = ['1A', '2A', '3A', '4A', '5A'] as const;

export const SPECIALITIES = ['AE', 'GB', 'GC', 'GM', 'GP', 'GP3E', 'IR', 'MA'] as const;

export const SOCIAL_LINK_TYPES = ['facebook', 'instagram', 'linkedin', 'x', 'youtube', 'tiktok', 'other'] as const;

export const URL_PARAMS = {
    email: 'email',
    city: 'city',
    country: 'country',
    sector: 'sector',
    speciality: 'speciality',
    studyLevel: 'studyLevel',
    page: 'page',
} as const;

export const DEFAULT_ERROR_MESSAGE = 'SOMETHING_WENT_WRONG' as const;

export const PASSWORD_HASHING_ROUNDS = 10 as const;

export const COMPANIES_PAGE_SIZE = 18 as const;
