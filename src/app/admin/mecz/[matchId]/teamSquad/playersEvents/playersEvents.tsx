import { useMatch } from "@/contexts/matchContext";
import { YellowCard, RedCard } from "@/components/icons/matchIcons";
import { Volleyball } from "lucide-react";
import { IPlayersEvent } from "@/types/IEvent";

export default function displayPlayersEvents({
    playerId,
    playersEvents,
}: {
    playerId: string | undefined;
    playersEvents: Array<IPlayersEvent>;
}) {
    const player = playersEvents.find((e) => e.id === playerId);
    if (!player) {
        return null;
    }
    return (
        <>
            {player.events.map((e, index) => {
                if (e.eventType == "YellowCard") {
                    return (
                        <div key={index} style={{ display: "flex" }}>
                            <YellowCard />{" "}
                            {e.quantity !== 1 ? <p>{e.quantity}</p> : null}
                        </div>
                    );
                } else if (e.eventType == "RedCard") {
                    return (
                        <div key={index} style={{ display: "flex" }}>
                            <RedCard />{" "}
                            {e.quantity !== 1 ? <p>{e.quantity}</p> : null}
                        </div>
                    );
                } else {
                    return (
                        <div key={index} style={{ display: "flex" }}>
                            <Volleyball />{" "}
                            {e.quantity !== 1 ? <p>{e.quantity}</p> : null}
                        </div>
                    );
                }
            })}
        </>
    );
}
