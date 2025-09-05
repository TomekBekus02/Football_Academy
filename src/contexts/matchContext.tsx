"use client";

import { IEvent, IPlayersEvent } from "@/types/IEvent";
import React, { ReactNode, useContext, createContext, useState } from "react";

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
    matchTeams: MatchTeamsType;
    resultObj: resultType;
    playersEvents: Array<IPlayersEvent>;
    setMatchTeams: (matchTeamsData: MatchTeamsType) => void;
    addEvent: (newEvent: IEvent) => void;
    updateScore: (teamId: string) => void;
};
type resultType = {
    homeTeamScore: Number;
    awayTeamScore: Number;
};
const MatchContext = createContext<MatchContextType | undefined>(undefined);

export const MatchProvider = ({ children }: { children: ReactNode }) => {
    const [events, setEvents] = useState<IEvent[]>([]);
    const [matchTeams, setMatchTeams] = useState<MatchTeamsType>({});
    const [playersEvents, setPlayersEvent] = useState<IPlayersEvent[]>([]);
    const [resultObj, setResultObj] = useState({
        homeTeamScore: 0,
        awayTeamScore: 0,
    });
    const addEvent = (newEvent: IEvent) => {
        setEvents((prev) => [...prev, newEvent]);
        setPlayersEvent((prev) => {
            const player = prev.find(
                (player) => player.id === newEvent.player.id
            );
            if (player) {
                const event = player.events.find(
                    (e) => e.eventType === newEvent.eventType
                );
                if (event) {
                    const modifyEvents = player.events.map((e) =>
                        e.eventType === newEvent.eventType
                            ? { ...e, quantity: e.quantity + 1 }
                            : e
                    );
                    return prev.map((e) =>
                        e.id === player.id ? { ...e, events: modifyEvents } : e
                    );
                } else {
                    const modifyEvents = [
                        ...player.events,
                        { eventType: newEvent.eventType, quantity: 1 },
                    ];
                    return prev.map((e) =>
                        e.id === player.id ? { ...e, events: modifyEvents } : e
                    );
                }
            } else {
                const newPlayer = {
                    id: newEvent.player.id,
                    name: newEvent.player.name,
                    teamId: newEvent.playerTeamId,
                    events: [{ eventType: newEvent.eventType, quantity: 1 }],
                };
                return [...prev, newPlayer];
            }
        });
    };
    const updateScore = (teamId: string) => {
        const key =
            teamId === matchTeams.homeTeam?._id
                ? "homeTeamScore"
                : "awayTeamScore";

        setResultObj((prev) => ({
            ...prev,
            [key]: prev[key] + 1,
        }));
    };
    return (
        <MatchContext.Provider
            value={{
                events,
                matchTeams,
                resultObj,
                playersEvents,
                setMatchTeams,
                addEvent,
                updateScore,
            }}
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
