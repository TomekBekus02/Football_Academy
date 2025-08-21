"use client";
import { useState } from "react";
import CreateMatch from "@/components/createCompetition/createMatch/createMatch";
import CreateTournament from "@/components/createCompetition/createTournament/createTournament";

export default function createSportGames() {
    const [eventType, setEventType] = useState("tournament");
    return (
        <div>
            <h1>Nowe wydarzenie</h1>
            <div>
                <button onClick={() => setEventType("tournament")}>
                    Stwórz turniej
                </button>
                <button onClick={() => setEventType("match")}>
                    Stwórz mecz
                </button>
            </div>
            <div>
                {eventType === "tournament" ? (
                    <CreateTournament />
                ) : (
                    <CreateMatch />
                )}
            </div>
        </div>
    );
}
