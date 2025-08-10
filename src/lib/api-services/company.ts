import { BaseService } from '@lib/api-services/base';
import type { CompaniesStats } from '@lib/types';
import type { Company } from '@prisma/client';

export class CompanyService {
    public static async getAllCompanies() {
        return BaseService.get<Array<Company>>('companies');
    }
    
    public static async getCompanyByKey(key: Company['id'] | Company['slug']) {
        return BaseService.get<Company>(`companies/${key}`);
    }
    
    public static async getCompaniesStats() {
        return BaseService.get<CompaniesStats>('companies/stats');
    }
}
