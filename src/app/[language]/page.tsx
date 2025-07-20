import { COLORS } from '@lib/constants';
import Image from 'next/image';

// The landing page of the website
export default function HomePage() {
    return (
        <div className="w-full min-h-screen">
            <section className="flex justify-between">
                <p>
                
                </p>
                <div className="relative size-[90vh] overflow-hidden">
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="absolute right-0 scale-150">
                        <path
                            fill={COLORS.primaryLight + '15'} /* Semi-transparent primary color */
                            d="M47.9,-60.7C54.4,-51.6,46.7,-29.3,47.1,-10.7C47.5,7.8,55.9,22.4,54.2,36.9C52.5,51.3,40.8,65.6,28.4,63.9C16.1,62.2,3.1,44.7,-12.6,37.6C-28.2,30.6,-46.6,34.1,-52,28.3C-57.3,22.6,-49.7,7.6,-45.8,-7C-42,-21.7,-42.1,-35.9,-35.1,-44.9C-28.1,-53.8,-14,-57.4,3.3,-61.4C20.7,-65.4,41.4,-69.7,47.9,-60.7Z"
                            transform="translate(100 100)"
                        />
                    </svg>
                    <Image
                        src="/logo_square.png"
                        alt="Logo du Forum INSA"
                        width={800}
                        height={800}
                        className="absolute right-0"
                    />
                </div>
            </section>
        </div>
    );
}
