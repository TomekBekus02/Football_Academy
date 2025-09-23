import teamLayout from "./teamLayout.module.css";
import SideTeamInfo from "./sideTeamInfo";
import React, { ReactNode } from "react";

interface TeamLayoutProps {
    children: ReactNode;
    params: { teamId: string };
}

export default function TeamLayout({ children, params }: TeamLayoutProps) {
    const { teamId } = params;
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
