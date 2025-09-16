import { MatchStatus } from "@/models/match";

export interface ITournament {
    title: string;
    date: string;
    hour: string;
    place: string;
    participants: string[];
}
export interface IBracketMatch {
    id: string;
    round: number;
    matchNumber: number;
    matchStatus: MatchStatus;
    isOverTime: boolean;
    home: {
        _id: string;
        team: { name: string; logo: string };
        score: number;
        penaltiesScore: number;
    };
    away: {
        _id: string;
        team: { name: string; logo: string };
        score: number;
        penaltiesScore: number;
    };
}
export interface IBracketTournament {
    _id: string;
    title: string;
    date: string;
    hour: string;
    place: string;
    participants: string[];
    matches: IBracketMatch[];
}
