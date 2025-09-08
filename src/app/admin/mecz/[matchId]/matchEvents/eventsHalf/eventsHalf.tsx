//import { useMatch } from "@/contexts/matchContext";
import { YellowCard, RedCard } from "@/components/icons/matchIcons";
import { Volleyball } from "lucide-react";
import eventLayout from "./eventsHalf.module.css";
import { IMatchEvent } from "@/types/IEvent";

type EventType = {
    awayTeamId: string;
    events: IMatchEvent[];
};

const eventType = (type: string) => {
    switch (type) {
        case "Goal":
            return <Volleyball width={20} />;
        case "YellowCard":
            return <YellowCard width={25} />;
        case "RedCard":
            return <RedCard width={25} />;
    }
};

const shortName = (name: string | undefined) => {
    console.log("Imie gracza: ", name);
    if (!name) return "";
    return `${name[0].toUpperCase()}. ${name.substring(name.indexOf(" ") + 1)}`;
};

export const EventsHalf = ({ awayTeamId, events }: EventType) => {
    if (events.length == 0) return null;
    events.sort((a, b) => {
        if (a.time.base === b.time.base) {
            return a.time.base - b.time.base;
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
                        {eventType(event.eventType)}
                    </span>
                    <p>{shortName(event.player.name)}</p>
                    {event.eventType === "Goal" && event.assist_player ? (
                        <p>{`(${shortName(event.assist_player?.name)})`}</p>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        );
    });
};
