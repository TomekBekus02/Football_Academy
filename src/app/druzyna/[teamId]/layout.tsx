"use client";

import SideTeamInfo from "@/components/sideTeamBar/sideTeamInfo";
import teamLayout from "./teamLayout.module.css";

import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";

export default function TeamLayout({
    children,
    params,
}: {
    children: ReactNode;
    params: Promise<{ teamId: string }>;
}) {
    const { teamId } = React.use(params);
    const pathname = usePathname();
    const hideHeader = pathname?.includes("/zawodnik/");
    return (
        <div className={!hideHeader ? teamLayout.teamPage : ""}>
            {!hideHeader && (
                <div className={teamLayout.sideBarBox}>
                    <div className={teamLayout.sideTeamInfo}>
                        <SideTeamInfo teamId={teamId} />
                    </div>
                </div>
            )}
            <main>{children}</main>
        </div>
    );
}
