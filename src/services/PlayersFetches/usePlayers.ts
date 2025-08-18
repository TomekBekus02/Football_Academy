import { IPlayer } from "@/types/IPlayer";
import axios from "axios";

export async function fetchPlayers(): Promise<IPlayer[]> {
    const res = await fetch("/api/players");

    if (!res.ok) {
        throw new Error("Błąd podczas pobierania danych");
    }

    return res.json();
}

export async function addPlayer(newPlayer: FormData) {
    const res = await axios.post("/api/players", newPlayer);

    return res.data.message;
}
