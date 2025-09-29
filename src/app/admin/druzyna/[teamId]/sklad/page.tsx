"use client";

import React from "react";
import { usePathname } from "next/navigation";
import SquadPage from "@/components/webSideComponents/squad/squadPage";

export default function Players({
    params,
}: {
    params: Promise<{ teamId: string }>;
}) {
    const { teamId } = React.use(params);
    const pathname = usePathname();
    const isAdmin = pathname.startsWith("/admin");

    return <SquadPage teamId={teamId} isAdmin={isAdmin} />;
}
