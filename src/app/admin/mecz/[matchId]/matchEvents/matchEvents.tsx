"use client";

import MatchEventsLayout from "./matchEvetns.module.css";
import { AddEventDialog } from "../dialogs/addEventDialog";
import { useRef } from "react";
import { EventsHalf } from "./eventsHalf/eventsHalf";
import { IMatchEvent } from "@/types/IEvent";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { updatePlayerStats } from "@/services/PlayersFetches/usePlayers";
import { MatchStatus } from "@/types/IMatch";
import { updateMatchProgress } from "@/services/MatchFetches/useMatch";
import MatchButtons from "./matchButtons/matchButtons";

type penaltiesType = {
    homeTeam: number;
    awayTeam: number;
};
type matchEventProps = {
    matchId: string;
    awayTeamId: string;
    homeTeamId: string;
    homeTeamScore: number;
    awayTeamScore: number;
    matchStatus: MatchStatus;
    events: IMatchEvent[];
    tournamentId: string;
    isOverTime: boolean;
    matchPenalties: penaltiesType;
};
export default function matchEvents({
    matchId,
    homeTeamId,
    awayTeamId,
    events,
    homeTeamScore,
    awayTeamScore,
    matchStatus,
    tournamentId,
    isOverTime,
    matchPenalties,
}: matchEventProps) {
    const router = useRouter();
    const queryClient = useQueryClient();
    const eventDialog = useRef<HTMLDialogElement>(null);
    const firstHalfEvents = events.filter((event) => event.time.base <= 45);
    const secondHalfEvents = events.filter(
        (event) => event.time.base > 45 && event.time.base <= 90
    );
    const overTimeEvents = events.filter((event) => event.time.base > 90);

    const endMatch = useMutation({
        mutationFn: ({
            matchId,
            matchPenalties,
        }: {
            matchId: string;
            matchPenalties: penaltiesType;
        }) => updatePlayerStats(matchId, matchPenalties),
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
    const startMatch = useMutation({
        mutationFn: (matchId: string) =>
            updateMatchProgress({ matchStatusType: "matchStatus", matchId }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["match"] });
        },
    });
    const startOverTime = useMutation({
        mutationFn: (matchId: string) =>
            updateMatchProgress({ matchStatusType: "isOverTime", matchId }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["match"] });
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
            <MatchButtons
                matchId={matchId}
                tournamentId={tournamentId}
                homeTeamScore={homeTeamScore}
                awayTeamScore={awayTeamScore}
                matchStatus={matchStatus}
                isOverTime={isOverTime}
                matchPenalties={matchPenalties}
                eventDialog={eventDialog}
            />

            <div className={MatchEventsLayout.matchEventsContent}>
                <div className={MatchEventsLayout.matchHalfBox}>
                    <div className={MatchEventsLayout.halfHeader}>
                        <h3>1. POŁOWA</h3>
                    </div>
                    <EventsHalf
                        matchId={matchId}
                        awayTeamId={awayTeamId}
                        events={firstHalfEvents}
                        matchStatus={matchStatus}
                    />
                </div>
                <div className={MatchEventsLayout.matchHalfBox}>
                    <div className={MatchEventsLayout.halfHeader}>
                        <h3>2. POŁOWA</h3>
                    </div>
                    <EventsHalf
                        matchId={matchId}
                        awayTeamId={awayTeamId}
                        events={secondHalfEvents}
                        matchStatus={matchStatus}
                    />
                </div>
                {isOverTime ? (
                    <div className={MatchEventsLayout.matchHalfBox}>
                        <div className={MatchEventsLayout.halfHeader}>
                            <h3>Dogrywka</h3>
                        </div>
                        <EventsHalf
                            matchId={matchId}
                            awayTeamId={awayTeamId}
                            events={overTimeEvents}
                            matchStatus={matchStatus}
                        />
                    </div>
                ) : null}
            </div>
        </div>
    );
}
