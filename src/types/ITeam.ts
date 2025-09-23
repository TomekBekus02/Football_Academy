export interface ITeam {
    _id: string;
    name: string;
    logo: string;
    matches: number;
    wins: number;
    draws: number;
    loses: number;
    goal_balance: number;
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
    penScore: number;
}
export interface ITeamsForm {
    matchId: string;
    matchDate: string;
    homeTeam: IshortTeamInfo;
    awayTeam: IshortTeamInfo;
}
