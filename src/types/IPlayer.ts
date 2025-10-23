import { ITeamStats } from "./ITeam";

export interface IPlayer {
    _id?: string;
    name: string;
    shirtNumber: number;
    dateBirth: string;
    photo: string;
    position: string;
    appearances?: number;
    cleanSheet?: number;
    goals?: number;
    assists?: number;
    MVPs?: number;
    redCards?: number;
    yellowCards?: number;
}

export interface IStatPlayer {
    _id: string;
    name: string;
    photo: string;
    statCategory: string;
    statNumber: number;
}
export interface IPlayerStats {
    statsHistory: IPlayerStatsHistory[];
    playerDetails: IPlayerDetails;
}

export interface IPlayerDetails {
    _id: string;
    name: string;
    shirtNumber: number;
    dateBirth: string;
    photo: string;
    position: string;
    appearances: number;
    cleanSheet: number;
    goals: number;
    assists: number;
    redCards: number;
    yellowCards: number;
    AvgPlayerStatsdetails: IPlayerStatsDetails;
    AvgTeammatesStatsdetails: IPlayerStatsDetails;
    teamStats: ITeamStats;
}

export interface IPlayerStatsDetails {
    Attack: IAttackStat;
    Playmaking: IPlaymakingStat;
    Defense: IDeffenseStat;
    Goalkeeper: IGoalkeeperStat;
}
export interface IAttackStat {
    goals: number;
    xpGoal: number;
    shots: number;
    shotsOntarget: number;
    offensiveDuels: {
        lost: number;
        won: number;
    };
}
export interface IPlaymakingStat {
    assists: number;
    xpAssists: number;
    createdChances: number;
    passAccuracy: number;
    longPassAccuracy: number;
    progressivePasses: number;
    crosses: {
        failed: number;
        succeded: number;
    };
}
export interface IDeffenseStat {
    cleanSheets: number;
    yellowCards: number;
    redCards: number;
    headerDuels: {
        lost: number;
        won: number;
    };
    groundDuels: {
        lost: number;
        won: number;
    };
    fauls: number;
    interceptions: number;
}
export interface IGoalkeeperStat {
    cleanSheets: number;
    xpConcededGoals: number;
    saveSuccessRate: number;
    interventions: number;
}

export interface IPlayerStatsHistory {
    team: {
        teamId: string;
        logo: string;
    };
    playerStats: {
        appearances: number;
        assists: number;
        goals: number;
        cleanSheets: number;
        redCards: number;
        yellowCards: number;
    };
}