import type { CompanyEntity, SocialLink } from '@lib/types/entities';

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
