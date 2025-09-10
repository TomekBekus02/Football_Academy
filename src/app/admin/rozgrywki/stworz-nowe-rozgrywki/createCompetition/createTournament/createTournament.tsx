"use client";

import { useEffect, useState } from "react";
import ChooseTeams from "./chooseTeams/chooseTeams";
import { ITournamentTeam } from "@/types/ITeam";
import { useQuery } from "@tanstack/react-query";
import { fetchTeamsBasics } from "@/services/TeamsFetches/useTeams";
import LoadProvider from "@/components/LoadProvider/LoadProvider";

export default function createTournament() {
    const {
        data: teams,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["teams"],
        queryFn: fetchTeamsBasics,
    });
    const [availableTeams, setAvailableTeams] =
        useState<ITournamentTeam[]>(teams);
    const [selectedTeams, setSelectedTeams] = useState<ITournamentTeam[]>([]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const teamIds = selectedTeams.map((t) => t._id);

        await fetch("/api/saveTeams", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ teamIds }),
        });

        alert("Zapisano drużyny: " + teamIds.join(", "));
    };

    useEffect(() => {
        setAvailableTeams(teams);
    }, [teams]);
    return (
        <form onSubmit={handleSubmit} className="flex gap-6 p-6">
            <LoadProvider error={error} isLoading={isLoading}>
                {availableTeams !== undefined ? (
                    <ChooseTeams
                        availableTeams={availableTeams}
                        setAvailableTeams={setAvailableTeams}
                        selectedTeams={selectedTeams}
                        setSelectedTeams={setSelectedTeams}
                    />
                ) : (
                    <p>Brak drużyn</p>
                )}
            </LoadProvider>

            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded h-fit"
            >
                Zapisz
            </button>
        </form>
    );
}
