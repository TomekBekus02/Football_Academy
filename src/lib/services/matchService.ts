import Match, { MatchStatus } from "@/models/match";
import mongoose from "mongoose";

export async function createNewMatch(
    homeTeamId: string | null,
    awayTeamId: string | null,
    date: string,
    hour: string,
    place: string,
    round: number,
    matchNumber: number,
    tournamentId: mongoose.Types.ObjectId | string
) {
    const newMatch = new Match({
        homeTeamId,
        homeTeamScore: 0,
        homeTeamPenaltiesScore: 0,
        awayTeamId,
        awayTeamScore: 0,
        awayTeamPenaltiesScore: 0,
        matchDate: date,
        matchHour: hour,
        place,
        round,
        matchNumber,
        events: [],
        tournamentId,
        matchStatus: MatchStatus.CREATED,
        isOverTime: false,
    });
    await newMatch.save();
    return newMatch;
}
