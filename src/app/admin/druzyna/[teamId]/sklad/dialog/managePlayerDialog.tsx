"use Client";

import InputTemplate from "@/components/inputTemplate/inputTemplate";
import {
    addPlayer,
    fetchSinglePlayer,
    updatedPlayer,
} from "@/services/PlayersFetches/usePlayers";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { forwardRef, useImperativeHandle, useRef } from "react";

type IDialog = {
    playerId: string;
};

export type ModalHandle = {
    showModal: () => void;
};

export const ManagePlayerDialog = forwardRef<ModalHandle, IDialog>(
    ({ playerId }, ref) => {
        const dialogRef = useRef<HTMLDialogElement>(null);
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
            <dialog ref={dialogRef}>
                <form onSubmit={handleSubmit}>
                    <InputTemplate
                        inputType="text"
                        inputText="Imie i nazwisko"
                        inputName="name"
                        inputValue={playerId !== "" ? playerData?.name : null}
                    />
                    <InputTemplate
                        inputType="date"
                        inputText="Data urodzenia"
                        inputName="dateOfBirth"
                        inputValue={
                            playerId !== "" ? playerData?.dateOfBirth : null
                        }
                    />
                    <div>
                        <label>Pozycja</label>
                        <select
                            name="position"
                            defaultValue={playerData?.position}
                        >
                            <option value="Bramkarz">Bramkarz</option>
                            <option value="Obrońca">Obrońca</option>
                            <option value="Pomocnik">Pomocnik</option>
                            <option value="Napastnik">Napastnik</option>
                        </select>
                    </div>
                    <InputTemplate
                        inputType="number"
                        inputText="Numer na koszulce"
                        inputName="number"
                        inputValue={
                            playerId !== "" ? playerData?.shirtNumber : null
                        }
                    />
                    <div>
                        <label>Obraz</label>
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
                    <button
                        type="button"
                        onClick={() => dialogRef?.current?.close()}
                    >
                        Anuluj
                    </button>
                    <button type="submit" disabled={isPending}>
                        {playerId
                            ? isPending
                                ? "Aktualizowanie..."
                                : "Edytuj"
                            : isPending
                            ? "Dodawanie..."
                            : "Dodaj"}
                    </button>
                </form>
            </dialog>
        );
    }
);
