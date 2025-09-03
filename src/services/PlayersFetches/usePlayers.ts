import { IPlayer } from "@/types/IPlayer";
import axios from "axios";

export async function fetchTeamSquad(teamId: string): Promise<IPlayer[]> {
    const res = await fetch(`/api/players?teamId=${teamId}`);

    if (!res.ok) {
        throw new Error("Błąd podczas pobierania danych");
    }

    return res.json();
}

export async function addPlayer(newPlayer: FormData) {
    const res = await axios.post("/api/players", newPlayer);

    return res.data.message;
}

export async function updatedPlayer({
    playerId,
    newPlayer,
}: {
    playerId: string;
    newPlayer: FormData;
}) {
    const res = await axios.put(`/api/players/${playerId}`, newPlayer);
    if (res.status != 200)
        throw new Error("Nie udało się pobrać danych gracza");
    return res.status;
}

export async function fetchSinglePlayer(playerId: string) {
    const res = await fetch(`/api/players/${playerId}`);
    if (!res.ok) {
        throw new Error("Błąd podczas pobierania danych");
    }

    return res.json();
}

export async function deletePlayer(playerId: string) {
    const res = axios.delete(`/api/players/${playerId}`);

    if ((await res).status !== 200 ) {
        throw new Error("Błąd podczas pobierania danych");
    }

    return (await res).status;
}

export async function fetchAllPlayersForMatch(
    homeTeam: string,
    awayTeam: string
) {
    const res = await fetch(
        `/api/matches?homeTeam=${homeTeam}&awayTeam=${awayTeam}`
    );
    return (await res).json();
}
