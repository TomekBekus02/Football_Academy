"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import AdminLayout from "@/components/Layouts/adminLayout";
import UserLayout from "@/components/Layouts/userLayout";

const queryClient = new QueryClient();

export default function ClientProviders({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const Layout = pathname?.startsWith("/admin") ? AdminLayout : UserLayout;

    return (
        <QueryClientProvider client={queryClient}>
            <Layout>{children}</Layout>
        </QueryClientProvider>
    );
}
