import { IPlayer } from "@/types/IPlayer";

type Column = {
    label: string;
    fieldName: keyof IPlayer;
};
export const columns: Column[] = [
    { label: "Numer", fieldName: "shirtNumber" },
    { label: "Nazwisko", fieldName: "name" },
    { label: "Występy", fieldName: "appearances" },
    { label: "Bramki", fieldName: "goals" },
    { label: "Asysty", fieldName: "assists" },
    { label: "Czyste konta", fieldName: "cleanSheet" },
    { label: "Czerwone kartki", fieldName: "redCards" },
    { label: "Żółte kartki", fieldName: "yellowCards" },
    { label: "MVP", fieldName: "MVPs" },
    { label: "Pozycja", fieldName: "position" },
];
