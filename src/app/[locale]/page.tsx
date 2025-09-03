import { CarbonBalanceSection } from '@components/home/CarbonBalanceSection';
import { CompaniesCarouselSection } from '@components/home/CompaniesCarouselSection';
import { EventSection } from '@components/home/EventSection';
import { HeroSection } from '@components/home/HeroSection';
import { SolidarityFundSection } from '@components/home/SolidarityFundSection';
import { SuspenseBoundary } from '@components/ui/SuspenseBoundary';
import type { Locale } from 'next-intl';

interface HomePageProps {
    params: Promise<{
        locale: Locale;
    }>;
}

export default async function HomePage({ params }: HomePageProps) {
    const { locale } = await params;

    return (
        <div className="w-full min-h-screen">
            <SuspenseBoundary>
                <HeroSection locale={locale} />
            </SuspenseBoundary>
            <EventSection />
            <CarbonBalanceSection />
            <SolidarityFundSection />
            <CompaniesCarouselSection />
        </div>
    );
}
