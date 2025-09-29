"use client";

import React from "react";
import { usePathname } from "next/navigation";
import MatchPage from "@/components/webSideComponents/match/matchPage";

export default function MatchProgress({
    params,
}: {
    params: Promise<{ matchId: string }>;
}) {
    const { matchId } = React.use(params);
    const pathname = usePathname();
    const isAdmin = pathname.startsWith("/admin");
    return <MatchPage matchId={matchId} isAdmin={isAdmin} />;
}
