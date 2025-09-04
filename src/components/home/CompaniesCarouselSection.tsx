import { CompaniesCarouselContent } from '@components/home/CompaniesCarouselContent';
import { CompanyService } from '@lib/services';
import type { FunctionComponent } from 'react';

export const CompaniesCarouselSection: FunctionComponent = () => {
    const logos = CompanyService.getAllCompanyLogos();

    if (logos.length === 0) {
        return null;
    }

    return (
        <section className="w-full h-60 md:h-80 bg-black">
            <CompaniesCarouselContent logos={logos} />
        </section>
    );
};
