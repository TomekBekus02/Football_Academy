"use client";

import { Volleyball, Trophy } from "lucide-react";
import LoadProvider from "@/components/LoadProvider/LoadProvider";
import { fetchCompetitions } from "@/services/competitionFetches/useCompetition";
import { IMatchCompetition } from "@/types/ICompetition";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";

interface CompetitionParams {
    isOnGoing: boolean;
}

export default function Competitions({ isOnGoing }: CompetitionParams) {
    //const queryClient = useQueryClient();
    const {
        data: activeCompetitions,
        isLoading,
        error,
    } = useQuery<IMatchCompetition[], Error>({
        queryKey: ["competitions", isOnGoing],
        queryFn: ({ queryKey }) => {
            const [, isOnGoing] = queryKey;
            return fetchCompetitions(isOnGoing as boolean);
        },
    });
    return (
        <LoadProvider isLoading={isLoading} error={error}>
            <div>
                {activeCompetitions?.map((comp) => (
                    <div key={comp._id} style={{ display: "flex" }}>
                        {comp.label === "Match" ? <Volleyball /> : <Trophy />}
                        <div>
                            <Image
                                src={comp.TeamDetails.homeTeamId.logo}
                                alt={comp.TeamDetails.homeTeamId.name}
                                width={150}
                                height={120}
                            ></Image>
                            <p>{comp.TeamDetails.homeTeamId.name}</p>
                        </div>
                        <h1>{comp.TeamDetails.result}</h1>
                        <div>
                            <Image
                                src={comp.TeamDetails.awayTeamId.logo}
                                alt={comp.TeamDetails.awayTeamId.name}
                                width={150}
                                height={120}
                            ></Image>
                            <p>{comp.TeamDetails.awayTeamId.name}</p>
                        </div>
                    </div>
                ))}
            </div>
        </LoadProvider>
    );
}
