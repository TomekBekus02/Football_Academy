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
