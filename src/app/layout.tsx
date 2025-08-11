"use client";

import { usePathname } from "next/navigation";
import AdminLayout from "@/components/Layouts/adminLayout";
import UserLayout from "@/components/Layouts/userLayout";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();

    if (pathname.startsWith("/admin")) {
        return (
            <html lang="en">
                <body>
                    <AdminLayout>{children}</AdminLayout>
                </body>
            </html>
        );
    } else {
        return (
            <html lang="en">
                <body>
                    <UserLayout>{children}</UserLayout>
                </body>
            </html>
        );
    }
}
