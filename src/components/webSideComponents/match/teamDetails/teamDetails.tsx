import LoadProvider from "@/components/LoadProvider/LoadProvider";
import { fetchTeamDetails } from "@/services/TeamsFetches/useTeams";
import { ITeam } from "@/types/ITeam";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import TeamDetailsLayout from "./teamDetails.module.css";
import { MatchStatus } from "@/types/IMatch";

interface TeamDetailsProps {
    teamId: string;
    matchStatus: MatchStatus;
    isHomeTeam: boolean;
    homeTeamScore: number;
    homeTeamPenScore: number;
    awayTeamScore: number;
    awayTeamPenScore: number;
}

export default function GetTeamDetails({
    teamId,
    matchStatus,
    isHomeTeam,
    homeTeamScore,
    homeTeamPenScore,
    awayTeamScore,
    awayTeamPenScore,
}: TeamDetailsProps) {
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
    let isWinner = false;
    if (matchStatus === MatchStatus.FINISHED) {
        if (isHomeTeam) {
            isWinner =
                homeTeamScore > awayTeamScore ||
                homeTeamPenScore > awayTeamPenScore;
        } else {
            isWinner =
                homeTeamScore < awayTeamScore ||
                homeTeamPenScore < awayTeamPenScore;
        }
    }
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
                        />
                        {isWinner ? (
                            <h2 style={{ fontWeight: "900" }}>
                                {teamData.name}*
                            </h2>
                        ) : (
                            <h2>{teamData.name}</h2>
                        )}
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
