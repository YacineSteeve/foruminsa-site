import { CompaniesStats } from '@components/companies/CompaniesStats';
import { CompaniesStatsSkeleton } from '@components/companies/CompaniesStatsSkeleton';
import { getTranslations } from 'next-intl/server';
import { CompaniesList } from '@components/companies/CompaniesList';
import { CompaniesListSkeleton } from '@components/companies/CompaniesListSkeleton';
import { SuspenseBoundary } from '@components/ui/SuspenseBoundary';
import Image from 'next/image';

export default async function CompaniesPage() {
    const t = await getTranslations('CompaniesPage');
    
    return (
        <div className="w-full">
            <div className="relative w-full h-80 md:h-100 xl:h-120">
                <Image
                    src="/entretien_dos.jpg"
                    alt={t('altText')}
                    fill
                    priority
                    quality={100}
                    className="object-cover object-center brightness-50"
                />
                <div className="absolute -bottom-52 md:-bottom-24 left-1/2 -translate-x-1/2 flex max-md:flex-col items-center justify-evenly gap-4 w-7/8 sm:w-6/7 md:w-5/6 lg:w-4/5 xl:w-3/4 2xl:w-2/3 md:h-48 p-8 animate-appearance-in glassy">
                    <SuspenseBoundary fallback={<CompaniesStatsSkeleton />}>
                        <CompaniesStats />
                    </SuspenseBoundary>
                </div>
            </div>
            <div className="flex flex-col items-center gap-y-16 w-full px-4 md:px-10 lg:px-20 xl:px-40 2xl:px-60 py-40 max-md:pt-60">
                <div className="flex flex-col items-center gap-y-4 text-center">
                    <h1>{t('title')}</h1>
                    <p className="text-lg w-full sm:w-5/6 md:w-4/5 lg:w-3/4 xl:w-2/3 2xl:w-1/2">{t('description')}</p>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-12">
                    <SuspenseBoundary fallback={<CompaniesListSkeleton count={6}/>}>
                        <CompaniesList/>
                    </SuspenseBoundary>
                </ul>
            </div>
        </div>
    );
}
