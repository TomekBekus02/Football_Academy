//import { useMatch } from "@/contexts/matchContext";
import { eventTypeIcon } from "@/components/eventTypeIcons";
import eventLayout from "./eventsHalf.module.css";
import { IMatchEvent } from "@/types/IEvent";
import { Trash } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteEvent } from "@/services/MatchFetches/useMatch";
import { MatchStatus } from "@/types/IMatch";
import { updateScore } from "@/utils/utils";

type EventType = {
    matchId: string;
    homeTeamId: string;
    awayTeamId: string;
    homeTeamScore: number;
    awayTeamScore: number;
    events: IMatchEvent[];
    matchStatus: MatchStatus;
    isAdmin: boolean;
};

const shortName = (name: string | undefined) => {
    if (!name) return "";
    return `${name[0].toUpperCase()}. ${name.substring(name.indexOf(" ") + 1)}`;
};

export const EventsHalf = ({
    matchId,
    homeTeamId,
    homeTeamScore,
    awayTeamId,
    awayTeamScore,
    events,
    matchStatus,
    isAdmin,
}: EventType) => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: deleteEvent,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["match"] });
        },
    });
    if (events.length == 0) return null;
    events.sort((a, b) => {
        if (a.time.base === b.time.base) {
            return (a.time.extra ?? 0) - (b.time.extra ?? 0);
        }
        return a.time.base - b.time.base;
    });

    return events.map((event, index) => {
        return (
            <div key={index}>
                <div
                    className={`${eventLayout.eventBox} ${
                        awayTeamId === event.teamId
                            ? `${eventLayout.awayPlayerBox}`
                            : ""
                    }`}
                >
                    <p>{`${event.time.base}' ${
                        event.time.extra !== 0 ? ` +${event.time.extra}'` : ""
                    }`}</p>
                    <span className={eventLayout.iconBox}>
                        {eventTypeIcon(event.eventType)}
                    </span>
                    <p>{shortName(event.player.name)}</p>
                    {event.eventType === "Goal" && event.assist_player ? (
                        <p>{`(${shortName(event.assist_player?.name)})`}</p>
                    ) : (
                        ""
                    )}
                    {isAdmin && matchStatus !== MatchStatus.FINISHED && (
                        <button
                            className="deleteBtn"
                            onClick={() =>
                                mutation.mutate({
                                    eventId: event._id,
                                    matchId: matchId,
                                    result: updateScore(
                                        event.teamId,
                                        homeTeamId,
                                        homeTeamScore,
                                        awayTeamScore,
                                        event.eventType,
                                        -1
                                    ),
                                })
                            }
                        >
                            <Trash size={20} />
                        </button>
                    )}
                </div>
            </div>
        );
    });
};
