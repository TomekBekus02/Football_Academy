import { useMatch } from "@/contexts/matchContext";
import { YellowCard, RedCard } from "@/components/icons/matchIcons";
import { Volleyball } from "lucide-react";

type EventType = {
    half: number;
};

const eventType = (type: string) => {
    switch (type) {
        case "Goal":
            return <Volleyball />;
        case "YellowCard":
            return <YellowCard />;
        case "RedCard":
            return <RedCard />;
    }
};

const shortName = (name: string) => {
    return `${name[0].toUpperCase()} ${name.substring(name.indexOf(" ") + 1)}`;
};

export const EventsHalf = ({ half }: EventType) => {
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
                <p>{`${event.basicTime}' ${
                    (event.extraTime !== 0 && event.basicTime == 45) ||
                    (event.extraTime !== 0 && event.basicTime == 90)
                        ? ` +${event.extraTime}'`
                        : ""
                }`}</p>
                {eventType(event.eventType)}
                {/* <p>{shortName(event.playerId)}</p> przypał będzie trzeba wydobyć jeszcze player name bo mam tylko id*/}
                <p>Nazwisko I.</p>
                {event.eventType === "Goal" ? <p>{`(Nazwisko I.)`}</p> : ""}
                {/*No tu kurcze tez xd*/}
            </div>
        );
    });
};
