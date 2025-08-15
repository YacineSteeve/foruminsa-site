import { BaseService } from '@lib/api-services/base';
import type { SectorEntity } from '@lib/types/entities';

export class SectorService {
    public static async getAllSectors() {
        return BaseService.get<Array<SectorEntity>>('sectors');
    }
}
