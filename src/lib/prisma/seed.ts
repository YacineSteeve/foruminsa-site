import { PASSWORD_HASHING_ROUNDS, SOCIAL_LINK_TYPES, SPECIALITIES, STUDY_LEVELS } from '@lib/constants/core';
import { COUNTRY_CODES } from '@lib/constants/countries';
import { prismaClient } from '@lib/prisma/client';
import { fakerFR as faker } from '@faker-js/faker';
import { hash } from 'bcrypt';

const COMPANY_COUNT = 100;
const SECTOR_COUNT = 10;
const FORUM_ROOM_COUNT = 15;

const main = async () => {
    try {
        await prismaClient.$connect();
        
        const companyNamesAndSlugs = faker.helpers.uniqueArray(
            faker.company.name,
            COMPANY_COUNT,
        ).map((name) => ({
            name,
            slug: faker.helpers.slugify(name.toLowerCase()),
        }));
        
        const sectorNames = faker.helpers.uniqueArray(
            faker.commerce.department,
            SECTOR_COUNT,
        );
        
        await prismaClient.$transaction(async (transaction) => {
            // Clear existing data
            await transaction.forumRoom.deleteMany();
            await transaction.sector.deleteMany();
            await transaction.socialLink.deleteMany();
            await transaction.company.deleteMany();
            
            if (process.env.ADMIN_EMAIL !== undefined && process.env.ADMIN_PASSWORD !== undefined) {
                await transaction.admin.deleteMany();
                
                const hashedAdminPassword = await hash(process.env.ADMIN_PASSWORD, PASSWORD_HASHING_ROUNDS);
                
                await transaction.admin.create({
                    data: {
                        email: process.env.ADMIN_EMAIL,
                        password: hashedAdminPassword,
                    },
                });
            } else if (process.env.ADMIN_EMAIL !== undefined && process.env.ADMIN_PASSWORD === undefined) {
                throw new Error('ADMIN_PASSWORD is not set. Please set it in the environment variables.');
            } else if (process.env.ADMIN_EMAIL === undefined && process.env.ADMIN_PASSWORD !== undefined) {
                throw new Error('ADMIN_EMAIL is not set. Please set it in the environment variables.');
            } else {
                console.warn('ADMIN_EMAIL and ADMIN_PASSWORD are not set. Skipping admin creation.');
            }
            
            const sectors = await transaction.sector.createManyAndReturn({
                data: Array.from({ length: SECTOR_COUNT }, (_, index) => ({
                    name: sectorNames[index]!,
                })),
                select: {
                    id: true,
                },
            });
            
            const forumRooms = await transaction.forumRoom.createManyAndReturn({
                data: Array.from({ length: FORUM_ROOM_COUNT }, () => ({
                    name: faker.book.author(),
                    floor: faker.number.int({ min: 1, max: 3 }),
                    building: faker.number.int({ min: 5, max: 40 }).toString(),
                })),
                select: {
                    id: true,
                },
            });
            
            const sectorIds = sectors.map((sector) => sector.id);
            const forumRoomIds = forumRooms.map((room) => room.id);
            
            for (let i = 0; i < COMPANY_COUNT; i++) {
                const companyNameAndSlug = companyNamesAndSlugs[i];
                
                if (!companyNameAndSlug) {
                    console.warn(`Skipping company at index ${i} due to missing data.`);
                    continue;
                }
                
                const socialLinksCount = faker.number.int({ min: 1, max: 4 });
                
                const socialLinksTypes = faker.helpers.uniqueArray(
                    () => faker.helpers.arrayElement(SOCIAL_LINK_TYPES),
                    socialLinksCount
                );
                
                await transaction.company.create({
                    data: {
                        name: companyNameAndSlug.name,
                        slug: companyNameAndSlug.slug,
                        description: faker.lorem.paragraph({ min: 2, max: 4 }),
                        logoUrl: faker.image.avatarGitHub(),
                        providesGoodies: faker.datatype.boolean(),
                        hasGreenTransport: faker.datatype.boolean(),
                        studyLevels: faker.helpers.arrayElements(
                            STUDY_LEVELS,
                            { min: 1, max: 3 }
                        ).join(','),
                        specialities: faker.helpers.arrayElements(
                            SPECIALITIES,
                            { min: 1, max: 4 }
                        ).join(','),
                        address: faker.helpers.maybe(faker.location.streetAddress),
                        postalCode: faker.helpers.maybe(faker.location.zipCode),
                        city: faker.location.city(),
                        country: faker.helpers.arrayElement(COUNTRY_CODES),
                        websiteUrl: faker.helpers.maybe(faker.internet.url),
                        carbonFootprint: faker.number.float({ min:  0, max: 100, fractionDigits: 2 }),
                        sectors: {
                            connect: faker.helpers.uniqueArray(
                                () => faker.helpers.arrayElement(sectorIds),
                                faker.number.int({ min: 1, max: 3 }),
                            ).map((sectorId) => ({
                                id: sectorId
                            })),
                        },
                        socialLinks: {
                            createMany: {
                                data: Array.from({ length: socialLinksCount }, (_, index) => ({
                                    type: socialLinksTypes[index]!,
                                    url: faker.internet.url(),
                                })),
                            },
                        },
                        room: {
                            connect: {
                                id: faker.helpers.arrayElement(forumRoomIds),
                            },
                        },
                    },
                });
            }
        });
    } catch (error) {
        console.error('Error during Prisma seeding:', error);
        process.exit(1);
    } finally {
        await prismaClient.$disconnect();
    }
};

void main();
