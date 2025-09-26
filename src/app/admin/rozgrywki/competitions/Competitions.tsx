"use client";

import LoadProvider from "@/components/LoadProvider/LoadProvider";
import { fetchCompetitions } from "@/services/competitionFetches/useCompetition";
import {
    ICompetitions,
    IMatchCompetition,
    ITournamentCompetition,
} from "@/types/ICompetition";
import { useQuery } from "@tanstack/react-query";
import MatchLabel from "./MatchLabel/matchLabel";
import TournamentLabel from "./TournamentLabel/tournamentLabel";
export default function Competitions() {
    const {
        data: competitions,
        isLoading,
        error,
    } = useQuery<ICompetitions, Error>({
        queryKey: ["competitions"],
        queryFn: fetchCompetitions,
    });
    return (
        <LoadProvider isLoading={isLoading} error={error}>
            <div>
                <h1>Mecze</h1>
                {competitions && competitions.allMatches.length > 0 ? (
                    <MatchLabel matches={competitions.allMatches} />
                ) : (
                    <h4>Brak meczy</h4>
                )}

                <h1>Turnieje</h1>
                {competitions && competitions.allTournaments.length > 0 ? (
                    <TournamentLabel
                        tournaments={competitions.allTournaments}
                    />
                ) : (
                    <h4>Brak Turniejów</h4>
                )}
            </div>
        </LoadProvider>
    );
}
