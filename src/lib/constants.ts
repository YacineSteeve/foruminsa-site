import { Lato } from 'next/font/google';
import type { MenuItem, SocialLink } from '@lib/types';
import { RiFacebookBoxFill, RiInstagramFill } from 'react-icons/ri';

export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || ('http://localhost:3000' as const);

export const SUPPORTED_LANGUAGES = {
    FR: 'fr',
    EN: 'en',
} as const;

export const DEFAULT_LANGUAGE = SUPPORTED_LANGUAGES.FR;

export const COLORS = {
    primary: '#bd2727',
    primaryLight: '#d32f2f',
} as const;

export const APP_FONT = Lato({
    subsets: ['latin'],
    weight: ['100', '300', '400', '700', '900'],
});

export const MENU_ITEMS: Array<MenuItem> = [
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

export const SOCIAL_LINKS: Array<SocialLink> = [
    {
        label: 'Facebook',
        href: 'https://www.facebook.com/ForumbyINSA',
        icon: RiFacebookBoxFill,
        color: '#1877f2'
    },
    {
        label: 'Instagram',
        href: '',
        icon: RiInstagramFill,
        color: '#c13584',
    }
] as const;
