"use client";

import InputTeamsOption from "@/app/admin/rozgrywki/dialog/createMatch/inputTeamsOption/inputTeamsOption";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMatch } from "@/services/MatchFetches/useMatch";
import inputLayout from "@/components/inputTemplate/inputTemplate.module.css";

import React, { useRef } from "react";

type matchPropsType = {
    dialogRef: React.MutableRefObject<HTMLDialogElement | null>;
};
export default function createNewMatch({ dialogRef }: matchPropsType) {
    const queryClient = useQueryClient();
    const formRef = useRef<HTMLFormElement>(null);

    const { mutate, isPending, error } = useMutation({
        mutationFn: (newMatch: FormData) => createMatch(newMatch),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["match"] });
            queryClient.invalidateQueries({ queryKey: ["competitions"] });
            formRef?.current?.reset();
            dialogRef?.current?.close();
        },
    });
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        mutate(formData);
    };
    return (
        <form ref={formRef} onSubmit={handleSubmit}>
            <div>
                <InputTeamsOption
                    selectName="homeTeamId"
                    labelText="Gospodarz"
                />
                <InputTeamsOption selectName="awayTeamId" labelText="Gość" />
            </div>
            <div className={inputLayout.inputGroup}>
                <input type="text" name="place" />
                <label>Adres meczu</label>
            </div>
            <div className={inputLayout.inputGroup}>
                <input type="time" name="matchHour" />
                <label>Data</label>
            </div>
            <div className={inputLayout.inputGroup}>
                <input type="date" name="matchDate" />
                <label>Godzina</label>
            </div>

            <input type="text" name="tournamentId" defaultValue="" hidden />
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
                <button type="submit" className="buttonStyle addBtn">
                    {isPending ? "Tworzenie..." : "Stwórz mecz"}
                </button>
            </div>
        </form>
    );
}
