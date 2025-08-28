import { CompaniesCarouselContent } from '@components/home/CompaniesCarouselContent';
import { Loader } from '@components/ui/Loader';
import { SuspenseBoundary } from '@components/ui/SuspenseBoundary';
import { CompanyService } from '@lib/api-services';
import type { FunctionComponent, PropsWithChildren } from 'react';

export const CompaniesCarouselSection: FunctionComponent = () => {
    return (
        <SuspenseBoundary
            fallback={
                <CompaniesCarouselWrapper>
                    <div className="flex-center size-full">
                        <Loader />
                    </div>
                </CompaniesCarouselWrapper>
            }
        >
            <CompaniesCarousel />
        </SuspenseBoundary>
    );
};

const CompaniesCarousel: FunctionComponent = async () => {
    const logos = await CompanyService.getAllCompanyLogos();

    if (!logos || logos.length === 0) {
        return null;
    }

    return (
        <CompaniesCarouselWrapper>
            <CompaniesCarouselContent logos={logos} />
        </CompaniesCarouselWrapper>
    );
};

const CompaniesCarouselWrapper: FunctionComponent<PropsWithChildren> = ({ children }) => {
    return <section className="w-full h-60 md:h-80 bg-black">{children}</section>;
};
