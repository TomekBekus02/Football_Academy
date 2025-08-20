"use client";

import React from "react";
import { IPlayer } from "@/models/player";
import {
    addPlayer,
    fetchSinglePlayer,
} from "@/services/PlayersFetches/usePlayers";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function editPlayer({
    params,
}: {
    params: { editedPlayerId: string };
}) {
    const queryClient = useQueryClient();
    const router = useRouter();
    const playerId = params.editedPlayerId;

    const { mutate, isPending, isError } = useMutation({
        mutationFn: async (newPlayer: FormData) => {
            const res = await axios.put(`/api/players/${playerId}`, newPlayer);
            if (res.status != 200)
                throw new Error("Nie udało się pobrać danych gracza");
            return res.status;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["players"] });
            router.push("/admin/sklad");
            router.refresh();
        },
    });
    const {
        data: playerData,
        error,
        isLoading,
    } = useQuery({
        queryKey: ["players", playerId] as const,
        queryFn: async () => {
            const res = await fetch(`/api/players/${playerId}`);
            if (!res.ok) throw new Error("Nie udało się pobrać danych gracza");
            //console.log(res);
            return res.json();
        },
    });
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);
        mutate(formData);
    };
    if (isLoading)
        return (
            <tr>
                <td>Ładowanie...</td>
            </tr>
        );
    if (error)
        return (
            <tr>
                <td>Błąd: {error.message}</td>
            </tr>
        );
    return (
        <div>
            <h1>here add player</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Imie i nazwisko</label>
                    <input
                        type="text"
                        name="name"
                        required
                        defaultValue={playerData?.name}
                    />
                </div>
                <div>
                    <label>Data urodzenia</label>
                    <input
                        type="date"
                        name="dateOfBirth"
                        required
                        defaultValue={playerData?.dateOfBirth}
                    />
                </div>
                <div>
                    <label>Pozycja</label>
                    <select name="position" defaultValue={playerData?.position}>
                        <option value="Bramkarz">Bramkarz</option>
                        <option value="Obrońca">Obrońca</option>
                        <option value="Pomocnik">Pomocnik</option>
                        <option value="Napastnik">Napastnik</option>
                    </select>
                </div>
                <div>
                    <label>Numer na koszulce</label>
                    <input
                        type="text"
                        name="number"
                        defaultValue={playerData?.shirtNumber}
                        required
                    />
                </div>
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
                <button type="submit" disabled={isPending}>
                    {isPending ? "Aktualizwanie..." : "Edytuj"}
                </button>
            </form>
        </div>
    );
}
