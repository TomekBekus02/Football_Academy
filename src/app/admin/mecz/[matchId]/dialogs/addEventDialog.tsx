"use client";
import { useMatch } from "@/contexts/matchContext";
import { fetchAllPlayersForMatch } from "@/services/PlayersFetches/usePlayers";
import { useQuery } from "@tanstack/react-query";
import { forwardRef, useEffect, useState } from "react";

type IDialog = {
    matchId: string;
    awayTeamId: string;
    homeTeamId: string;
};

export const AddEventDialog = forwardRef<HTMLDialogElement, IDialog>(
    ({ matchId, homeTeamId, awayTeamId }, ref) => {
        const { events, matchTeams, setMatchTeams, handleEvents } = useMatch();
        const {
            data: matchData,
            isLoading,
            error,
        } = useQuery({
            queryKey: ["teams", homeTeamId, awayTeamId, "players"],
            queryFn: ({ queryKey }) => {
                const [, homeTeamId, awayTeamId] = queryKey;
                return fetchAllPlayersForMatch(
                    homeTeamId as string,
                    awayTeamId as string
                );
            },
        });
        useEffect(() => {
            if (matchData && !isLoading) {
                setMatchTeams(matchData);
                console.log("matchData", matchData);
            }
        }, [matchData, setMatchTeams]);
        const [selectedTeam, setSelectedTeam] = useState<string>("homeTeam");
        const players =
            selectedTeam === "homeTeam"
                ? matchTeams.homeTeam?.players
                : matchTeams.awayTeam?.players;
        return (
            <dialog ref={ref}>
                <form id="EventForm">
                    <label>Drużyna</label>
                    {!isLoading ? (
                        <>
                            <select
                                name="playerTeam"
                                defaultValue="homeTeam"
                                onChange={(e) =>
                                    setSelectedTeam(e.target.value)
                                }
                            >
                                <option value="homeTeam">
                                    {matchTeams.homeTeam?.name}
                                </option>
                                <option value="awayTeam">
                                    {matchTeams.awayTeam?.name}
                                </option>
                            </select>
                            <label>Zawodnik</label>
                            <select name="player">
                                {players?.map((player) => (
                                    <option
                                        value={player._id}
                                        key={player._id}
                                    >{`${player.shirtNumber}. ${player.name}`}</option>
                                ))}
                            </select>
                        </>
                    ) : (
                        <p>Pobieranie...</p>
                    )}

                    <label>Typ wydarzenia</label>
                    <select name="eventType">
                        <option value="">Wybierz</option>
                        <option value="Goal">Bramka</option>
                        <option value="Assist">Asysta</option>
                        <option value="RedCard">Czerwona kartka</option>
                        <option value="YellowCard">Żółta kartka</option>
                    </select>
                    <label>Minuta</label>
                    <input type="number" name="basicTime" max={90} min={1} />
                    <label>Doliczona minuta</label>
                    <input
                        type="number"
                        name="extraTime"
                        min={0}
                        defaultValue={0}
                    />
                    <input type="text" defaultValue={matchId} hidden />
                </form>
                <form method="dialog">
                    <button>Anuluj</button>
                    <button type="submit" form="EventForm">
                        Dodaj
                    </button>
                </form>
            </dialog>
        );
    }
);
