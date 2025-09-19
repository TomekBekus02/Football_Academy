import LoadProvider from "@/components/LoadProvider/LoadProvider";
import { fetchTeamDetails } from "@/services/TeamsFetches/useTeams";
import { ITeam } from "@/types/ITeam";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import TeamDetailsLayout from "./teamDetails.module.css";

interface TeamDetailsProps {
    teamId: string;
}

export default function GetTeamDetails({ teamId }: TeamDetailsProps) {
    const {
        data: teamData,
        isLoading,
        error,
    } = useQuery<ITeam, Error>({
        queryKey: ["teams", teamId],
        queryFn: ({ queryKey }) => {
            const [, teamId] = queryKey;
            return fetchTeamDetails(teamId as string);
        },
    });
    return (
        <LoadProvider error={error} isLoading={isLoading}>
            <div className={TeamDetailsLayout.pageBox}>
                {teamData ? (
                    <div className={TeamDetailsLayout.contentBox}>
                        <Image
                            src={teamData.logo}
                            alt={teamData.name}
                            height={140}
                            width={140}
                            className={TeamDetailsLayout.teamImage}
                        ></Image>
                        <h3>{teamData.name}</h3>
                    </div>
                ) : (
                    <div>
                        <h1>Brak drużyny</h1>
                    </div>
                )}
            </div>
        </LoadProvider>
    );
}
