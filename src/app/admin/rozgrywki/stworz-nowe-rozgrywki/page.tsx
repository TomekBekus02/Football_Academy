"use client";
import { useState } from "react";
import CreateMatch from "@/app/admin/rozgrywki/stworz-nowe-rozgrywki/createCompetition/createMatch/createMatch";
import CreateTournament from "@/app/admin/rozgrywki/stworz-nowe-rozgrywki/createCompetition/createTournament/createTournament";

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
