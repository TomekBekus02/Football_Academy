import LoadProvider from "@/components/LoadProvider/LoadProvider";
import { fetchPlayerStats } from "@/services/PlayersFetches/usePlayers";
import { IPlayerDetails, IPlayerStats } from "@/types/IPlayer";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import PlayerDetailedStats from "./playerDetailedStats/playerDetailedStats";
import PlayerInfo from "./playerInfo/playerInfo";
import RadarChart from "./charts/radarChart/radarChart";
import ColumnChart from "./charts/columnChart/columnChart";
import styles from "./playerStats.module.css";
import PieChart from "./charts/pieChart/pieChart";
import { ITeamStats } from "@/types/ITeam";
import { fetchTeamStats } from "@/services/TeamsFetches/useTeams";
import RadarChartCompare from "./charts/radarChartCompare/RadarChartCompare";

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
        queryKey: ["players", playerId],
        queryFn: ({ queryKey }) => {
            const [, playerId] = queryKey;
            return fetchPlayerStats(playerId as string);
        },
    });
    // const {
    //     data: team,
    //     isLoading: teamLoading,
    //     error: teamError,
    // } = useQuery<ITeamStats>({
    //     queryKey: ["teams", teamId],
    //     queryFn: ({ queryKey }) => {
    //         const [, teamId] = queryKey;
    //         return fetchTeamStats(teamId as string);
    //     },
    // });

    return (
        <LoadProvider isLoading={isLoading} error={error}>
            <div>
                <div className={styles.playerInfoWrapper}>
                    <div></div>
                    {player ? (
                        <div className={styles.playerInfoBox}>
                            <div style={{ display: "flex" }}>
                                <PlayerInfo player={player.playerDetails} />
                                <PlayerDetailedStats
                                    player={player.playerDetails}
                                />
                            </div>
                            <div>
                                <div className={styles.chartsBox}>
                                    <RadarChart
                                        player={player.playerDetails}
                                        position={player.playerDetails.position}
                                    />
                                    <PieChart
                                        player={player.playerDetails}
                                        team={player.playerDetails.teamStats}
                                    />
                                    <RadarChartCompare
                                        player={player.playerDetails}
                                        position={player.playerDetails.position}
                                    />
                                </div>
                                <ColumnChart
                                    player={player.statsHistory}
                                    position={player.playerDetails.position}
                                />
                            </div>
                        </div>
                    ) : (
                        <h1>Brak danych</h1>
                    )}
                </div>
            </div>
        </LoadProvider>
    );
}
