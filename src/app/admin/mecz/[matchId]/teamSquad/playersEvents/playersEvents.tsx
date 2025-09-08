//import { useMatch } from "@/contexts/matchContext";
import {
    YellowCard,
    RedCard,
    RedYellowCard,
} from "@/components/icons/matchIcons";
import { Volleyball } from "lucide-react";
import { IMatchEvent } from "@/types/IEvent";
//import { IPlayersEvent } from "@/types/IEvent";

export default function displayPlayersEvents({
    playerId,
    playersEvents,
}: {
    playerId: string | undefined;
    playersEvents: Array<IMatchEvent>;
}) {
    const player = playersEvents.filter((e) => e.player.id === playerId);
    if (player.length === 0) {
        return null;
    }
    const playersEvent = player.reduce<Record<string, number>>((acc, event) => {
        acc[event.eventType] = (acc[event.eventType] || 0) + 1;
        return acc;
    }, {});

    return Object.keys(playersEvent).map((type) => {
        if (type == "YellowCard") {
            return (
                <div>
                    <YellowCard />
                </div>
            );
        } else if (type == "RedCard") {
            return (
                <div>
                    <RedCard />
                </div>
            );
        } else if (type == "RedYellowCard") {
            <div>
                <RedYellowCard />
            </div>;
        }
        if (type == "Goal") {
            return (
                <div style={{ display: "flex" }}>
                    <Volleyball />{" "}
                    {playersEvent.Goal !== 1 ? (
                        <p>{playersEvent.Goal}</p>
                    ) : null}
                </div>
            );
        }
    });
}
