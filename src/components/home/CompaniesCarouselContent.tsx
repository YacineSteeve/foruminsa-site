'use client';

import { Tooltip } from '@heroui/tooltip';
import type { CompanyLogoList } from '@lib/services';
import { Link } from '@lib/i18n/navigation';
import { cn, getCompanyLogoUrl } from '@lib/utils';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import {
    Fragment,
    type FunctionComponent,
    type HTMLAttributes,
    type PropsWithChildren,
} from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface CompaniesCarouselContentProps {
    logos: CompanyLogoList;
}

export const CompaniesCarouselContent: FunctionComponent<CompaniesCarouselContentProps> = ({
    logos,
}) => {
    const t = useTranslations('CompaniesCarouselContent');

    return (
        <div className="flex items-center size-full">
            <CarouselVersionAdapter>
                {logos.map((logo) => (
                    <Link
                        key={logo.id}
                        href={`/entreprises/${logo.slug}`}
                        className="size-fit"
                    >
                        <Tooltip
                            content={logo.name}
                            placement="top"
                            delay={300}
                        >
                            <div className="size-fit p-2 md:p-4 bg-white rounded-xl md:rounded-2xl">
                                <Image
                                    src={getCompanyLogoUrl(logo.logoFile)}
                                    alt={t('companyLogoAlt', { companyName: logo.name })}
                                    width={80}
                                    height={80}
                                    sizes="100%,100%"
                                    className="w-20 md:w-24 lg:w-28 xl:w-32 2xl:w-36 3xl:w-40 h-auto m-auto"
                                />
                            </div>
                        </Tooltip>
                    </Link>
                ))}
            </CarouselVersionAdapter>
        </div>
    );
};

const CarouselVersionAdapter: FunctionComponent<PropsWithChildren> = ({ children }) => {
    return (
        <Fragment>
            <CarouselVersion
                slidesToShow={6}
                className="hidden 2xl:block"
            >
                {children}
            </CarouselVersion>
            <CarouselVersion
                slidesToShow={5}
                className="hidden xl:max-2xl:block"
            >
                {children}
            </CarouselVersion>
            <CarouselVersion
                slidesToShow={4}
                className="hidden lg:max-xl:block"
            >
                {children}
            </CarouselVersion>
            <CarouselVersion
                slidesToShow={2}
                className="hidden max-lg:block"
            >
                {children}
            </CarouselVersion>
        </Fragment>
    );
};

interface CarouselVersionProps extends PropsWithChildren {
    slidesToShow: number;
    className: HTMLAttributes<HTMLDivElement>['className'];
}

const CarouselVersion: FunctionComponent<CarouselVersionProps> = ({
    slidesToShow,
    className,
    children,
}) => {
    return (
        <div className={cn('w-full h-fit slider-container', className)}>
            <Slider
                accessibility
                draggable
                infinite
                focusOnSelect
                pauseOnFocus
                pauseOnHover
                swipeToSlide
                autoplay
                centerMode
                autoplaySpeed={500}
                speed={2000}
                arrows={false}
                slidesToShow={slidesToShow}
            >
                {children}
            </Slider>
        </div>
    );
};
