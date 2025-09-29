"use client";
import React from "react";

export default function SquadTeam({
    params,
}: {
    params: Promise<{ teamId: string; playerId: string }>;
}) {
    const { teamId, playerId } = React.use(params);
    return (
        <div>
            Statystyki zawodnika o ID: {playerId} z drużyny o ID {teamId}
        </div>
    );
}
