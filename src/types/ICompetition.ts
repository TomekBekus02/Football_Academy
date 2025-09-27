import { MatchStatus } from "./IMatch";
import { ITeamsForm } from "./ITeam";

export interface ICompetitions {
    allMatches: IMatchCompetition[];
    allTournaments: ITournamentCompetition[];
}

export interface ITeamDetails {
    id: string;
    name: string;
    score: number;
    penalties: number;
}

export interface ITeamForm {
    matchId: string;
    matchDate: string;
    homeTeam: ITeamDetails;
    awayTeam: ITeamDetails;
}

export interface IMatchCompetition {
    _id: string;
    homeTeamId: {
        _id: string;
        name: string;
        logo: string;
        form: Array<ITeamsForm>;
    };
    homeTeamScore: number;
    homeTeamPenaltiesScore: number;
    awayTeamId: {
        _id: string;
        name: string;
        logo: string;
        form: Array<ITeamsForm>;
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
    place: string;
    winnerId: {
        _id: string;
        name: string;
        logo: string;
    };
    isOnGoing: boolean;
    participants: {
        _id: string;
        logo: string;
    }[];
}
