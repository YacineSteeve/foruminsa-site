import { Loader } from '@components/ui/Loader';

// A loading indicator displayed while a section of the page is loading
export default function Loading() {
    return (
        <div className="flex-center w-screen h-screen">
            <Loader/>
        </div>
    );
}
