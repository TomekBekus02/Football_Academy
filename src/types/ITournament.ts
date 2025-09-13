export interface ITournament {
    title: string;
    date: string;
    hour: string;
    place: string;
    participants: string[];
}
export interface IBracketMatch {
    id: string;
    round: number;
    matchNumber: number;
    home: {
        _id: string;
        team: { name: string; logo: string };
        score: number;
    };
    away: {
        _id: string;
        team: { name: string; logo: string };
        score: number;
    };
}
export interface IBracketTournament {
    _id: string;
    title: string;
    date: string;
    hour: string;
    place: string;
    participants: string[];
    matches: IBracketMatch[];
}
