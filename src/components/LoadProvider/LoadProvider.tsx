import { ReactNode } from "react";

interface LoadProviderProps {
    children: ReactNode;
    isLoading: boolean;
    error: Error | null;
}
export default function LoadProvider({
    children,
    isLoading,
    error,
}: LoadProviderProps) {
    if (isLoading)
        return (
            <>
                <h1>Ładowanie...</h1>
            </>
        );
    else if (error)
        return (
            <>
                <h1>Błąd: {error.message}</h1>
            </>
        );
    else return <>{children}</>;
}
