import type { useTranslations } from 'next-intl';
import type { IconType } from 'react-icons';

export type GlobalRouteParams = {
    locale: string;
};

export type TranslationKey = Parameters<ReturnType<typeof useTranslations>>[0];

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
