export interface IMatchCompetition {
    _id: string;
    isOngoing: boolean;
    label: string;
    competitionId: string;
    TeamDetails: {
        homeTeamScore: number;
        awayTeamScore: number;
        homeTeamId: {
            name: string;
            logo: string;
        };
        awayTeamId: {
            name: string;
            logo: string;
        };
    };
}
export interface ITournamentCompetition {
    _id: string;
    isOngoing: boolean;
    label: string;
    competitionId: string;
    TournamentDetails: {
        _id: string;
        title: string;
        date: string;
        hour: string;
        topTeams: {
            _id: string;
            name: string;
            logo: string;
        }[];
        isOnGoing: boolean;
    };
}
