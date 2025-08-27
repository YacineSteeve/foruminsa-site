import { BaseService } from '@lib/api-services/base';
import type { CompaniesFilters, CompanyKey } from '@lib/types/dtos';
import type {
    CityListEntity,
    CompanyEntity,
    CompaniesStatsEntity,
    PaginatedCompaniesEntity,
    CompanyLogoListEntity,
} from '@lib/types/entities';

export class CompanyService {
    public static async getAllCompanies(params: CompaniesFilters = {}) {
        return BaseService.get<PaginatedCompaniesEntity>('companies', { params });
    }

    public static async getCompanyByKey(key: CompanyKey) {
        return BaseService.get<CompanyEntity>(`companies/${key}`);
    }

    public static async getCompaniesStats() {
        return BaseService.get<CompaniesStatsEntity>('companies/stats');
    }

    public static async getAllCompaniesCities() {
        return BaseService.get<CityListEntity>('companies/cities');
    }

    public static async getAllCompanyLogos() {
        return BaseService.get<CompanyLogoListEntity>('companies/logos');
    }
}
