import { Lato } from 'next/font/google';
import type { IconType } from 'react-icons';
import {
    RiFacebookBoxFill,
    RiInstagramFill,
    RiLinkedinBoxFill,
    RiLinksFill,
    RiTiktokFill,
    RiTwitterXFill,
    RiYoutubeFill,
} from 'react-icons/ri';
import { SOCIAL_LINK_TYPES } from './core';

export const APP_CONTAINER_ID = 'app-container' as const;

export const APP_COLORS = {
    primary: '#bd2727',
    primaryLight: '#d32f2f',
} as const;

export const APP_FONT = Lato({
    subsets: ['latin'],
    weight: ['100', '300', '400', '700', '900'],
});

export const SOCIAL_LINKS_TYPES_METADATA: Record<
    (typeof SOCIAL_LINK_TYPES)[number],
    { icon: IconType; color: string }
> = {
    facebook: {
        icon: RiFacebookBoxFill,
        color: '#1877f2',
    },
    instagram: {
        icon: RiInstagramFill,
        color: '#c13584',
    },
    linkedin: {
        icon: RiLinkedinBoxFill,
        color: '#0077b5',
    },
    x: {
        icon: RiTwitterXFill,
        color: '#000000',
    },
    youtube: {
        icon: RiYoutubeFill,
        color: '#ff0000',
    },
    tiktok: {
        icon: RiTiktokFill,
        color: '#69c9d0',
    },
    other: {
        icon: RiLinksFill,
        color: '#808080',
    },
} as const;

export const FORUM_SOCIAL_LINKS = [
    {
        label: 'facebook',
        href: 'https://www.facebook.com/ForumbyINSA',
        icon: SOCIAL_LINKS_TYPES_METADATA.facebook.icon,
        color: SOCIAL_LINKS_TYPES_METADATA.facebook.color,
    },
    {
        label: 'instagram',
        href: 'https://www.instagram.com/forumbyinsa/',
        icon: SOCIAL_LINKS_TYPES_METADATA.instagram.icon,
        color: SOCIAL_LINKS_TYPES_METADATA.instagram.color,
    },
    {
        label: 'linkedin',
        href: 'https://www.linkedin.com/company/forumbyinsa/',
        icon: SOCIAL_LINKS_TYPES_METADATA.linkedin.icon,
        color: SOCIAL_LINKS_TYPES_METADATA.linkedin.color,
    },
] as const;
