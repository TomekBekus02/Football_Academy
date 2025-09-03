"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MatchProvider } from "@/contexts/matchContext";
import { usePathname } from "next/navigation";
import AdminLayout from "@/components/Layouts/adminLayout";
import UserLayout from "@/components/Layouts/userLayout";

const queryClient = new QueryClient();

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();
    const Layout = pathname.startsWith("/admin") ? AdminLayout : UserLayout;
    return (
        <html lang="en">
            <body>
                <QueryClientProvider client={queryClient}>
                    <MatchProvider>
                        <Layout>{children}</Layout>
                    </MatchProvider>
                </QueryClientProvider>
            </body>
        </html>
    );
}
