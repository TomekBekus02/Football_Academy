"use client";

import LoadProvider from "@/components/LoadProvider/LoadProvider";
import { fetchTeamDetails } from "@/services/TeamsFetches/useTeams";
import { ITeam } from "@/types/ITeam";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import teamInfoLayout from "./sideTeamInfo.module.css";
import TeamForm from "@/components/teamForm/teamForm";

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
                            width={300}
                            height={300}
                        ></Image>
                        <h1>{teamData.name}</h1>

                        <h2>Forma</h2>
                        <TeamForm
                            form={teamData.form}
                            teamId={teamId}
                            IconWidth={45}
                        />
                        <h2>Bilans</h2>
                    </div>
                ) : (
                    <h1>Brak drużyny</h1>
                )}
            </div>
        </LoadProvider>
    );
}
