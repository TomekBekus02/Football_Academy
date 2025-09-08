"use client";
import { createEvent } from "@/services/MatchFetches/useMatch";
import { fetchAllPlayersForMatch } from "@/services/PlayersFetches/usePlayers";
import { IEvent, IMatchEvent, IMatchEventExt } from "@/types/IEvent";
import { extractPlayerName, updateScore } from "@/utils/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { forwardRef, useEffect, useRef, useState } from "react";

type IDialog = {
    matchId: string;
    awayTeamId: string;
    homeTeamId: string;
    homeTeamScore: number;
    awayTeamScore: number;
};
interface AddEventVars {
    newEvent: IMatchEventExt;
    matchId: string;
}

export const AddEventDialog = forwardRef<HTMLDialogElement, IDialog>(
    (
        { matchId, homeTeamId, awayTeamId, homeTeamScore, awayTeamScore },
        ref
    ) => {
        const queryClient = useQueryClient();
        const router = useRouter();
        const {
            data: matchData,
            isLoading,
            error: fetchingError,
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

        const {
            mutate,
            isPending,
            error: mutateError,
        } = useMutation({
            mutationFn: ({ newEvent, matchId }: AddEventVars) =>
                createEvent({ newEvent, matchId }),
            onSuccess: (_data, variables) => {
                queryClient.invalidateQueries({
                    queryKey: ["match", matchId] as const,
                });
            },
        });

        // useEffect(() => {
        //     if (matchData && !isLoading) {
        //         setMatchTeams(matchData);
        //     }
        // }, [matchData, setMatchTeams]);

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
            }
            const result = updateScore(
                playerTeamId,
                homeTeamId,
                homeTeamScore,
                awayTeamScore,
                eventType
            );

            const newEvent: IMatchEventExt = {
                eventType: eventType,
                teamId: playerTeamId,
                player: {
                    id: formData.get("playerId") as string,
                    name: playerName,
                    isAvailable: true,
                },
                assist_player: {
                    id: formData.get("assist_playerId") as string,
                    name: assist_playerName,
                    isAvailable: true,
                },
                time: {
                    base: Number(formData.get("basicTime")),
                    extra: Number(formData.get("extraTime")),
                },
                result: result,
            };
            console.log("newEvent", newEvent, "matchId", matchId);
            mutate({ newEvent: newEvent, matchId: matchId });
            setSelectedTeam(matchData.homeTeam?._id.toString() as string);
            e.currentTarget.reset();
            dialogRef?.current?.close();
        };

        const [selectedTeam, setSelectedTeam] = useState<string>("");
        const [eventType, setEventType] = useState<string>("");
        let players = [];
        if (!isLoading) {
            players = matchData.homeTeam?.players;
            if (selectedTeam !== "") {
                players =
                    selectedTeam === matchData.homeTeam._id.toString()
                        ? matchData.homeTeam.players
                        : matchData.awayTeam.players;
            }
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
                                defaultValue={matchData.homeTeam?._id.toString()}
                                onChange={(e) =>
                                    setSelectedTeam(e.target.value)
                                }
                            >
                                <option
                                    value={matchData.homeTeam?._id.toString()}
                                >
                                    {matchData.homeTeam?.name}
                                </option>
                                <option
                                    value={matchData.awayTeam?._id.toString()}
                                >
                                    {matchData.awayTeam?.name}
                                </option>
                            </select>
                            <label>Zawodnik</label>
                            <select name="playerId">
                                {players?.map(
                                    (player: {
                                        _id: string;
                                        name: string;
                                        shirtNumber: string;
                                    }) => (
                                        <option
                                            value={player._id}
                                            key={player._id}
                                        >{`${player.shirtNumber}. ${player.name}`}</option>
                                    )
                                )}
                            </select>
                            {eventType === "Goal" ? (
                                <div>
                                    <label>Asystujący</label>
                                    <select name="assist_playerId">
                                        <option value=""></option>
                                        {players?.map(
                                            (player: {
                                                _id: string;
                                                name: string;
                                                shirtNumber: string;
                                            }) => (
                                                <option
                                                    value={player._id}
                                                    key={player._id}
                                                >{`${player.shirtNumber}. ${player.name}`}</option>
                                            )
                                        )}
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
                    {isPending ? "Tworzenie..." : "Dodaj wydarzenie"}
                </button>
            </dialog>
        );
    }
);
