import type { IconType } from 'react-icons';

export type GlobalRouteParams = {
    language: string;
};

export type MenuItem = {
    label: string;
    href: string;
};

type HexColor = `#${string}`;

export type SocialLink = {
    label: string;
    href: string;
    icon: IconType;
    color: HexColor;
};

export type TranslationGetter = {
    get: (key: string) => string;
};
