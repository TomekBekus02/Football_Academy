"use client";
import { Slack } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import AdminLayout from "@/components/adminLayout";
import UserLayout from "@/components/userLayout";
import classes from "./dashboard.module.css";
import "./globals.css";

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
