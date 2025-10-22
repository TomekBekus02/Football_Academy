"use client";
import LoadProvider from "@/components/LoadProvider/LoadProvider";
import PlayerStats from "@/components/webSideComponents/playerStats/playerStats";
import { fetchPlayerStats } from "@/services/PlayersFetches/usePlayers";
import { IPlayerDetails } from "@/types/IPlayer";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function SquadTeam({
    params,
}: {
    params: Promise<{ teamId: string; playerId: string }>;
}) {
    const { teamId, playerId } = React.use(params);
    return <PlayerStats teamId={teamId} playerId={playerId} />;
}
