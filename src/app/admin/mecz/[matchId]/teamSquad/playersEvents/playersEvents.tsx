import { IMatchEvent } from "@/types/IEvent";
import { eventTypeIcon } from "@/components/eventTypeIcons";

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

    return Object.keys(playersEvent).map((type, index) => {
        return (
            <div style={{ display: "flex" }} key={index}>
                {eventTypeIcon(type)}
                {type == "Goal" && playersEvent.Goal !== 1 ? (
                    <p>{playersEvent.Goal}</p>
                ) : null}
            </div>
        );
    });
}
