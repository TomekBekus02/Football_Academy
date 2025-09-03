"use client";

import { IEvent } from "@/types/IEvent";
import { ReactNode, useContext, createContext, useState } from "react";

type MatchTeamsType = {
    homeTeam?: {
        _id: string;
        name: string;
        players: [
            {
                _id: string;
                name: string;
                shirtNumber: string;
            }
        ];
    };
    awayTeam?: {
        _id: string;
        name: string;
        players: [
            {
                _id: string;
                name: string;
                shirtNumber: string;
            }
        ];
    };
};
type MatchContextType = {
    events: Array<IEvent>;
    handleEvents: (eventData: IEvent) => void;
    matchTeams: MatchTeamsType;
    setMatchTeams: (matchTeamsData: MatchTeamsType) => void;
};
const MatchContext = createContext<MatchContextType | undefined>(undefined);

export const MatchProvider = ({ children }: { children: ReactNode }) => {
    const [events, setEvents] = useState<IEvent[]>([]);
    const [matchTeams, setMatchTeams] = useState<MatchTeamsType>({});

    const handleEvents = (eventData: IEvent) => {
        console.log("events z BD: ", eventData);
        setEvents((prev) => [...prev, eventData]);
    };

    return (
        <MatchContext.Provider
            value={{ events, matchTeams, setMatchTeams, handleEvents }}
        >
            {children}
        </MatchContext.Provider>
    );
};

export const useMatch = () => {
    const context = useContext(MatchContext);
    if (!context) {
        throw new Error("useMatch must be used within a MatchProvider");
    }
    return context;
};
