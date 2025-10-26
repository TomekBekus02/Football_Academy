import PlayerStats from "@/components/webSideComponents/playerStats/playerStats";
import React from "react";

export default function SquadTeam({
    params,
}: {
    params: Promise<{ teamId: string; playerId: string }>;
}) {
    const { teamId, playerId } = React.use(params);
    return <PlayerStats teamId={teamId} playerId={playerId} />;
}
