import { ApiService } from '@lib/services/api';
import type { ContactData } from '@lib/types/dtos';

export class ContactService {
    public static async sendContactEmail(data: ContactData) {
        return ApiService.post('contact', { data });
    }
}
