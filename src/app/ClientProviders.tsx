"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import AdminLayout from "@/components/Layouts/adminLayout";
import UserLayout from "@/components/Layouts/userLayout";
import globalLayout from "@/styles/globalLayout.module.css";

const queryClient = new QueryClient();

export default function ClientProviders({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const Layout = pathname?.startsWith("/admin") ? AdminLayout : UserLayout;
    const teamId = "689a4c7170a41052e449061b";

    return (
        <QueryClientProvider client={queryClient}>
            <div className={globalLayout.wrapper}>
                <nav className={globalLayout.navWrapper}>
                    <div className={globalLayout.contentBox}>
                        <Layout teamId={teamId} />
                    </div>
                </nav>
                <div className={globalLayout.contentBox}>{children}</div>
            </div>
        </QueryClientProvider>
    );
}
