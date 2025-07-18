import type { MenuItem } from '@lib/types';

export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || ('http://localhost:3000' as const);

export const PRIMARY_COLOR = '#bd2727' as const;

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
