export interface IMatchCompetition {
    _id: string;
    isOngoing: boolean;
    label: string;
    competitionId: string;
    TeamDetails: {
        result: string;
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
