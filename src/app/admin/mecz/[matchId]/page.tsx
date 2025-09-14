"use client";

import LoadProvider from "@/components/LoadProvider/LoadProvider";
import { IMatch } from "@/models/match";
import { fetchMatchDetails } from "@/services/MatchFetches/useMatch";
import GetTeamSquad from "./teamSquad/teamSquad";
import { useQuery } from "@tanstack/react-query";
import GetTeamDetails from "./teamDetails/teamDetails";
import MatchLayout from "./matchProgress.module.css";
import MatchEvents from "./matchEvents/matchEvents";
import { IMatchEvent } from "@/types/IEvent";
import { mapEventsToIMatchEvent } from "@/utils/utils";
import React from "react";

export default function MatchProgress({
    params,
}: {
    params: Promise<{ matchId: string }>;
}) {
    const { matchId } = React.use(params);
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
    const mappedEvents: IMatchEvent[] = matchData
        ? mapEventsToIMatchEvent(matchData.events)
        : [];

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
                                    <h1>{`${matchData.homeTeamScore}:${matchData.awayTeamScore}`}</h1>
                                    <h2>
                                        {matchData.isOnGoing
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
                                        events={mappedEvents}
                                    />
                                </div>
                                <MatchEvents
                                    matchId={matchId}
                                    awayTeamId={matchData.awayTeamId.toString()}
                                    homeTeamId={matchData.homeTeamId.toString()}
                                    homeTeamScore={matchData.homeTeamScore}
                                    awayTeamScore={matchData.awayTeamScore}
                                    isOnGoing={matchData.isOnGoing}
                                    events={mappedEvents}
                                    tournamentId={matchData.tournamentId.toString()}
                                />
                                <div
                                    className={`${MatchLayout.teamSquadBox} ${MatchLayout.awayteamSquadBox}`}
                                >
                                    <GetTeamSquad
                                        teamId={matchData.awayTeamId.toString()}
                                        isAwayTeam={true}
                                        events={mappedEvents}
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
