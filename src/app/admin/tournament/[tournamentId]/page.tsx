"use client";
import LoadProvider from "@/components/LoadProvider/LoadProvider";
import { fetchTournament } from "@/services/TournamentFetches/useTournament";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function TournamentProgress({
    params,
}: {
    params: Promise<{ tournamentId: string }>;
}) {
    const { tournamentId } = React.use(params);
    const { data, isLoading, error } = useQuery({
        queryKey: ["tournaments", tournamentId],
        queryFn: ({ queryKey }) => {
            const [, tournamentId] = queryKey;
            return fetchTournament(tournamentId);
        },
    });

    return (
        <LoadProvider error={error} isLoading={isLoading}>
            <div>
                <h1>Tournament: {tournamentId}</h1>
            </div>
        </LoadProvider>
    );
}
