import { CarbonFootprintSection } from '@components/home/CarbonFootprintSection';
import { CompaniesCarouselSection } from '@components/home/CompaniesCarouselSection';
import { EventSection } from '@components/home/EventSection';
import { HeroSection } from '@components/home/HeroSection';

export default function HomePage() {
    return (
        <div className="w-full min-h-screen">
            <HeroSection />
            <EventSection />
            <CarbonFootprintSection />
            <section className="h-100">{/* Solidarity Fund */}</section>
            <CompaniesCarouselSection />
        </div>
    );
}
