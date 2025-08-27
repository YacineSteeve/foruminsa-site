import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

// The content that displays when a page is not found
export default async function NotFound() {
    const t = await getTranslations('NotFoundPage');

    return (
        <div className="flex justify-center w-full py-40">
            <div className="flex flex-col items-center gap-8">
                <Image
                    src="/not_found.svg"
                    alt={t('imageDescription')}
                    width={400}
                    height={400}
                    className="max-w-full max-h-full"
                />
                <h1>{t('title')}</h1>
                <p>{t('description')}</p>
            </div>
        </div>
    );
}
