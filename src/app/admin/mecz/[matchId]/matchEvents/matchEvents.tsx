"use client";
import Link from "next/link";
import MatchEventsLayout from "./matchEvetns.module.css";
import { AddEventDialog } from "../dialogs/addEventDialog";
import { useRef } from "react";

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
            </div>
            <div className={MatchEventsLayout.matchHalfBox}>
                <div className={MatchEventsLayout.halfHeader}>
                    <h3>2. POŁOWA</h3>
                    <p>0-0</p>
                </div>
            </div>
        </div>
    );
}
