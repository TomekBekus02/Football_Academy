import LoadProvider from "@/components/LoadProvider/LoadProvider";

import { fetchTeamSquad } from "@/services/PlayersFetches/usePlayers";
import { IPlayer } from "@/types/IPlayer";
import { useQuery } from "@tanstack/react-query";

interface TeamDetailsProps {
    teamId: string;
}
export default function getTeamSquad({ teamId }: TeamDetailsProps) {
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
                            <p>
                                {player.shirtNumber}. {player.name}
                            </p>
                        </div>
                    ))
                ) : (
                    <h1>No players</h1>
                )}
            </div>
        </LoadProvider>
    );
}
