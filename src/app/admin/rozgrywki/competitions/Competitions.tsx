"use client";

import { Hammer, Trash } from "lucide-react";
import LoadProvider from "@/components/LoadProvider/LoadProvider";
import { fetchCompetitions } from "@/services/competitionFetches/useCompetition";
import { IMatchCompetition } from "@/types/ICompetition";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { WinIcon, LoseIcon, DrawIcon } from "@/components/icons/matchIcons";
import { resultIcon } from "@/components/eventTypeIcons";
import MatchLabel from "./MatchLabel/matchLabel";
import TournamentLabel from "./TournamentLabel/tournamentLabel";

interface CompetitionParams {
    isOnGoing: boolean;
}

export default function Competitions({ isOnGoing }: CompetitionParams) {
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

    return (
        <LoadProvider isLoading={isLoading} error={error}>
            <div>
                {competitions && competitions.length > 0 ? (
                    competitions.map((comp: IMatchCompetition) => (
                        <div key={comp._id}>
                            {comp.label === "Match" ? (
                                <MatchLabel comp={comp} />
                            ) : (
                                <TournamentLabel />
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
