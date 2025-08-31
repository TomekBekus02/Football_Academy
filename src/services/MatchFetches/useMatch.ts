import axios from "axios";

export async function createMatch(newMatch: FormData) {
    const res = await axios.post("/api/matches", newMatch);

    return res.status;
}
export async function fetchMatchDetails(matchId: string) {
    const res = await fetch(`/api/matches/${matchId}`);
    const result = await res.json();
    console.log(result);
    return result;
}
