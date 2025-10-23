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
    yellowCards: number;
    redCards: number;
    scoredGoals: number;
    concededGoals: number;
    goals_balance: number;
    avgTeamStats: IAvgTeamStats;
}
export interface IAvgTeamStats {
    offense: {
        goals: number;
        xpGoals: number;
        shoots: number;
        shotsOnTarget: number;
        duelsWon: number;
        duelsLost: number;
    };
    deffense: {
        fauls: number;
        yellowCards: number;
        redCards: number;
        airDuelsWon: number;
        airDuelsLost: number;
        groundDuelsWon: number;
        groundDuelsLost: number;
    };
    playmaking: {
        assists: number;
        xpAssists: number;
        createdChance: number;
        progressivePasses: number;
        successCrosses: number;
        failedCrosses: number;
    };
}
