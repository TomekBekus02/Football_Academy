"use client";

import { usePathname } from "next/navigation";
import CompetitionsPage from "@/components/webSideComponents/competitions/competitionsPage";

export default function tournaments() {
    const pathname = usePathname();
    const isAdmin = pathname.startsWith("/admin");
    return <CompetitionsPage isAdmin={isAdmin} />;
}
