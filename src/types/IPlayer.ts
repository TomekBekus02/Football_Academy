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


