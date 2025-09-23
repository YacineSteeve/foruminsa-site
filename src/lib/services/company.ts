import { companiesData } from '@data/companies';
import { forumRoomsData } from '@data/forum-rooms';
import { sectorsData } from '@data/sectors';
import type { CompaniesData } from '@lib/types/data';
import type {
    CityList,
    CompaniesFilters,
    CompaniesStatsEntity,
    CompanyLogoList,
    CountryList,
    ForumRoomFilter,
    ForumRoomList,
    PaginatedCompanyEntities,
    SectorEntityList,
} from '@lib/types/dtos';
import type { CompanyEntity, ForumRoomEntity } from '@lib/types/entities';
import { fakerFR as faker } from '@faker-js/faker';
import { hasGreenLabel, ServiceError } from '@lib/utils';

export class CompanyService {
    public static getAllCompanies(filters: CompaniesFilters = {}): PaginatedCompanyEntities {
        const filteredCompanies = companiesData.filter((companyData) => {
            return (
                (this.isNullish(filters.search) ||
                    companyData.name.toLowerCase().indexOf(filters.search.toLowerCase()) !== -1) &&
                (this.isNullish(filters.city) || companyData.city === filters.city) &&
                (this.isNullish(filters.countryCode) ||
                    companyData.countryCode === filters.countryCode) &&
                (this.isNullish(filters.sector) ||
                    companyData.sectorIds.includes(filters.sector)) &&
                (this.isNullish(filters.speciality) ||
                    companyData.specialities.includes(filters.speciality)) &&
                (this.isNullish(filters.studyLevel) ||
                    companyData.studyLevels.includes(filters.studyLevel)) &&
                (this.isNullish(filters.greenLabel) || hasGreenLabel(companyData))
            );
        });

        const page = filters.page ?? 1;
        const pageSize = filters.pageSize ?? 10;
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        if (!filters.sortByCarbonFootprint) {
            return {
                page,
                pageSize,
                totalElements: filteredCompanies.length,
                totalPages: Math.ceil(filteredCompanies.length / pageSize),
                data: filteredCompanies
                    .slice(startIndex, endIndex)
                    .map((companyData) => this.generateFullCompanyEntity(companyData)),
            };
        }

        const carbonBalanceRanks = this.getCarbonBalanceRanks();

        const fullCompanies = filteredCompanies.map((companyData) =>
            this.generateFullCompanyEntity(companyData, carbonBalanceRanks?.[companyData.id]),
        );

        fullCompanies.sort(
            (companyA, companyB) => companyA.carbonBalanceRank - companyB.carbonBalanceRank,
        );

        return {
            page,
            pageSize,
            totalElements: fullCompanies.length,
            totalPages: Math.ceil(fullCompanies.length / pageSize),
            data: fullCompanies.slice(startIndex, endIndex),
        };
    }

    public static getCompanyByKey(key: CompanyEntity['id'] | CompanyEntity['slug']): CompanyEntity {
        const companyData = companiesData.find(
            (companyData) =>
                companyData.id === key || this.slugifyCompanyName(companyData.name) === key,
        );

        if (!companyData) {
            throw new ServiceError('COMPANY_NOT_FOUND');
        }

        return this.generateFullCompanyEntity(companyData);
    }

    public static getCompaniesStats(): CompaniesStatsEntity {
        return {
            companiesCount: companiesData.length,
            sectorsCount: new Set(companiesData.flatMap((companyData) => companyData.sectorIds))
                .size,
            specialitiesCount: new Set(
                companiesData.flatMap((companyData) => companyData.specialities),
            ).size,
        };
    }

    public static getAllCompaniesCities(): CityList {
        return Array.from(new Set(companiesData.map((companyData) => companyData.city)));
    }

    public static getAllCompaniesCountries(): CountryList {
        return Array.from(new Set(companiesData.map((companyData) => companyData.countryCode)));
    }

    public static getAllCompaniesSectors(): SectorEntityList {
        const sectorIds = new Set(companiesData.flatMap((companyData) => companyData.sectorIds));

        const sectors = sectorsData.filter((sector) => sectorIds.has(sector.id));

        if (sectors.length !== sectorIds.size) {
            throw new ServiceError('SECTOR_NOT_FOUND');
        }

        return sectors;
    }

