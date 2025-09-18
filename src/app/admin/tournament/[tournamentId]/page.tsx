"use client";
import LoadProvider from "@/components/LoadProvider/LoadProvider";
import { fetchTournament } from "@/services/TournamentFetches/useTournament";
import { IBracketMatch, IBracketTournament } from "@/types/ITournament";
import { useQuery } from "@tanstack/react-query";
import TournamentMatch from "./tournamentMatch/tournamentMatch";
import React from "react";
import Link from "next/link";
import pageLayout from "./page.module.css";
import Image from "next/image";

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
    if (!tournament) return <></>;
    const maxRound = Math.log2(tournament.participants.length);
    const rounds: Record<number, IBracketMatch[]> = {};
    const bracketMaxHeight = (tournament.participants.length / 2) * 160 + 140;

    tournament.matches.forEach((m) => {
        if (!rounds[m.round]) rounds[m.round] = [];
        rounds[m.round].push(m);
    });

    return (
        <LoadProvider error={error} isLoading={isLoading}>
            <div className={pageLayout.pageBox}>
                <div className={pageLayout.titleBox}>
                    <Image
                        src="/tournament_Icon.png"
                        alt={`${tournament.title} Icon`}
                        width={100}
                        height={100}
                    />
                    <h1>{tournament.title}</h1>
                </div>
                <div className={pageLayout.BracketsBox}>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: `repeat(${maxRound}, 1fr)`,
                            marginBottom: "25px",
                        }}
                    >
                        {Object.entries(rounds).map(
                            ([roundNumber, roundMatches]) => (
                                <div
                                    key={roundNumber}
                                    className={pageLayout.BracketsContent}
                                >
                                    <h1 className={pageLayout.RoundName}>
                                        {maxRound === Number(roundNumber)
                                            ? "Finał"
                                            : `1/${roundMatches.length}`}
                                    </h1>
                                </div>
                            )
                        )}
                    </div>
                    <div
                        className={pageLayout.BracketsMatchesContent}
                        style={{
                            display: "grid",
                            gridTemplateColumns: `repeat(${maxRound}, 1fr)`,
                        }}
                    >
                        {Object.entries(rounds).map(
                            ([roundNumber, roundMatches]) => (
                                <div
                                    key={roundNumber}
                                    className={pageLayout.BracketsContent}
                                >
                                    <div
                                        key={roundNumber}
                                        className={pageLayout.RoundMatchesBox}
                                        style={{
                                            minHeight: `${bracketMaxHeight}px`,
                                        }}
                                    >
                                        {(roundMatches as IBracketMatch[]).map(
                                            (match, index) => (
                                                <div
                                                    key={index}
                                                    className={
                                                        pageLayout.MatchBox
                                                    }
                                                >
                                                    {match.home.team !== null &&
                                                    match.away.team !== null ? (
                                                        <Link
                                                            href={`/admin/mecz/${match.id}`}
                                                            style={{
                                                                textDecoration:
                                                                    "none",
                                                                color: "inherit",
                                                            }}
                                                        >
                                                            <TournamentMatch
                                                                match={match}
                                                            />
                                                        </Link>
                                                    ) : (
                                                        <TournamentMatch
                                                            match={match}
                                                        />
                                                    )}
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>
                <div></div>
            </div>
        </LoadProvider>
    );
}
