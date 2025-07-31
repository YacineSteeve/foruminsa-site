'use client';

import { useTranslations } from 'next-intl';
import Image, { type ImageProps } from 'next/image';
import type { FunctionComponent } from 'react';

interface LogoProps extends Omit<ImageProps, 'src' | 'alt'> {}

export const Logo: FunctionComponent<LogoProps> = (props) => {
    const t = useTranslations('Logo');

    return (
        <Image
            src="/logo_line.png"
            alt={t('altText')}
            width={256}
            height={44}
            {...props}
            quality={100}
        />
    );
};
