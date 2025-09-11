import { ITournament } from "@/types/ITournament";
import axios from "axios";

export async function createNewTournament(newTournament: ITournament) {
    const res = await axios.post("/api/tournaments", newTournament);
    return res.status;
}

export async function fetchTournament(tournamentId: string) {
    const res = await fetch(`/api/tournaments/${tournamentId}`);
    return res.json();
}
