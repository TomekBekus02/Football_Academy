"use client";
import LoadProvider from "@/components/LoadProvider/LoadProvider";
import { fetchPlayerStats } from "@/services/PlayersFetches/usePlayers";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function SquadTeam({
    params,
}: {
    params: Promise<{ teamId: string; playerId: string }>;
}) {
    const { teamId, playerId } = React.use(params);
    const { data, isLoading, error } = useQuery({
        queryKey: ["Players", playerId],
        queryFn: ({ queryKey }) => {
            const [, playerId] = queryKey;
            return fetchPlayerStats(playerId as string);
        },
    });
    return (
        <LoadProvider isLoading={isLoading} error={error}>
            <div>
                Statystyki zawodnika o ID: {playerId} z drużyny o ID {teamId}
            </div>
        </LoadProvider>
    );
}
