"use client";

import { useEffect, useState } from "react";
import ChooseTeams from "./chooseTeams/chooseTeams";
import { ITournamentTeam } from "@/types/ITeam";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchTeamsBasics } from "@/services/TeamsFetches/useTeams";
import LoadProvider from "@/components/LoadProvider/LoadProvider";
import { ITournament } from "@/types/ITournament";
import { createNewTournament } from "@/services/TournamentFetches/useTournament";
import { useRouter } from "next/navigation";

export default function createTournament() {
    const queryClient = useQueryClient();
    const router = useRouter();
    const {
        mutate,
        isPending,
        error: mutationError,
    } = useMutation({
        mutationFn: (newTournament: ITournament) =>
            createNewTournament(newTournament),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tournaments"] });
            router.push("/admin/rozgrywki");
            router.refresh();
        },
    });
    const {
        data: teams,
        isLoading,
        error: queryError,
    } = useQuery({
        queryKey: ["teams"],
        queryFn: fetchTeamsBasics,
    });
    const [availableTeams, setAvailableTeams] =
        useState<ITournamentTeam[]>(teams);
    const [selectedTeams, setSelectedTeams] = useState<ITournamentTeam[]>([]);
    const [teamLimits, setTeamLimits] = useState<number>(4);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const title = formData.get("title") as string;
        const date = formData.get("date") as string;
        const hour = formData.get("hour") as string;
        const place = formData.get("place") as string;
        const participants = selectedTeams.map((t) => t._id);
        mutate({ title, date, hour, place, participants });
    };
    const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        setTeamLimits(Number(e.target.value));
    };

    useEffect(() => {
        setAvailableTeams(teams);
    }, [teams]);
    return (
        <form onSubmit={handleSubmit} className="flex gap-6 p-6">
            <LoadProvider error={queryError} isLoading={isLoading}>
                <div>
                    <label>Nazwa turnieju</label>
                    <input type="text" name="title" />
                </div>
                <div>
                    <label>Data i godzina rozpoczęcia</label>
                    <input type="date" name="date" />
                    <input type="time" name="hour" />
                </div>
                <div>
                    <label>Miejsce turnieju</label>
                    <input type="text" name="place" />
                </div>
                <div>
                    <label>Ilość drużyn</label>
                    <select name="teamLimits" onChange={handleOnChange}>
                        <option value="4">Four</option>
                        <option value="8">Eight</option>
                    </select>
                </div>
                {availableTeams !== undefined ? (
                    <ChooseTeams
                        availableTeams={availableTeams}
                        setAvailableTeams={setAvailableTeams}
                        selectedTeams={selectedTeams}
                        setSelectedTeams={setSelectedTeams}
                        teamLimits={teamLimits}
                        currentTeamsSize={selectedTeams.length}
                    />
                ) : (
                    <p>Brak drużyn</p>
                )}
            </LoadProvider>

            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded h-fit"
                disabled={teamLimits !== selectedTeams.length}
            >
                {isPending ? "Tworzenie..." : "Zapisz"}
            </button>
        </form>
    );
}
