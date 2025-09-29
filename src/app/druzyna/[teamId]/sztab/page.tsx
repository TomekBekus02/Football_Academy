"use client";

import { usePathname } from "next/navigation";
import StaffPage from "@/components/webSideComponents/staff/staffPage";

export default function Staff() {
    const pathname = usePathname();
    const isAdmin = pathname.startsWith("/admin");
    return <StaffPage isAdmin={isAdmin} />;
}
