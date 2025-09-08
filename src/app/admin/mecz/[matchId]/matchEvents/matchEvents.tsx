"use client";

import MatchEventsLayout from "./matchEvetns.module.css";
import { AddEventDialog } from "../dialogs/addEventDialog";
import { useRef } from "react";
import { EventsHalf } from "./eventsHalf/eventsHalf";
import { IMatchEvent } from "@/types/IEvent";

type matchEventProps = {
    matchId: string;
    awayTeamId: string;
    homeTeamId: string;
    homeTeamScore: number;
    awayTeamScore: number;
    events: IMatchEvent[];
};
export default function matchEvents({
    matchId,
    homeTeamId,
    awayTeamId,
    events,
    homeTeamScore,
    awayTeamScore,
}: matchEventProps) {
    const eventDialog = useRef<HTMLDialogElement>(null);
    const firstHalfEvents = events.filter((event) => event.time.base <= 45);
    const secondHalfEvents = events.filter((event) => event.time.base > 45);
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
            <button
                onClick={() => {
                    eventDialog.current?.showModal();
                }}
            >
                Dodaj event
            </button>
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
