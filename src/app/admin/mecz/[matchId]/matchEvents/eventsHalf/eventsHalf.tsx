import { useMatch } from "@/contexts/matchContext";
import { YellowCard, RedCard } from "@/components/icons/matchIcons";
import { Volleyball } from "lucide-react";
import eventLayout from "./eventsHalf.module.css";

type EventType = {
    half: number;
    awayTeamId: string;
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
    if (!name) return "";
    return `${name[0].toUpperCase()}. ${name.substring(name.indexOf(" ") + 1)}`;
};

export const EventsHalf = ({ half, awayTeamId }: EventType) => {
    const { events } = useMatch();
    console.log("events: ", events);
    if (events.length == 0) return null;
    let filterEvents = [];
    if (half === 1) {
        filterEvents = events.filter((event) => event.basicTime <= 45);
    } else {
        filterEvents = events.filter((event) => event.basicTime > 45);
    }
    filterEvents.sort((a, b) => {
        if (a.basicTime === b.basicTime) {
            return a.extraTime - b.extraTime;
        }
        return a.basicTime - b.basicTime;
    });

    return filterEvents.map((event) => {
        return (
            <div>
                <div
                    className={`${eventLayout.eventBox} ${
                        awayTeamId === event.playerTeamId
                            ? `${eventLayout.awayPlayerBox}`
                            : ""
                    }`}
                >
                    <p>{`${event.basicTime}' ${
                        (event.extraTime !== 0 && event.basicTime == 45) ||
                        (event.extraTime !== 0 && event.basicTime == 90)
                            ? ` +${event.extraTime}'`
                            : ""
                    }`}</p>
                    <span className={eventLayout.iconBox}>
                        {eventType(event.eventType)}
                    </span>
                    <p>{shortName(event.player.name)}</p>
                    {event.eventType === "Goal" &&
                    event.assist_player?.name !== "" ? (
                        <p>{`(${shortName(event.assist_player?.name)})`}</p>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        );
    });
};
