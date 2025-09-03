"use client";
import { useMatch } from "@/contexts/matchContext";
import { fetchAllPlayersForMatch } from "@/services/PlayersFetches/usePlayers";
import { IEvent } from "@/types/IEvent";
import { useQuery } from "@tanstack/react-query";
import { forwardRef, useEffect, useRef, useState } from "react";

type IDialog = {
    matchId: string;
    awayTeamId: string;
    homeTeamId: string;
};

export const AddEventDialog = forwardRef<HTMLDialogElement, IDialog>(
    ({ matchId, homeTeamId, awayTeamId }, ref) => {
        const { matchTeams, setMatchTeams, addEvent } = useMatch();

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
            }
        }, [matchData, setMatchTeams]);

        const dialogRef = ref as React.RefObject<HTMLDialogElement>;

        const handleEvents = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const newEvent: IEvent = {
                playerTeamId: formData.get("playerTeamId") as string,
                eventType: formData.get("eventType") as string,
                playerId: formData.get("playerId") as string,
                assist_playerId: formData.get("assist_playerId") as
                    | string
                    | null,
                basicTime: Number(formData.get("basicTime")),
                extraTime: Number(formData.get("extraTime")),
            };
            addEvent(newEvent);
            dialogRef?.current?.close();
        };

        const [selectedTeam, setSelectedTeam] = useState<string>("");
        const [eventType, setEventType] = useState<string>("");

        const players =
            selectedTeam === matchTeams.homeTeam?._id.toString()
                ? matchTeams.homeTeam?.players
                : matchTeams.awayTeam?.players;

        return (
            <dialog ref={ref}>
                <form id="EventForm" onSubmit={handleEvents}>
                    <label>Typ wydarzenia</label>
                    <select
                        name="eventType"
                        onChange={(e) => setEventType(e.target.value)}
                    >
                        <option value="">Wybierz</option>
                        <option value="Goal">Bramka</option>
                        <option value="RedCard">Czerwona kartka</option>
                        <option value="YellowCard">Żółta kartka</option>
                    </select>
                    <label>Drużyna</label>
                    {!isLoading ? (
                        <>
                            <select
                                name="playerTeamId"
                                defaultValue={matchTeams.homeTeam?._id.toString()}
                                onChange={(e) =>
                                    setSelectedTeam(e.target.value)
                                }
                            >
                                <option
                                    value={matchTeams.homeTeam?._id.toString()}
                                >
                                    {matchTeams.homeTeam?.name}
                                </option>
                                <option
                                    value={matchTeams.awayTeam?._id.toString()}
                                >
                                    {matchTeams.awayTeam?.name}
                                </option>
                            </select>
                            <label>Zawodnik</label>
                            <select name="playerId">
                                {players?.map((player) => (
                                    <option
                                        value={player._id}
                                        key={player._id}
                                    >{`${player.shirtNumber}. ${player.name}`}</option>
                                ))}
                            </select>
                            {eventType === "Goal" ? (
                                <div>
                                    <label>Asystujący</label>
                                    <select name="assist_playerId">
                                        <option value=""></option>
                                        {players?.map((player) => (
                                            <option
                                                value={player._id}
                                                key={player._id}
                                            >{`${player.shirtNumber}. ${player.name}`}</option>
                                        ))}
                                    </select>
                                </div>
                            ) : null}
                        </>
                    ) : (
                        <p>Pobieranie...</p>
                    )}
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

                <button
                    type="button"
                    onClick={() => dialogRef?.current?.close()}
                >
                    Anuluj
                </button>
                <button type="submit" form="EventForm">
                    Dodaj
                </button>
            </dialog>
        );
    }
);
