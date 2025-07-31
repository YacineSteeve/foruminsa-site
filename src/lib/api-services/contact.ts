import { BaseService } from '@lib/api-services/base';
import type { ContactData } from '@lib/types';

export class ContactService {
    public static async sendContactEmail(data: ContactData) {
        return BaseService.post('contact', { data });
    }
}
