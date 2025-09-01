"use client";
import Link from "next/link";
import MatchEventsLayout from "./matchEvetns.module.css";

type matchEventProps = {
    matchId: string;
};
export default function matchEvents({ matchId }: matchEventProps) {
    return (
        <div className={MatchEventsLayout.matchEventsBox}>
            <button>
                <Link href={`/admin/mecz/${matchId}/dodaj-wydarzenie`}>
                    Dodaj event
                </Link>
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
