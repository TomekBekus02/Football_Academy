"use client";

import LoadProvider from "@/components/LoadProvider/LoadProvider";
import { fetchTeamStats } from "@/services/TeamsFetches/useTeams";
import { ITeamStats } from "@/types/ITeam";
import { useQuery } from "@tanstack/react-query";
import TeamDetailsStats from "./teamDetailsStats/teamDetailsStats";

type TeamStats = {
    teamId: string;
};

export default function TeamStats({ teamId }: TeamStats) {
    const {
        data: teamStats,
        isLoading,
        error,
    } = useQuery<ITeamStats>({
        queryKey: ["teamsStats", teamId],
        queryFn: ({ queryKey }) => {
            const [, teamId] = queryKey;
            return fetchTeamStats(teamId as string);
        },
    });

    return (
        <LoadProvider isLoading={isLoading} error={error}>
            {teamStats && (
                <div>
                    <TeamDetailsStats team={teamStats.avgTeamStats} />
                </div>
            )}
        </LoadProvider>
    );
}
