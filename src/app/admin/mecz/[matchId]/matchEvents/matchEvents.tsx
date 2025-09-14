"use client";

import MatchEventsLayout from "./matchEvetns.module.css";
import { AddEventDialog } from "../dialogs/addEventDialog";
import { useRef } from "react";
import { EventsHalf } from "./eventsHalf/eventsHalf";
import { IMatchEvent } from "@/types/IEvent";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { updatePlayerStats } from "@/services/PlayersFetches/usePlayers";

type matchEventProps = {
    matchId: string;
    awayTeamId: string;
    homeTeamId: string;
    homeTeamScore: number;
    awayTeamScore: number;
    isOnGoing: boolean;
    events: IMatchEvent[];
    tournamentId: string;
};
export default function matchEvents({
    matchId,
    homeTeamId,
    awayTeamId,
    events,
    homeTeamScore,
    awayTeamScore,
    isOnGoing,
    tournamentId,
}: matchEventProps) {
    const router = useRouter();
    const queryClient = useQueryClient();
    const eventDialog = useRef<HTMLDialogElement>(null);
    const firstHalfEvents = events.filter((event) => event.time.base <= 45);
    const secondHalfEvents = events.filter((event) => event.time.base > 45);

    const mutation = useMutation({
        mutationFn: (matchId: string) => updatePlayerStats(matchId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["players"] });
            const transferPath =
                tournamentId !== ""
                    ? `/admin/tournament/${tournamentId}`
                    : "/admin/rozgrywki";
            router.push(transferPath);
            router.refresh();
        },
    });
    return (
        <div className={MatchEventsLayout.matchEventsBox}>
            <AddEventDialog
                ref={eventDialog}
                matchId={matchId}
                homeTeamId={homeTeamId}
                awayTeamId={awayTeamId}
                homeTeamScore={homeTeamScore}
                awayTeamScore={awayTeamScore}
            />
            {isOnGoing ? (
                <>
                    <button
                        onClick={() => {
                            eventDialog.current?.showModal();
                        }}
                    >
                        Dodaj event
                    </button>
                    <button onClick={() => mutation.mutate(matchId)}>
                        Zakończ mecz
                    </button>
                </>
            ) : null}

            <div className={MatchEventsLayout.matchHalfBox}>
                <div className={MatchEventsLayout.halfHeader}>
                    <h3>1. POŁOWA</h3>
                </div>
                <EventsHalf awayTeamId={awayTeamId} events={firstHalfEvents} />
            </div>
            <div className={MatchEventsLayout.matchHalfBox}>
                <div className={MatchEventsLayout.halfHeader}>
                    <h3>2. POŁOWA</h3>
                </div>
                <EventsHalf awayTeamId={awayTeamId} events={secondHalfEvents} />
            </div>
        </div>
    );
}
