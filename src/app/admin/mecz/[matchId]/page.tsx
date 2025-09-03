"use client";

import LoadProvider from "@/components/LoadProvider/LoadProvider";
import { IMatch } from "@/models/match";
import { fetchMatchDetails } from "@/services/MatchFetches/useMatch";
import GetTeamSquad from "./teamSquad/teamSquad";
import { useQuery } from "@tanstack/react-query";
import GetTeamDetails from "./teamDetails/teamDetails";
import MatchLayout from "./matchProgress.module.css";
import MatchEvents from "./matchEvents/matchEvents";

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
                    <div className={MatchLayout.pageBox}>
                        <div className={MatchLayout.contentBox}>
                            <div className={MatchLayout.content}>
                                <div
                                    className={`${MatchLayout.teamBox} ${MatchLayout.homeTeamBox}`}
                                >
                                    <GetTeamDetails
                                        teamId={matchData.homeTeamId.toString()}
                                    />
                                </div>
                                <div className={MatchLayout.gameInfo}>
                                    <h3>
                                        {matchData.matchDate}{" "}
                                        {matchData.matchHour}
                                    </h3>
                                    <h1>{matchData.result}</h1>
                                    <h2>
                                        {matchData.result.trim() == "-"
                                            ? "TRWA"
                                            : "KONIEC"}
                                    </h2>
                                </div>
                                <div className={`${MatchLayout.teamBox} `}>
                                    <GetTeamDetails
                                        teamId={matchData.awayTeamId.toString()}
                                    />
                                </div>
                            </div>
                            <div className={MatchLayout.content}>
                                <div className={`${MatchLayout.teamSquadBox}`}>
                                    <GetTeamSquad
                                        teamId={matchData.homeTeamId.toString()}
                                        isAwayTeam={false}
                                    />
                                </div>
                                <MatchEvents
                                    matchId={matchId}
                                    awayTeamId={matchData.awayTeamId.toString()}
                                    homeTeamId={matchData.homeTeamId.toString()}
                                />
                                <div
                                    className={`${MatchLayout.teamSquadBox} ${MatchLayout.awayteamSquadBox}`}
                                >
                                    <GetTeamSquad
                                        teamId={matchData.awayTeamId.toString()}
                                        isAwayTeam={true}
                                    />
                                </div>
                            </div>
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
