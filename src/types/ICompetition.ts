import { MatchStatus } from "./IMatch";

export interface ICompetitions {
    allMatches: IMatchCompetition[];
    allTournaments: ITournamentCompetition[];
}
export interface IMatchCompetition {
    _id: string;
    homeTeamId: {
        _id: string;
        name: string;
        logo: string;
    };
    homeTeamScore: number;
    homeTeamPenaltiesScore: number;
    awayTeamId: {
        _id: string;
        name: string;
        logo: string;
    };
    awayTeamScore: number;
    awayTeamPenaltiesScore: number;
    matchStatus: MatchStatus;
    matchDate: string;
    matchHour: string;
    place: string;
}
export interface ITournamentCompetition {
    _id: string;
    title: string;
    date: string;
    hour: string;
    winnerId: string;
    isOnGoing: boolean;
}
