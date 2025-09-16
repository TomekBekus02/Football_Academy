import { IMatchEvent } from "./IEvent";

export interface IMatch {
    matchDate: string;
    matchHour: string;
    place: string;
    homeTeamId: string;
    homeTeamScore: number;
    homeTeamPenaltiesScore: Number;
    awayTeamId: string;
    awayTeamScore: number;
    awayTeamPenaltiesScore: Number;
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
