"use client";

import LoadProvider from "@/components/LoadProvider/LoadProvider";
import { IMatch } from "@/models/match";
import { fetchMatchDetails } from "@/services/MatchFetches/useMatch";
import GetTeamSquad from "./teamSquad/teamSquad";
import { useQuery } from "@tanstack/react-query";
import GetTeamDetails from "./teamDetails/teamDetails";

export default function MatchProgress({
    params,
}: {
    params: { matchId: string };
}) {
    const { matchId } = params;
    const {
        data: matchData,
        isLoading,
        error,
    } = useQuery<IMatch, Error>({
        queryKey: ["match", matchId],
        queryFn: ({ queryKey }) => {
            const [, matchId] = queryKey;
            return fetchMatchDetails(matchId as string);
        },
    });

    return (
        <LoadProvider isLoading={isLoading} error={error}>
            <div>
                {matchData ? (
                    <div>
                        <div>
                            <h1>Miejsce: {matchData.place}</h1>
                            <h1>
                                Data: {matchData.matchDate},{" "}
                                {matchData.matchHour}
                            </h1>
                        </div>
                        <div>
                            <h1>Wynik: {matchData.result}</h1>
                        </div>
                        <div>
                            <h1>Gospodarze</h1>
                            <GetTeamDetails
                                teamId={matchData.homeTeamId.toString()}
                            />
                            <GetTeamSquad
                                teamId={matchData.homeTeamId.toString()}
                            />
                        </div>
                        <div>
                            <h1>Goscie</h1>
                            <GetTeamDetails
                                teamId={matchData.awayTeamId.toString()}
                            />
                            <GetTeamSquad
                                teamId={matchData.awayTeamId.toString()}
                            />
                        </div>
                    </div>
                ) : (
                    <div>
                        <h1>Brak meczu</h1>
                    </div>
                )}
            </div>
        </LoadProvider>
    );
}
