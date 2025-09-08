import { IMatchEvent } from "./IEvent";

export interface IMatch {
    matchDate: string;
    matchHour: string;
    place: string;
    homeTeamId: string;
    homeTeamScore: number;
    awayTeamId: string;
    awayTeamScore: number;
    tournamentId: string;
    events: IMatchEvent[];
    isOnGoing: boolean;
}
