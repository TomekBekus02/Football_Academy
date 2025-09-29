import { IMatchEventExt } from "@/types/IEvent";
import axios from "axios";

export async function createNewMatch(newMatch: FormData) {
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

interface deleteEventVars {
    eventId: string;
    matchId: string;
    result: {
        homeTeamResult: number;
        awayTeamResult: number;
    };
}
export async function deleteEvent({
    eventId,
    matchId,
    result,
}: deleteEventVars) {
    const res = await axios.delete(
        `/api/matches/${matchId}/${eventId}?result=${encodeURIComponent(
            JSON.stringify(result)
        )}`
    );
    return res.status;
}
interface deleteMatchVars {
    competitionId: string;
    matchId: string;
}
export async function deleteMatch({ competitionId, matchId }: deleteMatchVars) {
    const res = await axios.delete(
        `/api/matches/${matchId}?competitionId=${competitionId}`
    );
    return res.status;
}

