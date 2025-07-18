'use client';

import { ScrollToTopButton } from '@components/global/ScrollToTopButton';
import { useInView } from '@lib/hooks';
import Image from 'next/image';
import { Fragment, type FunctionComponent, useState } from 'react';

export const Footer: FunctionComponent = () => {
    const { ref, inView: showScrollToTop } = useInView();
    const [currentYear] = useState(() => new Date().getFullYear());

    return (
        <Fragment>
            <ScrollToTopButton hidden={!showScrollToTop} />
            <footer
                ref={ref}
                className="w-full px-4 md:px-10 lg:px-20 xl:px-40 2xl:px-60 pt-12 md:pt-20 xl:pt-24 bg-primary-light/5 clipped-wave-20 md:clipped-wave-40 xl:clipped-wave-50"
            >
                <div className="w-full pb-8">
                    <Image
                        src="/logo_line.png"
                        alt="Logo du Forum INSA"
                        width={300}
                        height={51}
                        className="max-md:w-64"
                    />
                    <div></div>
                </div>
                <hr />
                <div className="w-full py-8">
                    <p className="text-sm">
                        Copyright &copy; {currentYear} - Forum INSA. Tous droits réservés.
                    </p>
                </div>
            </footer>
        </Fragment>
    );
};
