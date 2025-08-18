'use client';

import { ScrollToTopButton } from '@components/global/ScrollToTopButton';
import { Logo } from '@components/ui/Logo';
import { Avatar } from '@heroui/avatar';
import { Button } from '@heroui/button';
import { Form } from '@heroui/form';
import { Input } from '@heroui/input';
import { Select, SelectItem } from '@heroui/select';
import { LANGUAGE_METADATA, MENU_ITEMS, URL_PARAMS } from '@lib/constants/core';
import { FORUM_SOCIAL_LINKS } from '@lib/constants/ui';
import { useInView } from '@lib/hooks';
import { Link, usePathname, useRouter } from '@lib/i18n/navigation';
import { type Locale, useLocale, useTranslations } from 'next-intl';
import {
    type ChangeEventHandler,
    type FormEventHandler,
    Fragment,
    type FunctionComponent,
    type PropsWithChildren,
    useCallback,
    useState,
} from 'react';
import { RiTranslate2 } from 'react-icons/ri';

export const Footer: FunctionComponent = () => {
    const { ref, inView: showScrollToTop } = useInView();
    const t = useTranslations('Footer');

    return (
        <Fragment>
            <ScrollToTopButton hidden={!showScrollToTop} />
            <footer
                ref={ref}
                className="w-full h-max px-4 md:px-10 lg:px-20 xl:px-40 2xl:px-60 pt-12 md:pt-20 xl:pt-24 max-md:text-center bg-primary/5"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-16 gap-y-8 w-full pb-16">
                    <section className="flex flex-col gap-8 max-md:items-center">
                        <Logo />
                        <p>{t('about')}</p>
                    </section>
                    <FooterSection title={t('pages')}>
                        <FooterPagesList />
                    </FooterSection>
                    <FooterSection title={t('contactUs')}>
                        <FooterContactForm />
                    </FooterSection>
                    <div className="flex flex-col max-md:items-center gap-y-8 md:gap-y-16">
                        <FooterSection title={t('followUs')}>
                            <FooterSocialLinks />
                        </FooterSection>
                        <FooterLanguageSelector />
                    </div>
                </div>
                <hr />
                <FooterCopyRight />
            </footer>
        </Fragment>
    );
};

interface FooterSectionProps extends PropsWithChildren {
    title: string;
}

const FooterSection: FunctionComponent<FooterSectionProps> = ({ title, children }) => {
    return (
        <section className="space-y-4">
            <h3>{title}</h3>
            {children}
        </section>
    );
};

const FooterPagesList: FunctionComponent = () => {
    const t = useTranslations('Navigation');

    return (
        <nav>
            <ul className="space-y-4">
                {MENU_ITEMS.map((item) => (
                    <li key={item.href}>
                        <Link
                            href={item.href}
                            className="text-lg hover:text-primary hover:font-semibold"
                        >
                            {t(item.label)}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

const FooterContactForm: FunctionComponent = () => {
    const router = useRouter();
    const t = useTranslations('FooterContactForm');

    const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
        (event) => {
            event.preventDefault();

            const formData = new FormData(event.currentTarget);

            const email = formData.get('email') as string;

            const contactUrl = new URL(
                MENU_ITEMS.find((item) => item.label === 'contact')?.href ?? '/contact',
                window.location.origin,
            );
            contactUrl.searchParams.set(URL_PARAMS.email, email);

            event.currentTarget.reset();

            router.push(contactUrl.toString());
        },
        [router],
    );

    return (
        <Form
            onSubmit={handleSubmit}
            className="flex flex-col max-md:items-center gap-4 w-full *:w-full"
        >
            <Input
                name="email"
                type="email"
                variant="faded"
                isRequired
                aria-label={t('emailLabel')}
                placeholder={t('emailPlaceholder')}
                errorMessage={t('emailErrorMessage')}
            />
            <Button
                name="submit"
                type="submit"
                variant="solid"
                color="primary"
                fullWidth
            >
                {t('submitButtonLabel')}
            </Button>
        </Form>
    );
};

const FooterSocialLinks: FunctionComponent = () => {
    const t = useTranslations('SocialLinks');

    return (
        <ul className="flex flex-wrap max-md:justify-center gap-8">
            {FORUM_SOCIAL_LINKS.map((socialLink) => {
                const Icon = socialLink.icon;

                return (
                    <li key={socialLink.href}>
                        <Link
                            href={socialLink.href}
                            target="_blank"
                            className="group"
                        >
                            <Icon
                                className="size-12 group-hover:text-(--icon-color) transition-all"
                                style={{
                                    // @ts-expect-error TS2353: Object literal may only specify known properties, and '--icon-color' does not exist in type Properties<string | number, string & {}>
                                    '--icon-color': socialLink.color,
                                }}
                                aria-label={t(socialLink.label)}
                            />
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
};

const FooterLanguageSelector: FunctionComponent = () => {
    const router = useRouter();
    const href = usePathname();
    const locale = useLocale();
    const t = useTranslations('FooterLanguageSelector');

    const handleLanguageChange = useCallback<ChangeEventHandler<HTMLSelectElement>>(
        (event) => {
            const locale = event.target.value as Locale;

            router.replace(href, { locale });
        },
        [router, href],
    );

    return (
        <Select
            name="language"
            size="lg"
            color="primary"
            className="w-40"
            variant="underlined"
            disallowEmptySelection
            aria-label={t('label')}
            startContent={<RiTranslate2 className="size-8" />}
            selectedKeys={[locale]}
            onChange={handleLanguageChange}
            popoverProps={{
                shouldBlockScroll: true,
                shouldCloseOnBlur: true,
                shouldCloseOnScroll: false,
            }}
            listboxProps={{
                emptyContent: t('noOptions'),
            }}
        >
            {Object.entries(LANGUAGE_METADATA).map(([language, metadata]) => (
                <SelectItem
                    key={language}
                    startContent={
                        <Avatar
                            showFallback
                            size="sm"
                            alt={metadata.countryName}
                            src={`https://flagcdn.com/${metadata.countryCode.toLowerCase()}.svg`}
                        />
                    }
                >
                    {metadata.label}
                </SelectItem>
            ))}
        </Select>
    );
};

const FooterCopyRight: FunctionComponent = () => {
    const [currentYear] = useState(() => new Date().getFullYear());
    const t = useTranslations('Footer');

    return (
        <section className="w-full py-8">
            <p className="text-sm">
                Copyright &copy; {currentYear} - Forum INSA. {t('allRightsReserved')}
            </p>
        </section>
    );
};
