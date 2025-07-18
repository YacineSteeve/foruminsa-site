// The main page of the application, which redirects to the dashboard
import Image from 'next/image';

export default function HomePage() {
    return (
        <div>
            <Image
                src="/logo_square.png"
                alt="Logo du Forum INSA"
                width={800}
                height={800}
            />
        </div>
    );
}
