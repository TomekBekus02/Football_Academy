"use client";

import LoadProvider from "@/components/LoadProvider/LoadProvider";
import { fetchTeamStats } from "@/services/TeamsFetches/useTeams";
import { ITeamDetails, ITeamStats } from "@/types/ITeam";
import { useQuery } from "@tanstack/react-query";
import TeamDetailsStats from "./teamDetailsStats/teamDetailsStats";
import AllTimeTable from "./allTimeTable/allTimeTable";

type TeamStats = {
    teamId: string;
};

export default function TeamStats({ teamId }: TeamStats) {
    const {
        data: teamStats,
        isLoading,
        error,
    } = useQuery<ITeamDetails>({
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
                    <div>
                        <TeamDetailsStats
                            team={teamStats.detailsStats.avgTeamStats}
                        />
                    </div>
                    <div>
                        <AllTimeTable
                            teams={teamStats.allTimeTable}
                            teamId={teamId}
                        />
                    </div>
                </div>
            )}
        </LoadProvider>
    );
}
