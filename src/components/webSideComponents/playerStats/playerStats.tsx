import LoadProvider from "@/components/LoadProvider/LoadProvider";
import { fetchPlayerStats } from "@/services/PlayersFetches/usePlayers";
import { IPlayerDetails } from "@/types/IPlayer";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import PlayerDetailedStats from "./playerDetailedStats/playerDetailedStats";
import PlayerInfo from "./playerInfo/playerInfo";
import RadarChart from "./charts/radarChart";

type playerStatsTypes = {
    teamId: string;
    playerId: string;
};
export default function PlayerStats({ teamId, playerId }: playerStatsTypes) {
    const {
        data: player,
        isLoading,
        error,
    } = useQuery<IPlayerDetails>({
        queryKey: ["Players", playerId],
        queryFn: ({ queryKey }) => {
            const [, playerId] = queryKey;
            return fetchPlayerStats(playerId as string);
        },
    });

    return (
        <LoadProvider isLoading={isLoading} error={error}>
            {player ? (
                <div>
                    <div style={{ display: "flex" }}>
                        <PlayerInfo player={player} />
                        <PlayerDetailedStats player={player} />
                    </div>
                    <div>
                        <RadarChart
                            player={player}
                            position={player.position}
                        />
                    </div>
                </div>
            ) : (
                <h1>Brak danych</h1>
            )}
        </LoadProvider>
    );
}
