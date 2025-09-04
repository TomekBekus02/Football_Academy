"use client";

import MatchEventsLayout from "./matchEvetns.module.css";
import { AddEventDialog } from "../dialogs/addEventDialog";
import { useRef } from "react";
import { useMatch } from "@/contexts/matchContext";
import { EventsHalf } from "./eventsHalf/eventsHalf";

type matchEventProps = {
    matchId: string;
    awayTeamId: string;
    homeTeamId: string;
};
export default function matchEvents({
    matchId,
    homeTeamId,
    awayTeamId,
}: matchEventProps) {
    const eventDialog = useRef<HTMLDialogElement>(null);
    const { events } = useMatch();
    return (
        <div className={MatchEventsLayout.matchEventsBox}>
            <AddEventDialog
                ref={eventDialog}
                matchId={matchId}
                homeTeamId={homeTeamId}
                awayTeamId={awayTeamId}
            />
            <button onClick={() => eventDialog.current?.showModal()}>
                Dodaj event
            </button>
            <div className={MatchEventsLayout.matchHalfBox}>
                <div className={MatchEventsLayout.halfHeader}>
                    <h3>1. POŁOWA</h3>
                    <p>0-0</p>
                </div>

                <EventsHalf half={1} awayTeamId={awayTeamId} />
            </div>
            <div className={MatchEventsLayout.matchHalfBox}>
                <div className={MatchEventsLayout.halfHeader}>
                    <h3>2. POŁOWA</h3>
                    <p>0-0</p>
                </div>
                <EventsHalf half={2} awayTeamId={awayTeamId} />
            </div>
        </div>
    );
}
