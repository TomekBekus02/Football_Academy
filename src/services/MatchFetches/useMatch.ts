import { IMatchEventExt } from "@/types/IEvent";
import axios from "axios";

export async function createMatch(newMatch: FormData) {
    const res = await axios.post("/api/matches", newMatch);

    return res.status;
}
export async function fetchMatchDetails(matchId: string) {
    const res = await fetch(`/api/matches/${matchId}`);
    const result = await res.json();
    return result;
}
interface AddEventVars {
    newEvent: IMatchEventExt;
    matchId: string;
}
export async function createEvent({ newEvent, matchId }: AddEventVars) {
    const res = await axios.post(`/api/matches/${matchId}`, newEvent);

    return res.status;
}
interface MatchProgressVars {
    matchId: string;
    matchStatusType: string;
}
export async function updateMatchProgress({
    matchStatusType,
    matchId,
}: MatchProgressVars) {
    const res = await axios.put(`/api/matches/${matchId}`, { matchStatusType });

    return res.status;
}
