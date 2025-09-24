"use Client";

import InputTemplate from "@/components/inputTemplate/inputTemplate";
import {
    addPlayer,
    fetchSinglePlayer,
    updatedPlayer,
} from "@/services/PlayersFetches/usePlayers";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { forwardRef, useImperativeHandle, useRef } from "react";
import dialogLayout from "./playerDialog.module.css";
import inputLayout from "@/components/inputTemplate/inputTemplate.module.css";
import "@/styles/dialog.css";
import { ChevronDown } from "lucide-react";

type IDialog = {
    playerId: string;
};

export type ModalHandle = {
    showModal: () => void;
};

export const ManagePlayerDialog = forwardRef<ModalHandle, IDialog>(
    ({ playerId }, ref) => {
        const dialogRef = useRef<HTMLDialogElement>(null);
        const formRef = useRef<HTMLFormElement>(null);

        const queryClient = useQueryClient();

        useImperativeHandle(ref, () => ({
            showModal: () => {
                dialogRef.current?.showModal();
            },
        }));

        const { mutate, isPending, isError } = useMutation({
            mutationFn: (payload: {
                playerId?: string;
                formData: FormData;
            }) => {
                if (payload.playerId) {
                    return updatedPlayer({
                        playerId: payload.playerId,
                        newPlayer: payload.formData,
                    });
                } else {
                    return addPlayer(payload.formData);
                }
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["players"] });
            },
        });

        const {
            data: playerData,
            error,
            isLoading,
        } = useQuery({
            queryKey: ["players", playerId],
            queryFn: ({ queryKey }) => {
                const [, playerId] = queryKey;
                return fetchSinglePlayer(playerId as string);
            },
            enabled: !!playerId,
        });

        const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            const form = e.currentTarget;
            const formData = new FormData(form);

            mutate({ playerId: playerId || undefined, formData });
            e.currentTarget.reset();
            dialogRef?.current?.close();
        };

        return (
            <dialog ref={dialogRef} className={`dialogBox`}>
                <form
                    onSubmit={handleSubmit}
                    ref={formRef}
                    className={dialogLayout.dialogContent}
                >
                    <InputTemplate
                        type="text"
                        inputText="Imie i nazwisko"
                        name="name"
                        defaultValue={playerId !== "" ? playerData?.name : null}
                    />
                    <InputTemplate
                        type="date"
                        inputText="Data urodzenia"
                        name="dateOfBirth"
                        defaultValue={
                            playerId !== "" ? playerData?.dateOfBirth : null
                        }
                    />
                    <div className={inputLayout.inputGroup}>
                        <select
                            name="position"
                            defaultValue={playerData?.position}
                        >
                            <option value="Bramkarz">Bramkarz</option>
                            <option value="Obrońca">Obrońca</option>
                            <option value="Pomocnik">Pomocnik</option>
                            <option value="Napastnik">Napastnik</option>
                        </select>
                        <label>Pozycja</label>
                        <ChevronDown className={inputLayout.selectIcon} />
                    </div>
                    <InputTemplate
                        type="number"
                        inputText="Numer na koszulce"
                        name="number"
                        defaultValue={
                            playerId !== "" ? playerData?.shirtNumber : null
                        }
                    />
                    <div>
                        <input
                            type="file"
                            accept="image/png, image/jpeg, image/jpg"
                            name="photo"
                        />
                    </div>
                    <input
                        type="text"
                        defaultValue={playerData?.photo}
                        name="photoPath"
                        hidden
                    />
                    <div className={dialogLayout.buttonBox}>
                        <button
                            type="button"
                            onClick={() => {
                                dialogRef?.current?.close();
                                formRef?.current?.reset();
                            }}
                            className="buttonStyle cancelBtn"
                        >
                            Anuluj
                        </button>
                        <button
                            type="submit"
                            disabled={isPending}
                            className="buttonStyle addBtn"
                        >
                            {playerId
                                ? isPending
                                    ? "Aktualizowanie..."
                                    : "Edytuj"
                                : isPending
                                ? "Dodawanie..."
                                : "Dodaj"}
                        </button>
                    </div>
                </form>
            </dialog>
        );
    }
);
