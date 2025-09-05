import LoadProvider from "@/components/LoadProvider/LoadProvider";

import { fetchTeamSquad } from "@/services/PlayersFetches/usePlayers";
import { IPlayer } from "@/types/IPlayer";
import { useQuery } from "@tanstack/react-query";
import TeamSquadLayout from "./teamSquad.module.css";
import { useMatch } from "@/contexts/matchContext";
import DisplayPlayersEvents from "./playersEvents/playersEvents";
import { YellowCard } from "@/components/icons/matchIcons";

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
    const { playersEvents } = useMatch();
    return (
        <LoadProvider error={error} isLoading={isLoading}>
            <div>
                {playersData && playersData!.length > 0 ? (
                    playersData.map((player: IPlayer) => (
                        <div
                            key={player._id}
                            className={TeamSquadLayout.awayTeamBox}
                        >
                            <div
                                className={`${TeamSquadLayout.playerInfo} ${
                                    isAwayTeam
                                        ? TeamSquadLayout.awayPlayerInfo
                                        : TeamSquadLayout.homePlayerInfo
                                }`}
                            >
                                <DisplayPlayersEvents
                                    playerId={player._id}
                                    playersEvents={playersEvents}
                                />
                                <p>{player.name}</p>
                                <p className={TeamSquadLayout.playerNumber}>
                                    {player.shirtNumber}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <h1>No players</h1>
                )}
            </div>
        </LoadProvider>
    );
}
