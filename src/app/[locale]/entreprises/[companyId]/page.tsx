import type { Metadata } from 'next';
//import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
    // const t = await getTranslations('AppMetadata');
    
    return {
        title: 'Company',
    };
}

export default function CompanyDetailsPage() {
    return null;
}
