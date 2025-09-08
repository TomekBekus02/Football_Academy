export interface IEvent {
    eventType: string;
    playerTeamId: string;
    basicTime: number;
    extraTime: number;
    player: {
        id: string;
        name: string;
    };
    assist_player?: {
        id: string;
        name: string;
    };
}

// export interface IPlayersEvent {
//     id: string;
//     name: string;
//     teamId: string;
//     events: {
//         eventType: string;
//         quantity: number;
//     }[];
// }

export interface IMatchEvent {
    eventType: string;
    teamId: string;
    player: {
        id: string;
        name: string;
        isAvailable: boolean;
    };
    assist_player?: {
        id: string;
        name: string;
        isAvailable: boolean;
    };
    time: {
        base: number;
        extra: number;
    };
}

export interface IMatchEventExt {
    eventType: string;
    teamId: string;
    player: {
        id: string;
        name: string;
        isAvailable: boolean;
    };
    assist_player?: {
        id: string;
        name: string;
        isAvailable: boolean;
    };
    time: {
        base: number;
        extra: number;
    };
    result: {
        homeTeamResult: number,
        awayTeamResult: number
    }
}