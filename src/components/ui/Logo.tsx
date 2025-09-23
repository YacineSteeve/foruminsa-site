'use client';

import { useTranslations } from 'next-intl';
import Image, { type ImageProps } from 'next/image';
import type { FunctionComponent } from 'react';

export const Logo: FunctionComponent<Omit<ImageProps, 'src' | 'alt'>> = (props) => {
    const t = useTranslations('Logo');

    return (
        <Image
            src="/logo_line.png"
            alt={t('logoAlt')}
            width={256}
            height={44}
            {...props}
            quality={100}
        />
    );
};
