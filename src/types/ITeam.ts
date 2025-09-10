export interface ITeam {
    _id: string;
    name: string;
    logo: string;
    matches: number;
    wins: number;
    draws: number;
    loses: number;
    goal_balance: number;
    form: Array<string>;
    achievements: Array<string>;
}

export interface ITournamentTeam {
    _id: string;
    name: string;
    logo: string;
}
