"use client";
import LoadProvider from "@/components/LoadProvider/LoadProvider";
import { fetchTournament } from "@/services/TournamentFetches/useTournament";
import { IBracketMatch, IBracketTournament } from "@/types/ITournament";
import { useQuery } from "@tanstack/react-query";
import TournamentMatch from "./tournamentMatch/tournamentMatch";
import Image from "next/image";
import React from "react";
import Link from "next/link";

export default function TournamentProgress({
    params,
}: {
    params: Promise<{ tournamentId: string }>;
}) {
    const { tournamentId } = React.use(params);
    const {
        data: tournament,
        isLoading,
        error,
    } = useQuery<IBracketTournament>({
        queryKey: ["tournaments", tournamentId],
        queryFn: ({ queryKey }) => {
            const [, tournamentId] = queryKey;
            return fetchTournament(tournamentId as string);
        },
    });
    if (!tournament) return <div>Nie znaleziono turnieju</div>;
    const maxRound = Math.log2(tournament.participants.length);
    const rounds: Record<number, IBracketMatch[]> = {};
    tournament.matches.forEach((m) => {
        if (!rounds[m.round]) rounds[m.round] = [];
        rounds[m.round].push(m);
    });

    return (
        <LoadProvider error={error} isLoading={isLoading}>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${maxRound}, 1fr)`,
                }}
            >
                {Object.entries(rounds).map(([roundNumber, roundMatches]) => (
                    <div key={roundNumber} className="round">
                        <h2>Runda {roundNumber}</h2>

                        {(roundMatches as IBracketMatch[]).map(
                            (match, index) => (
                                <div key={index} className="match">
                                    {match.home.team !== null &&
                                    match.away.team !== null ? (
                                        <Link href={`/admin/mecz/${match.id}`}>
                                            <TournamentMatch match={match} />
                                        </Link>
                                    ) : (
                                        <TournamentMatch match={match} />
                                    )}
                                </div>
                            )
                        )}
                    </div>
                ))}
            </div>
        </LoadProvider>
    );
}
