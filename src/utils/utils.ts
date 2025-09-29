import { IMatchEvent } from "@/types/IEvent";

export const extractPlayerName = (selectElement: HTMLSelectElement) => {
    const selectedOption = selectElement.selectedOptions[0];
    if (!selectedOption) return "";
    return selectedOption.text.replace(/^\d+\. /, "");
};

export const mapEventsToIMatchEvent = (events: any[]): IMatchEvent[] => {
    return events.map((e) => ({
        _id: e._id,
        eventType: e.eventType,
        teamId: e.teamId,
        player: {
            ...e.player,
            id: e.player.id.toString(),
        },
        assist_player: e.assist_player
            ? { ...e.assist_player, id: e.assist_player.id.toString() }
            : undefined,
        time: e.time,
    }));
};

export const updateScore = (
    eventTeamId: string,
    homeTeamId: string,
    homeTeamResult: number,
    awayTeamResult: number,
    eventType: string,
    incValue: number
) => {
    if (eventType !== "Goal") {
        return { homeTeamResult, awayTeamResult };
    }
    const isHomeTeamGoal = eventTeamId === homeTeamId;

    return {
        homeTeamResult: isHomeTeamGoal
            ? homeTeamResult + incValue
            : homeTeamResult,
        awayTeamResult: isHomeTeamGoal
            ? awayTeamResult
            : awayTeamResult + incValue,
    };
};

