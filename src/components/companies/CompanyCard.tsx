import { Card } from '@heroui/card';
import { Link } from '@lib/i18n/navigation';
import type { Company } from '@prisma/client';
import Image from 'next/image';
import type { FunctionComponent } from 'react';

interface CompanyCardProps {
    company: Company;
}

export const CompanyCard: FunctionComponent<CompanyCardProps> = ({ company }) => {
    return (
        <Link href={`/entreprises/${company.slug}`} className="block">
            <Card
                isPressable
                isHoverable
                shadow="sm"
                className="group w-80 h-52 p-4 space-y-4"
            >
                <div className="flex items-center gap-4 w-full">
                    <div className="relative size-20 overflow-hidden">
                        <Image
                            src={company.logoUrl}
                            alt={company.name}
                            fill
                            quality={100}
                            priority
                            className="object-contain object-center group-hover:scale-110 transition-transform duration-300 ease-in-out"
                        />
                    </div>
                    <div>
                        <h4 className="text-start flex-1">{company.name}</h4>
                    </div>
                </div>
                <p className="text-start w-full line-clamp-3">
                    {company.description}
                </p>
            </Card>
        </Link>
    );
};
