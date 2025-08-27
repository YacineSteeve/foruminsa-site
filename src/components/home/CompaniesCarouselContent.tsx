'use client';

import { Tooltip } from '@heroui/tooltip';
import { Link } from '@lib/i18n/navigation';
import type { CompanyLogoListEntity } from '@lib/types/entities';
import { cn } from '@lib/utils';
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
    logos: CompanyLogoListEntity;
}

export const CompaniesCarouselContent: FunctionComponent<CompaniesCarouselContentProps> = ({
    logos,
}) => {
    const t = useTranslations('CompaniesCarouselContent');

    return (
        <div className="flex items-center size-full bg-black">
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
                            <div className="relative size-20 md:size-24 lg:size-28 xl:size-32">
                                <Image
                                    src={logo.logoUrl}
                                    alt={t('companyLogoAlt', { companyName: logo.name })}
                                    fill
                                    sizes="100%,100%"
                                    className="m-auto object-contain object-center"
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
                slidesToShow={3}
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
