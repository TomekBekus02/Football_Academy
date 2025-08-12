import { IPlayer } from "@/types/IPlayer";

export async function fetchPlayers(): Promise<IPlayer[]> {
    const res = await fetch("/api/players");

    if (!res.ok) {
        throw new Error("Błąd podczas pobierania danych");
    }

    return res.json();
}
