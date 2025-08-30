import { Button } from '@heroui/button';
import { Link } from '@lib/i18n/navigation';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import type { FunctionComponent } from 'react';
import { LuLeaf } from 'react-icons/lu';

export const CarbonBalanceSection: FunctionComponent = async () => {
    const t = await getTranslations('CarbonBalanceSection');

    return (
        <section className="flex justify-evenly gap-8 w-full px-4 py-16 bg-black">
            <div className="max-lg:hidden relative size-80">
                <Image
                    src="/ecology.svg"
                    alt={t('imageOneAlt')}
                    fill
                    sizes="100%,100%"
                    className="object-contain object-center animate-float"
                />
            </div>
            <div className="flex flex-col items-center gap-8 lg:w-2/5">
                <div className="relative size-60">
                    <Image
                        src="/ecology2.svg"
                        alt={t('imageTwoAlt')}
                        fill
                        sizes="100%,100%"
                        className="object-contain object-center"
                    />
                </div>
                <div className="flex flex-col items-center gap-8">
                    <div className="flex flex-col items-center gap-4 text-center text-white">
                        <h2>{t('title')}</h2>
                        <p className="text-lg">{t('description')}</p>
                    </div>
                    <Link href="/bilan-carbone">
                        <Button
                            size="lg"
                            color="primary"
                            className="flex items-center text-xl p-6 border-2 border-primary"
                            startContent={<LuLeaf className="size-5" />}
                        >
                            {t('learnMore')}
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="max-lg:hidden relative size-80">
                <Image
                    src="/electric-car.svg"
                    alt={t('imageThreeAlt')}
                    fill
                    sizes="100%,100%"
                    className="object-contain object-center animate-float"
                />
            </div>
        </section>
    );
};
