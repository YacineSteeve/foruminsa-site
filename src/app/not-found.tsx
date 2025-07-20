import Image from 'next/image';

// The content that displays when a page is not found
export default function NotFound() {
    return (
        <div className="flex justify-center w-full pt-40">
            <div className="flex flex-col items-center gap-8">
                <Image
                    src="/not_found.svg"
                    alt="Page not found"
                    width={400}
                    height={400}
                    className="max-w-full max-h-full"
                />
                <h1>Oups !</h1>
                <p>Désolé, la page que vous cherchez n&apos;existe pas.</p>
            </div>
        </div>
    );
}
