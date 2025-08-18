import { CompanyGreenLabel } from '@components/companies/CompanyGreenLabel';
import { Card } from '@heroui/card';
import { Chip } from '@heroui/chip';
import { Link } from '@lib/i18n/navigation';
import type { CompanyEntity } from '@lib/types/entities';
import Image from 'next/image';
import type { FunctionComponent } from 'react';

interface CompanyCardProps {
    company: CompanyEntity;
}

const SECTOR_LIMIT = 2;

export const CompanyCard: FunctionComponent<CompanyCardProps> = ({ company }) => {
    return (
        <Link
            href={`/entreprises/${company.slug}`}
            className="relative block size-fit"
        >
            <Card
                isPressable
                isHoverable
                shadow="sm"
                className="group w-84 h-56 p-4 space-y-4"
            >
                <div className="flex gap-4 w-full">
                    <div className="relative size-24 rounded-lg border-2 border-default/50 overflow-hidden">
                        <Image
                            src={company.logoUrl}
                            alt={company.name}
                            fill
                            priority
                            quality={100}
                            sizes="100%,100%"
                            className="object-contain object-center group-hover:scale-110 transition-transform duration-300 ease-in-out"
                        />
                    </div>
                    <div className="flex-1 space-y-2">
                        <h4 className="text-start normal-case">{company.name}</h4>
                        {company.sectors.length > 0 && (
                            <div className="flex flex-wrap gap-x-2 gap-y-1">
                                {company.sectors.slice(0, SECTOR_LIMIT).map((sector, index) => (
                                    <Chip
                                        key={index}
                                        size="sm"
                                        color="primary"
                                        variant="flat"
                                        className="text-sm text-black p-1 rounded-full"
                                    >
                                        {sector.name}
                                    </Chip>
                                ))}
                                {company.sectors.length > SECTOR_LIMIT && (
                                    <Chip
                                        size="sm"
                                        variant="flat"
                                        className="text-sm text-black p-1 rounded-full"
                                    >
                                        {`+${company.sectors.length - SECTOR_LIMIT}`}
                                    </Chip>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <p className="text-start w-full line-clamp-3">{company.description}</p>
            </Card>
            {company.providesGoodies && company.hasGreenTransport && <CompanyGreenLabel />}
        </Link>
    );
};
