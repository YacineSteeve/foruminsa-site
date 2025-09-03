import { MOCK_DATA_SEED } from '@lib/constants/core';
import type { ForumRoomsData } from '@lib/types/data';
import { fakerFR as faker } from '@faker-js/faker';

faker.seed(MOCK_DATA_SEED);

const FORUM_ROOM_COUNT = 15;

export const forumRoomsData: ForumRoomsData = faker.helpers.multiple(
    (_, index) => {
        return {
            id: index + 1,
            name: faker.book.author(),
            floor: faker.number.int({ min: 1, max: 3 }),
            building: faker.number.int({ min: 5, max: 40 }).toString(),
        };
    },
    { count: FORUM_ROOM_COUNT },
);
