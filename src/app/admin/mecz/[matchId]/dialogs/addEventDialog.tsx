"use client";
import { useMatch } from "@/contexts/matchContext";
import { fetchAllPlayersForMatch } from "@/services/PlayersFetches/usePlayers";
import { IEvent } from "@/types/IEvent";
import { extractPlayerName } from "@/utils/utils";
import { useQuery } from "@tanstack/react-query";
import { forwardRef, useEffect, useRef, useState } from "react";

type IDialog = {
    matchId: string;
    awayTeamId: string;
    homeTeamId: string;
};

export const AddEventDialog = forwardRef<HTMLDialogElement, IDialog>(
    ({ matchId, homeTeamId, awayTeamId }, ref) => {
        const { matchTeams, setMatchTeams, addEvent, updateScore } = useMatch();

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

            const playerTeamId = formData.get("playerTeamId") as string;
            const eventType = formData.get("eventType") as string;

            const selectEl1 = e.currentTarget.elements.namedItem(
                "playerId"
            ) as HTMLSelectElement;
            const playerName = extractPlayerName(selectEl1);

            let assist_playerName = "";
            if (eventType === "Goal") {
                const selectEl2 = e.currentTarget.elements.namedItem(
                    "assist_playerId"
                ) as HTMLSelectElement;
                assist_playerName = extractPlayerName(selectEl2);
                updateScore(playerTeamId);
            }

            const newEvent: IEvent = {
                playerTeamId: playerTeamId,
                eventType: eventType,
                player: {
                    id: formData.get("playerId") as string,
                    name: playerName,
                },
                assist_player: {
                    id: formData.get("assist_playerId") as string,
                    name: assist_playerName,
                },
                basicTime: Number(formData.get("basicTime")),
                extraTime: Number(formData.get("extraTime")),
            };
            addEvent(newEvent);
            setSelectedTeam(matchTeams.homeTeam?._id.toString() as string);
            e.currentTarget.reset();
            dialogRef?.current?.close();
        };

        const [selectedTeam, setSelectedTeam] = useState<string>("");
        const [eventType, setEventType] = useState<string>("");
        let players = matchTeams.homeTeam?.players;

        if (selectedTeam !== "") {
            players =
                selectedTeam === matchTeams.homeTeam?._id.toString()
                    ? matchTeams.homeTeam?.players
                    : matchTeams.awayTeam?.players;
        }
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
