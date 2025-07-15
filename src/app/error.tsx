'use client';

interface ErrorProps {
    error: Error;
    reset: VoidFunction;
}

// The error boundary component that displays an error message and a retry button
export default function Error({ error, reset }: ErrorProps) {
    console.error(error);
    
    return (
        <div className="relative flex-center size-full">
            <div className="flex flex-col items-center gap-10">
                <h4>Une erreur est survenue</h4>
                <div>
                    <p>Message d&apos;erreur :</p>
                    <pre
                        className="w-[50rem] max-w-full max-h-80 p-5 bg-neutral rounded-md text-sm text-wrap overflow-y-auto">
                        {error.message.toLowerCase() === 'failed to fetch'
                            ? 'Impossible de se connecter au serveur'
                            : error.message}
                    </pre>
                </div>
                <div className="flex items-center gap-5">
                    <button onClick={reset}>Réessayer</button>
                </div>
            </div>
        </div>
    );
}
