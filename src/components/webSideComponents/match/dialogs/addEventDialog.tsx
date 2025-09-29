"use client";
import { createEvent } from "@/services/MatchFetches/useMatch";
import { fetchAllPlayersForMatch } from "@/services/PlayersFetches/usePlayers";
import { IMatchEventExt } from "@/types/IEvent";
import { extractPlayerName, updateScore } from "@/utils/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { forwardRef, useState } from "react";
import inputLayout from "@/components/inputTemplate/inputTemplate.module.css";
import eventDialogLayout from "./eventDialog.module.css";

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

        const dialogRef = ref as React.RefObject<HTMLDialogElement>;

        const handleEvents = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const playerTeamId = formData.get("playerTeamId") as string;
            const eventType = formData.get("eventType") as string;

            const selectEl1 = e.currentTarget.elements.namedItem(
                "playerId"
            ) as HTMLSelectElement;
            console.log("playerTeamId:", playerTeamId);
            console.log("eventType:", eventType);
            console.log("selectEl1:", selectEl1);
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
                eventType,
                1
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

            mutate({ newEvent: newEvent, matchId: matchId });
            setSelectedTeam(matchData.homeTeam?._id.toString() as string);
            e.currentTarget.reset();
            dialogRef?.current?.close();
        };

        const [selectedTeam, setSelectedTeam] = useState<string>("");
        const [eventType, setEventType] = useState<string>("Goal");
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
            <dialog ref={ref} className="dialogBox">
                <form
                    id="EventForm"
                    onSubmit={handleEvents}
                    className="dialogContent"
                >
                    <div className={inputLayout.inputGroup}>
                        <select
                            name="eventType"
                            onChange={(e) => setEventType(e.target.value)}
                        >
                            <option value="Goal">Bramka</option>
                            <option value="RedCard">Czerwona kartka</option>
                            <option value="YellowCard">Żółta kartka</option>
                        </select>
                        <label>Typ wydarzenia</label>
                    </div>

                    {!isLoading ? (
                        <>
                            <div className={inputLayout.inputGroup}>
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
                                <label>Drużyna</label>
                            </div>
                            <div className={inputLayout.inputGroup}>
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
                                <label>Zawodnik</label>
                            </div>
                            {eventType === "Goal" ? (
                                <div className={inputLayout.inputGroup}>
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
                                    <label>Asystujący</label>
                                </div>
                            ) : null}
                        </>
                    ) : (
                        <p>Pobieranie...</p>
                    )}
                    <div className={eventDialogLayout.minsBox}>
                        <div className={eventDialogLayout.inputGroupd}>
                            <input type="number" name="basicTime" min={1} />
                            <label>czas podstawowy</label>
                        </div>
                        <div className={eventDialogLayout.inputGroupd}>
                            <input
                                type="number"
                                name="extraTime"
                                min={0}
                                defaultValue={0}
                            />
                            <label>czas doliczony</label>
                        </div>
                    </div>
                    <input type="text" defaultValue={matchId} hidden />
                </form>

                <div className="dialogButtonBox">
                    <button
                        type="button"
                        onClick={() => dialogRef?.current?.close()}
                        className="buttonStyle cancelBtn"
                    >
                        Anuluj
                    </button>
                    <button
                        type="submit"
                        form="EventForm"
                        className="buttonStyle addBtn"
                    >
                        {isPending ? "Tworzenie..." : "Dodaj wydarzenie"}
                    </button>
                </div>
            </dialog>
        );
    }
);
