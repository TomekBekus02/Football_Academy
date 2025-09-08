"use client";

import { Hammer, Trash } from "lucide-react";
import LoadProvider from "@/components/LoadProvider/LoadProvider";
import { fetchCompetitions } from "@/services/competitionFetches/useCompetition";
import { IMatchCompetition } from "@/types/ICompetition";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

interface CompetitionParams {
    isOnGoing: boolean;
}

export default function Competitions({ isOnGoing }: CompetitionParams) {
    //const queryClient = useQueryClient();
    const {
        data: competitions,
        isLoading,
        error,
    } = useQuery<IMatchCompetition[], Error>({
        queryKey: ["competitions", isOnGoing],
        queryFn: ({ queryKey }) => {
            const [, isOnGoing] = queryKey;
            return fetchCompetitions(isOnGoing as boolean);
        },
    });
    console.log("competitions: ", competitions);
    return (
        <LoadProvider isLoading={isLoading} error={error}>
            <div>
                {competitions && competitions.length > 0 ? (
                    competitions.map((comp) => (
                        <div key={comp._id}>
                            {comp.label === "Match" ? (
                                <div style={{ display: "flex" }}>
                                    <div>
                                        <Image
                                            src={
                                                comp.TeamDetails.homeTeamId.logo
                                            }
                                            alt={
                                                comp.TeamDetails.homeTeamId.name
                                            }
                                            width={150}
                                            height={120}
                                        ></Image>
                                        <p>
                                            {comp.TeamDetails.homeTeamId.name}
                                        </p>
                                    </div>
                                    <h1>{comp.TeamDetails.result}</h1>
                                    <div>
                                        <Image
                                            src={
                                                comp.TeamDetails.awayTeamId.logo
                                            }
                                            alt={
                                                comp.TeamDetails.awayTeamId.name
                                            }
                                            width={150}
                                            height={120}
                                        ></Image>
                                        <p>
                                            {comp.TeamDetails.awayTeamId.name}
                                        </p>
                                    </div>
                                    <div>
                                        <button>
                                            <Link
                                                href={`/admin/mecz/${comp.competitionId}`}
                                            >
                                                <Hammer /> Zarządzaj
                                            </Link>
                                        </button>
                                        <button>
                                            <Trash /> Usuń
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div></div>
                            )}
                        </div>
                    ))
                ) : (
                    <div>Brak Wydarzeń</div>
                )}
            </div>
        </LoadProvider>
    );
}
