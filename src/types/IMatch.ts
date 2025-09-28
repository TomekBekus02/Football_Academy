import { IMatchEvent } from "./IEvent";

export interface IMatch {
    _id: string;
    matchDate: string;
    matchHour: string;
    place: string;
    homeTeamId: string;
    homeTeamScore: number;
    homeTeamPenaltiesScore: number;
    awayTeamId: string;
    awayTeamScore: number;
    awayTeamPenaltiesScore: number;
    tournamentId: string;
    events: IMatchEvent[];
    matchStatus: MatchStatus;
    isOverTime: boolean;
}

export enum MatchStatus {
    CREATED = "CREATED",
    IN_PROGRESS = "IN_PROGRESS",
    FINISHED = "FINISHED",
}
