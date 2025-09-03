export interface IEvent {
    eventType: string;
    playerTeamId: string;
    basicTime: number;
    extraTime: number;
    playerId: string;
    assist_playerId?: string | null;
}
