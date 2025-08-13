import { BaseService } from '@lib/api-services/base';
import type { CompaniesFilters } from '@lib/types/dtos';
import type { CompanyEntity, CompaniesStatsEntity, PaginatedCompaniesEntity } from '@lib/types/entities';
import type { Company } from '@prisma/client';

export class CompanyService {
    public static async getAllCompanies(params: CompaniesFilters = {}) {
        return BaseService.get<PaginatedCompaniesEntity>('companies', { params });
    }
    
    public static async getCompanyByKey(key: Company['id'] | Company['slug']) {
        return BaseService.get<CompanyEntity>(`companies/${key}`);
    }
    
    public static async getCompaniesStats() {
        return BaseService.get<CompaniesStatsEntity>('companies/stats');
    }
}
