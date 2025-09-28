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
interface deleteTournamentVars {
    competitionId: string;
    tournamentId: string;
}
export async function deleteTournament({
    competitionId,
    tournamentId,
}: deleteTournamentVars) {
    const res = await axios.delete(
        `/api/tournaments/${tournamentId}?competitionId=${competitionId}`
    );
    return res.status;
}
