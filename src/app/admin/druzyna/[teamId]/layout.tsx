import SideTeamInfo from "@/components/sideTeamBar/sideTeamInfo";
import teamLayout from "./teamLayout.module.css";

import React, { ReactNode } from "react";

export default function TeamLayout({
    children,
    params,
}: {
    children: ReactNode;
    params: Promise<{ teamId: string }>;
}) {
    const { teamId } = React.use(params);
    return (
        <div className={teamLayout.teamPage}>
            <div className={teamLayout.sideBarBox}>
                <div className={teamLayout.sideTeamInfo}>
                    <SideTeamInfo teamId={teamId} />
                </div>
            </div>
            <main>{children}</main>
        </div>
    );
}
