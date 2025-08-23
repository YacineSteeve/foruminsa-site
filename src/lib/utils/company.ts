import { SPECIALITIES, STUDY_LEVELS } from '@lib/constants/core';
import type { Speciality, StudyLevel } from '@lib/types/core';
import type { CompanyEntity, SocialLinkEntity } from '@lib/types/entities';

const isSpeciality = (value: string): value is Speciality => {
    return SPECIALITIES.includes(value as Speciality);
};

export const parseSpecialities = (raw: string): Array<Speciality> => {
    return raw
        .split(',')
        .map((part) => part.trim())
        .filter(isSpeciality);
};

const isStudyLevel = (value: string): value is StudyLevel => {
    return STUDY_LEVELS.includes(value as StudyLevel);
};

export const parseStudyLevels = (raw: string): Array<StudyLevel> => {
    return raw
        .split(',')
        .map((part) => part.trim())
        .filter(isStudyLevel);
};

export const getSortedSocialLinks = (links: Array<SocialLinkEntity>): Array<SocialLinkEntity> => {
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