    public static getAllCompanyLogos(): CompanyLogoList {
        return companiesData.map((companyData) => ({
            id: companyData.id,
            name: companyData.name,
            slug: this.slugifyCompanyName(companyData.name),
            logoFile: companyData.logoFile,
        }));
    }

    public static getCompaniesGroupedByRoom(filter: ForumRoomFilter): ForumRoomList {
        const companiesByRoom = companiesData.reduce(
            (acc, company) => {
                if (company.roomId === null) {
                    return acc;
                }

                if (!(company.roomId in acc)) {
                    acc[company.roomId] = [];
                }

                acc[company.roomId]!.push({
                    id: company.id,
                    name: company.name,
                    slug: this.slugifyCompanyName(company.name),
                });

                return acc;
            },
            {} as Record<ForumRoomEntity['id'], ForumRoomList[number]['companies']>,
        );

        return Object.entries(companiesByRoom)
            .map(([roomId, companies]) => {
                const room = forumRoomsData.find((room) => room.id === Number(roomId));

                if (!room) {
                    throw new ServiceError('FORUM_ROOM_NOT_FOUND');
                }

                return {
                    room,
                    companies: companies.sort((companyA, companyB) =>
                        companyA.name.localeCompare(companyB.name),
                    ),
                };
            })
            .filter(
                (group) =>
                    group.room.floor === filter.floor &&
                    group.room.buildingNumber === filter.buildingNumber &&
                    (!filter.roomIds || filter.roomIds.includes(group.room.id)),
            )
            .toSorted((groupA, groupB) => groupA.room.name - groupB.room.name);
    }

    private static generateFullCompanyEntity(
        companyData: CompaniesData[number],
        carbonBalanceRank: CompanyEntity['carbonBalanceRank'] = 1,
    ): CompanyEntity {
        const room = forumRoomsData.find((forumRoom) => forumRoom.id === companyData.roomId);

        if (!room) {
            throw new ServiceError('FORUM_ROOM_NOT_FOUND');
        }

        const companySectors = new Set(companyData.sectorIds);

        const sectors = sectorsData.filter((sector) => companySectors.has(sector.id));

        const foundSectors = new Set(sectors.map((sector) => sector.id));

        const missingSectors = [...companySectors].filter(
            (sectorId) => !foundSectors.has(sectorId),
        );

        if (missingSectors.length > 0) {
            throw new ServiceError('SECTOR_NOT_FOUND');
        }

        return {
            id: companyData.id,
            name: companyData.name,
            logoFile: companyData.logoFile,
            hasGreenTransport: companyData.hasGreenTransport,
            providesGoodies: companyData.providesGoodies,
            carbonFootprint: companyData.carbonFootprint,
            address: companyData.address,
            postalCode: companyData.postalCode,
            city: companyData.city,
            countryCode: companyData.countryCode,
            websiteUrl: companyData.websiteUrl,
            hiringPlatformUrl: companyData.hiringPlatformUrl,
            roomId: companyData.roomId,
            carbonBalanceRank: carbonBalanceRank,
            sectorIds: Array.from(companyData.sectorIds),
            studyLevels: Array.from(companyData.studyLevels),
            specialities: Array.from(companyData.specialities),
            description: {
                fr: companyData.description.fr,
                en: companyData.description.en,
            },
            socialLinks: Array.from(companyData.socialLinks, (link) => ({
                type: link.type,
                url: link.url,
            })),
            slug: this.slugifyCompanyName(companyData.name),
            room,
            sectors,
        };
    }

    private static getCarbonBalanceRanks(): Record<CompanyEntity['id'], number> {
        return Object.fromEntries(
            companiesData
                .map((companyData) => ({
                    id: companyData.id,
                    carbonFootprint: companyData.carbonFootprint,
                    hasGreenLabel: hasGreenLabel(companyData),
                }))
                .toSorted((companyA, companyB) => {
                    if (companyA.carbonFootprint === companyB.carbonFootprint) {
                        return Number(companyB.hasGreenLabel) - Number(companyA.hasGreenLabel);
                    }

                    return (
                        (companyB.carbonFootprint ?? -Infinity) -
                        (companyA.carbonFootprint ?? -Infinity)
                    );
                })
                .map((company, index) => [company.id, index + 1]),
        );
    }

    private static slugifyCompanyName(name: string): string {
        return faker.helpers.slugify(name.toLowerCase());
    }

    private static isNullish(value: unknown): value is null | undefined {
        return value === undefined || value === null;
    }
}
