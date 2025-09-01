import LoadProvider from "@/components/LoadProvider/LoadProvider";

import { fetchTeamSquad } from "@/services/PlayersFetches/usePlayers";
import { IPlayer } from "@/types/IPlayer";
import { useQuery } from "@tanstack/react-query";
import TeamSquadLayout from "./teamSquad.module.css";

interface TeamDetailsProps {
    teamId: string;
    isAwayTeam: boolean;
}
export default function getTeamSquad({ teamId, isAwayTeam }: TeamDetailsProps) {
    const {
        data: playersData,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["players", teamId],
        queryFn: ({ queryKey }) => {
            const [, teamId] = queryKey;
            return fetchTeamSquad(teamId);
        },
    });
    return (
        <LoadProvider error={error} isLoading={isLoading}>
            <div>
                {playersData && playersData!.length > 0 ? (
                    playersData.map((player: IPlayer) => (
                        <div>
                            {isAwayTeam ? (
                                <div
                                    className={`${TeamSquadLayout.playerInfo} ${TeamSquadLayout.awayPlayerInfo}`}
                                >
                                    <p>{player.name}</p>
                                    <p className={TeamSquadLayout.playerNumber}>
                                        {player.shirtNumber}
                                    </p>
                                </div>
                            ) : (
                                <div className={TeamSquadLayout.playerInfo}>
                                    <p className={TeamSquadLayout.playerNumber}>
                                        {player.shirtNumber}
                                    </p>
                                    <p>{player.name}</p>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <h1>No players</h1>
                )}
            </div>
        </LoadProvider>
    );
}
