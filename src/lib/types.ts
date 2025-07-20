import type { IconType } from 'react-icons';

export type MenuItem = {
    label: string;
    href: string;
};

type HexColor = `#${string}`

export type SocialLink = {
    label: string;
    href: string;
    icon: IconType;
    color: HexColor;
}
