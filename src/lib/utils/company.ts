import type { CompanyEntity, SocialLink } from '@lib/types/entities';
import { z } from 'zod/v4';

export const getCompanyLogoUrl = (logo: CompanyEntity['logoFile']): string => {
    if (z.url({ protocol: /^https?$/ }).safeParse(logo).success) {
        return logo;
    } else {
        return `/companies-logos/${logo}`;
    }
};

export const getSortedSocialLinks = (links: Array<SocialLink>): Array<SocialLink> => {
    return links.toSorted((a, b) => {
        if (a.type === 'other' && b.type !== 'other') {
            return 1;
        }

        if (a.type !== 'other' && b.type === 'other') {
            return -1;
        }

        return a.type.localeCompare(b.type);
    });
};

export const buildGoogleMapsUrl = (
    location: Pick<CompanyEntity, 'address' | 'postalCode' | 'city' | 'countryCode'>,
): string => {
    const parts = [
        location.address,
        location.city,
        location.postalCode,
        location.countryCode,
    ].filter(Boolean);

    const query = encodeURIComponent(parts.join(', '));

    return `https://www.google.com/maps/search/?api=1&query=${query}`;
};

export const hasGreenLabel = (
    company: Pick<CompanyEntity, 'providesGoodies' | 'hasGreenTransport'>,
): boolean => {
    return company.hasGreenTransport && !company.providesGoodies;
};

export const getStarsSequenceFromCarbonFootprint = (
    carbonFootprint: NonNullable<CompanyEntity['carbonFootprint']>,
): Array<'full' | 'half' | 'empty'> => {
    const integerPart = Math.floor(carbonFootprint);
    const sequence = [] as Array<'full' | 'half' | 'empty'>;

    for (let i = 0; i < integerPart; i++) {
        sequence.push('full');
    }

    if (carbonFootprint - integerPart === 0.5) {
        sequence.push('half');
    }

    for (let i = sequence.length; i < 5; i++) {
        sequence.push('empty');
    }

    return sequence;
};
