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
