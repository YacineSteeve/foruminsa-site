import { MOCK_DATA_SEED } from '@lib/constants/core';
import type { SectorsData } from '@lib/types/data';
import { fakerFR as faker, fakerEN } from '@faker-js/faker';

faker.seed(MOCK_DATA_SEED);
fakerEN.seed(MOCK_DATA_SEED);

const SECTOR_COUNT = 10;

const sectorNamesFR = faker.helpers.uniqueArray(faker.commerce.department, SECTOR_COUNT);
const sectorNamesEN = faker.helpers.uniqueArray(fakerEN.commerce.department, SECTOR_COUNT);

export const sectorsData: SectorsData = faker.helpers.multiple(
    (_, index) => ({
        id: index + 1,
        name: {
            fr: sectorNamesFR[index]!,
            en: sectorNamesEN[index]!,
        },
    }),
    { count: SECTOR_COUNT },
);
