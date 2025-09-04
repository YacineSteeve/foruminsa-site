import { Card } from '@heroui/card';
import { Chip } from '@heroui/chip';
import { Tooltip } from '@heroui/tooltip';
import { Link } from '@lib/i18n/navigation';
import type { CompanyEntity } from '@lib/types/entities';
import type { Locale } from 'next-intl';
import Image from 'next/image';
import type { FunctionComponent } from 'react';

interface CompanyCardProps {
    company: CompanyEntity;
    logoAlt: string;
    locale: Locale;
}

const DISPLAYED_SECTORS = 2;

export const CompanyCard: FunctionComponent<CompanyCardProps> = ({ company, logoAlt, locale }) => {
    return (
        <Link
            href={`/entreprises/${company.slug}`}
            className="block size-fit"
        >
            <Card
                isPressable
                isHoverable
                shadow="sm"
                className="group w-84 h-56 p-4 space-y-4"
            >
                <div className="flex gap-4 w-full">
                    <div className="relative size-24 min-w-24 rounded-lg border-2 border-default/50 overflow-hidden">
                        <Image
                            src={company.logoFile}
                            alt={logoAlt}
                            fill
                            priority
                            quality={100}
                            sizes="100%,100%"
                            className="object-contain object-center group-hover:scale-110 transition-transform duration-300 ease-in-out"
                        />
                    </div>
                    <div className="max-h-24 flex-1 space-y-2 overflow-hidden">
                        <h4 className="text-start !normal-case">{company.name}</h4>
                        {company.sectors.length > 0 && (
                            <div className="flex flex-wrap gap-x-2 gap-y-1 w-full max-w-full">
                                {company.sectors
                                    .slice(0, DISPLAYED_SECTORS)
                                    .map((sector, index) => (
                                        <Chip
                                            key={index}
                                            size="sm"
                                            color="primary"
                                            variant="flat"
                                            title={sector.name[locale]}
                                            classNames={{
                                                base: 'min-w-auto max-w-36 text-sm text-black p-1 rounded-full',
                                                content: 'block w-full truncate',
                                            }}
                                        >
                                            {sector.name[locale]}
                                        </Chip>
                                    ))}
                                {company.sectors.length > DISPLAYED_SECTORS && (
                                    <Tooltip
                                        content={
                                            <ul className="p-2 space-y-2 list-disc list-inside">
                                                {company.sectors.map((sector) => (
                                                    <li
                                                        key={sector.id}
                                                        className="text-base"
                                                    >
                                                        {sector.name[locale]}
                                                    </li>
                                                ))}
                                            </ul>
                                        }
                                    >
                                        <Chip
                                            size="sm"
                                            variant="flat"
                                            className="text-sm text-black p-1 rounded-full"
                                        >
                                            {`+${company.sectors.length - DISPLAYED_SECTORS}`}
                                        </Chip>
                                    </Tooltip>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <p className="text-start w-full line-clamp-3">{company.description[locale]}</p>
            </Card>
        </Link>
    );
};
