"use client";

import LoadProvider from "@/components/LoadProvider/LoadProvider";
import { fetchCompetitions } from "@/services/competitionFetches/useCompetition";
import { ICompetitions } from "@/types/ICompetition";
import { useQuery } from "@tanstack/react-query";
import MatchLabel from "./MatchLabel/matchLabel";
import TournamentLabel from "./TournamentLabel/tournamentLabel";
import CompetitionLayout from "./competitions.module.css";

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
            <div className={CompetitionLayout.competitionsBox}>
                <div className={CompetitionLayout.competitionContent}>
                    <h1 className={CompetitionLayout.competitionTitle}>
                        Mecze
                    </h1>
                    <div className={CompetitionLayout.accordionsBox}>
                        {competitions && competitions.allMatches?.length > 0 ? (
                            <MatchLabel matches={competitions.allMatches} />
                        ) : (
                            <h4>Brak meczy</h4>
                        )}
                    </div>
                </div>

                <div className={CompetitionLayout.competitionContent}>
                    <h1 className={CompetitionLayout.competitionTitle}>
                        Turnieje
                    </h1>
                    <div className={CompetitionLayout.accordionsBox}>
                        {competitions &&
                        competitions.allTournaments?.length > 0 ? (
                            <TournamentLabel
                                tournaments={competitions.allTournaments}
                            />
                        ) : (
                            <h4>Brak Turniejów</h4>
                        )}
                    </div>
                </div>
            </div>
        </LoadProvider>
    );
}
