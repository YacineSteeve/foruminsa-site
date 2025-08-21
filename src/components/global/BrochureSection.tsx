import { Button } from '@heroui/button';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import type { FunctionComponent } from 'react';
import { RiDownload2Fill } from 'react-icons/ri';

export const BrochureSection: FunctionComponent = async () => {
    const t = await getTranslations('BrochureSection');

    return (
        <section className="flex-center max-md:flex-col gap-x-16 gap-y-8 w-full py-24 bg-default/10">
            <Image
                src="/plaquette_couverture.svg"
                alt={t('imageAlt')}
                width={284}
                height={402}
                quality={100}
                className="shadow-lg border border-default/25"
            />
            <Link
                href="/Plaquette_2025.pdf"
                download={t('brochureFileName')}
                target="_blank"
            >
                <Button
                    size="lg"
                    color="primary"
                    variant="ghost"
                    className="text-xl px-6 py-8"
                    startContent={<RiDownload2Fill className="size-6" />}
                >
                    {t('downloadBrochure')}
                </Button>
            </Link>
        </section>
    );
};
