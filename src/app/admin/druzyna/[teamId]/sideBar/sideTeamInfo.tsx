"use client";

import LoadProvider from "@/components/LoadProvider/LoadProvider";
import { fetchTeamDetails } from "@/services/TeamsFetches/useTeams";
import { ITeam } from "@/types/ITeam";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import teamInfoLayout from "./sideTeamInfo.module.css";
import TeamForm from "@/components/teamForm/teamForm";
import "@/styles/toolTip.css";
import PlayersCarousel from "./playersCarousel/playersCarousel";

export default function sideTeamInfo({ teamId }: { teamId: string }) {
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
        <LoadProvider isLoading={isLoading} error={error}>
            <div>
                {teamData ? (
                    <div className={teamInfoLayout.contentBox}>
                        <Image
                            src={teamData.logo}
                            alt={teamData.name}
                            width={250}
                            height={250}
                            className="imageStyle"
                        ></Image>
                        <h1>{teamData.name}</h1>
                        <div className={teamInfoLayout.teamStats}>
                            <h2 className="toolTip">
                                Bilans{" "}
                                <span className="toolTipText">(Z-R-P)</span>
                            </h2>
                            <h2>{`${teamData.wins}-${teamData.draws}-${teamData.loses}`}</h2>
                            <h2 className="toolTip">
                                Forma{" "}
                                <span className="toolTipText">
                                    ostatnie 5 meczy
                                </span>
                            </h2>
                            <TeamForm
                                form={teamData.form}
                                teamId={teamId}
                                IconWidth={45}
                            />
                        </div>

                        <PlayersCarousel teamId={teamId} />
                    </div>
                ) : (
                    <h1>Brak drużyny</h1>
                )}
            </div>
        </LoadProvider>
    );
}
