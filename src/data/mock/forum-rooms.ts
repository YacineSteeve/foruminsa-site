import { MOCK_DATA_SEED } from '@lib/constants/core';
import type { ForumRoomsData } from '@lib/types/data';
import { fakerFR as faker } from '@faker-js/faker';

faker.seed(MOCK_DATA_SEED);

const buildingNames = faker.helpers.uniqueArray(faker.book.author, 2);

export const forumRoomsData: ForumRoomsData = [
    ...[5, 6, 7, 9].map((nameSuffix) => ({
        floor: 0,
        buildingNumber: 20,
        buildingName: buildingNames[0]!,
        nameSuffix,
    })),
    ...faker.helpers
        .uniqueArray(() => faker.number.int({ min: 1, max: 12 }), 12)
        .toSorted((a, b) => a - b)
        .map((nameSuffix) => ({
            floor: 1,
            buildingNumber: 20,
            buildingName: buildingNames[0]!,
            nameSuffix,
        })),
    ...[12, 14, 16].map((nameSuffix) => ({
        floor: 3,
        buildingNumber: 17,
        buildingName: buildingNames[1]!,
        nameSuffix,
    })),
].map((item, index) => ({
    id: index + 1,
    name: item.floor * 100 + item.nameSuffix,
    floor: item.floor,
    buildingNumber: item.buildingNumber,
    buildingName: item.buildingName,
}));
