"use client";

import { useEffect, useRef, useState } from "react";
import ChooseTeams from "./chooseTeams/chooseTeams";
import { ITournamentTeam } from "@/types/ITeam";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchTeamsBasics } from "@/services/TeamsFetches/useTeams";
import LoadProvider from "@/components/LoadProvider/LoadProvider";
import { ITournament } from "@/types/ITournament";
import { createNewTournament } from "@/services/TournamentFetches/useTournament";
import inputLayout from "@/components/inputTemplate/inputTemplate.module.css";
import createTourLayout from "./createTournament.module.css";

type matchPropsType = {
    dialogRef: React.MutableRefObject<HTMLDialogElement | null>;
};

export default function createTournament({ dialogRef }: matchPropsType) {
    const queryClient = useQueryClient();

    const {
        mutate,
        isPending,
        error: mutationError,
    } = useMutation({
        mutationFn: (newTournament: ITournament) =>
            createNewTournament(newTournament),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tournaments"] });
            queryClient.invalidateQueries({ queryKey: ["competitions"] });
            formRef?.current?.reset();
            dialogRef?.current?.close();
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

    const formRef = useRef<HTMLFormElement>(null);

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
        <LoadProvider error={queryError} isLoading={isLoading}>
            <form
                onSubmit={handleSubmit}
                ref={formRef}
                className={`${createTourLayout.formBox}`}
            >
                <div
                    className={`${inputLayout.inputGroup} ${createTourLayout.inputBox}`}
                >
                    <input type="text" name="title" />
                    <label>Nazwa turnieju</label>
                </div>
                <div
                    className={`${inputLayout.inputGroup} ${createTourLayout.inputBox}`}
                >
                    <input type="date" name="date" />
                    <input type="time" name="hour" />
                    <label>Termin rozpoczęcia</label>
                </div>
                <div
                    className={`${inputLayout.inputGroup} ${createTourLayout.inputBox}`}
                >
                    <input type="text" name="place" />
                    <label>Miejsce turnieju</label>
                </div>
                <div
                    className={`${inputLayout.inputGroup} ${createTourLayout.inputBox}`}
                >
                    <select name="teamLimits" onChange={handleOnChange}>
                        <option value="4">4</option>
                        <option value="8">8</option>
                    </select>
                    <label>Ilość drużyn</label>
                </div>
                {availableTeams !== undefined ? (
                    <div className={createTourLayout.teamsBox}>
                        <ChooseTeams
                            availableTeams={availableTeams}
                            setAvailableTeams={setAvailableTeams}
                            selectedTeams={selectedTeams}
                            setSelectedTeams={setSelectedTeams}
                            teamLimits={teamLimits}
                            currentTeamsSize={selectedTeams.length}
                        />
                    </div>
                ) : (
                    <p>Brak drużyn</p>
                )}
                <div className="dialogButtonBox">
                    <button
                        type="button"
                        onClick={() => {
                            formRef?.current?.reset();
                            dialogRef?.current?.close();
                        }}
                        className="buttonStyle cancelBtn"
                    >
                        Anuluj
                    </button>
                    <button
                        type="submit"
                        disabled={teamLimits !== selectedTeams.length}
                        className="buttonStyle addBtn"
                    >
                        {isPending ? "Tworzenie..." : "Zapisz"}
                    </button>
                </div>
            </form>
        </LoadProvider>
    );
}
