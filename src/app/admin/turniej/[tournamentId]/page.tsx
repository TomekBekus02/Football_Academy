"use client";
import React from "react";
import TournamentPage from "@/components/webSideComponents/tournament/tournamentPage";
import { usePathname } from "next/navigation";

export default function TournamentProgress({
    params,
}: {
    params: Promise<{ tournamentId: string }>;
}) {
    const { tournamentId } = React.use(params);
    const pathname = usePathname();
    const isAdmin = pathname.startsWith("/admin");
    return <TournamentPage tournamentId={tournamentId} isAdmin={isAdmin} />;
}
