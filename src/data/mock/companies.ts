import { forumRoomsData } from '@data/forum-rooms';
import { sectorsData } from '@data/sectors';
import { MOCK_DATA_SEED, SOCIAL_LINK_TYPES, SPECIALITIES, STUDY_LEVELS } from '@lib/constants/core';
import { COUNTRY_CODES } from '@lib/constants/countries';
import type { CompaniesData } from '@lib/types/data';
import { fakerFR as faker, fakerEN } from '@faker-js/faker';

faker.seed(MOCK_DATA_SEED);
fakerEN.seed(MOCK_DATA_SEED);

const COMPANY_COUNT = 100;

const companyNamesAndSlugs = faker.helpers
    .uniqueArray(faker.company.name, COMPANY_COUNT)
    .map((name) => ({
        name,
        slug: faker.helpers.slugify(name.toLowerCase()),
    }));

const sectorIds = sectorsData.map((sector) => sector.id);

const forumRoomIds = forumRoomsData.map((forumRoom) => forumRoom.id);

const capitalize = (str: string) => {
    if (str.length === 0) {
        return str;
    }

    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const companiesData: CompaniesData = faker.helpers.multiple(
    (_, index) => {
        const socialLinksCount = faker.number.int({ min: 1, max: 4 });

        const socialLinksTypes = faker.helpers.uniqueArray(
            () => faker.helpers.arrayElement(SOCIAL_LINK_TYPES),
            socialLinksCount,
        );

        return {
            id: index + 1,
            name: companyNamesAndSlugs[index]!.name,
            description: {
                fr:
                    capitalize(faker.word.words({ count: 10 })) +
                    '. ' +
                    faker.lorem.paragraph({ min: 5, max: 10 }),
                en:
                    capitalize(fakerEN.word.words({ count: 10 })) +
                    '. ' +
                    fakerEN.lorem.paragraph({ min: 5, max: 10 }),
            },
            logoFile: faker.helpers.arrayElement([
                'airbus.png',
                'atos.png',
                'bouygues-construction.png',
                'capgemini.png',
                'forum.png',
                'sopra-steria.png',
                'vinci.png',
                'lgm.png',
                'ekium.png',
            ]),
            providesGoodies: faker.datatype.boolean(),
            hasGreenTransport: faker.datatype.boolean(),
            studyLevels: faker.helpers.arrayElements(STUDY_LEVELS, { min: 1, max: 3 }),
            specialities: faker.helpers.arrayElements(SPECIALITIES, { min: 1, max: 4 }),
            address: faker.helpers.maybe(faker.location.streetAddress) ?? null,
            postalCode: faker.helpers.maybe(faker.location.zipCode) ?? null,
            city: faker.location.city(),
            countryCode: faker.helpers.arrayElement(COUNTRY_CODES),
            websiteUrl: faker.helpers.maybe(faker.internet.url) ?? null,
            hiringPlatformUrl: faker.helpers.maybe(faker.internet.url) ?? null,
            carbonFootprint:
                faker.helpers.maybe(
                    () => faker.helpers.arrayElement([0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]),
                    { probability: 0.95 },
                ) ?? null,
            socialLinks: faker.helpers.multiple(
                (_, index) => ({
                    type: socialLinksTypes[index]!,
                    url: faker.internet.url(),
                }),
                { count: socialLinksCount },
            ),
            roomId: faker.helpers.arrayElement(forumRoomIds),
            sectorIds: faker.helpers.uniqueArray(
                () => faker.helpers.arrayElement(sectorIds),
                faker.number.int({ min: 1, max: 4 }),
            ),
        };
    },
    { count: COMPANY_COUNT },
);
