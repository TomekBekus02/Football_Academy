"use client";

import LoadProvider from "@/components/LoadProvider/LoadProvider";
import { fetchCompetitions } from "@/services/competitionFetches/useCompetition";
import {
    IMatchCompetition,
    ITournamentCompetition,
} from "@/types/ICompetition";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import MatchLabel from "./MatchLabel/matchLabel";
import TournamentLabel from "./TournamentLabel/tournamentLabel";

interface CompetitionParams {
    isOnGoing: boolean;
}

export default function Competitions({ isOnGoing }: CompetitionParams) {
    type Competition = IMatchCompetition | ITournamentCompetition;
    const {
        data: competitions,
        isLoading,
        error,
    } = useQuery<Competition[], Error>({
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
                    competitions.map((comp) => (
                        <div key={comp._id}>
                            {comp.label === "Match" ? (
                                <MatchLabel comp={comp as IMatchCompetition} />
                            ) : (
                                <TournamentLabel
                                    comp={comp as ITournamentCompetition}
                                />
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
