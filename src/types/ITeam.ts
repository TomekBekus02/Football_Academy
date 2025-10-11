export interface ITeam {
    _id: string;
    name: string;
    logo: string;
    matches: number;
    wins: number;
    draws: number;
    loses: number;
    scoredGoals: number;
    concededGoals: number;
    form: Array<ITeamsForm>;
    achievements: Array<string>;
}

export interface ITournamentTeam {
    _id: string;
    name: string;
    logo: string;
}
export interface IshortTeamInfo {
    id: string;
    name: string;
    score: number;
    penalties: number;
}
export interface ITeamsForm {
    matchId: string;
    matchDate: string;
    homeTeam: IshortTeamInfo;
    awayTeam: IshortTeamInfo;
}
export interface ITeamStats {
    matches: number;
    wins: number;
    draws: number;
    loses: number;
    assists: number;
    goals_scored: number;
    goals_conceded: number;
    goals_balance: number;
    avgTeamStats: IAvgTeamStats;
}
export interface IAvgTeamStats {
    shots: number;
    passAccuracy: number;
    offDuelsRate: number;
    deffDuelsRate: number;
    fauls: number;
}
