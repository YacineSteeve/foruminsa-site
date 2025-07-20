import {} from 'react-icons';
import type { MenuItem, SocialLink } from '@lib/types';
import { RiFacebookBoxFill, RiInstagramFill } from 'react-icons/ri';

export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || ('http://localhost:3000' as const);

export const COLORS = {
    primary: '#bd2727',
    primaryLight: '#d32f2f',
} as const;

export const MENU_ITEMS: Array<MenuItem> = [
    {
        label: 'Accueil',
        href: '/',
    },
    {
        label: 'Événement',
        href: '/evenement',
    },
    {
        label: 'Entreprises',
        href: '/entreprises',
    },
    {
        label: 'Bilan Carbone',
        href: '/bilan-carbone',
    },
    {
        label: 'Fond de Solidarité',
        href: '/fond-de-solidarite',
    },
    {
        label: 'Contact',
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
