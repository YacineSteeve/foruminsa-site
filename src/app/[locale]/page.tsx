import { CarbonBalanceSection } from '@components/home/CarbonBalanceSection';
import { CompaniesCarouselSection } from '@components/home/CompaniesCarouselSection';
import { EventSection } from '@components/home/EventSection';
import { HeroSection } from '@components/home/HeroSection';
import { SolidarityFundSection } from '@components/home/SolidarityFundSection';

export default function HomePage() {
    return (
        <div className="w-full min-h-screen">
            <HeroSection />
            <EventSection />
            <CarbonBalanceSection />
            <SolidarityFundSection />
            <CompaniesCarouselSection />
        </div>
    );
}
