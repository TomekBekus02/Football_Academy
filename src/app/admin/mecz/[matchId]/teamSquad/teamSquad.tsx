import { fetchTeamSquad } from "@/services/PlayersFetches/usePlayers";
import { useQuery } from "@tanstack/react-query";

interface TeamDetailsProps {
    teamId: string;
}
export default function getTeamSquad({ teamId }: TeamDetailsProps) {
    const {} = useQuery({
        queryKey: ["players", teamId],
        queryFn: ({ queryKey }) => {
            const [, teamId] = queryKey;
            return fetchTeamSquad(teamId);
        },
    });
    return <div>{teamId}</div>;
}
