import LoadProvider from "@/components/LoadProvider/LoadProvider";
import { fetchPlayerStats } from "@/services/PlayersFetches/usePlayers";
import { IPlayerDetails, IPlayerStats } from "@/types/IPlayer";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import PlayerDetailedStats from "./playerDetailedStats/playerDetailedStats";
import PlayerInfo from "./playerInfo/playerInfo";
import RadarChart from "./charts/radarChart/radarChart";
import ColumnChart from "./charts/columnChart/columnChart";

type playerStatsTypes = {
    teamId: string;
    playerId: string;
};
export default function PlayerStats({ teamId, playerId }: playerStatsTypes) {
    const {
        data: player,
        isLoading,
        error,
    } = useQuery<IPlayerStats>({
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
                        <PlayerInfo player={player.playerDetails} />
                        <PlayerDetailedStats player={player.playerDetails} />
                    </div>
                    <div style={{ display: "flex" }}>
                        <RadarChart
                            player={player.playerDetails}
                            position={player.playerDetails.position}
                        />
                        <ColumnChart
                            player={player.statsHistory}
                            position={player.playerDetails.position}
                        />
                    </div>
                </div>
            ) : (
                <h1>Brak danych</h1>
            )}
        </LoadProvider>
    );
}
