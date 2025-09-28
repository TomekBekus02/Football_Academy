"use client";

import LoadProvider from "@/components/LoadProvider/LoadProvider";

import { fetchMatchDetails } from "@/services/MatchFetches/useMatch";
import GetTeamSquad from "./teamSquad/teamSquad";
import { useQuery } from "@tanstack/react-query";
import GetTeamDetails from "./teamDetails/teamDetails";
import MatchLayout from "./matchProgress.module.css";
import MatchEvents from "./matchEvents/matchEvents";
import { IMatchEvent } from "@/types/IEvent";
import { mapEventsToIMatchEvent } from "@/utils/utils";
import React, { useState } from "react";
import { IMatch, MatchStatus } from "@/types/IMatch";

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

    const handlePenaltiesScore = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setMatchPenalties((prev) => ({
            ...prev,
            [e.target.name]: Number(e.target.value),
        }));
    };
    const [matchPenalties, setMatchPenalties] = useState({
        homeTeam: 0,
        awayTeam: 0,
    });
    return (
        <LoadProvider isLoading={isLoading} error={error}>
            <div>
                {matchData ? (
                    <div className={MatchLayout.pageBox}>
                        <div className={MatchLayout.contentBox}>
                            <div className={MatchLayout.matchHeader}>
                                <div
                                    className={`${MatchLayout.teamBox} ${MatchLayout.homeTeamBox}`}
                                >
                                    <GetTeamDetails
                                        teamId={matchData.homeTeamId.toString()}
                                        matchStatus={matchData.matchStatus}
                                        isHomeTeam={true}
                                        homeTeamScore={matchData.homeTeamScore}
                                        homeTeamPenScore={
                                            matchData.homeTeamPenaltiesScore
                                        }
                                        awayTeamScore={matchData.awayTeamScore}
                                        awayTeamPenScore={
                                            matchData.awayTeamPenaltiesScore
                                        }
                                    />
                                </div>
                                <div className={MatchLayout.gameInfo}>
                                    <h3>
                                        {matchData.matchDate}{" "}
                                        {matchData.matchHour}
                                    </h3>
                                    {matchData.matchStatus !==
                                    MatchStatus.CREATED ? (
                                        <h1>{`${matchData.homeTeamScore}:${matchData.awayTeamScore}`}</h1>
                                    ) : (
                                        <h1>-</h1>
                                    )}
                                    {matchData.matchStatus ===
                                        MatchStatus.IN_PROGRESS && (
                                        <h2>TRWA</h2>
                                    )}

                                    {matchData.matchStatus ===
                                        MatchStatus.FINISHED && (
                                        <>
                                            {matchData.isOverTime ? (
                                                matchData.homeTeamPenaltiesScore !==
                                                    0 &&
                                                matchData.awayTeamPenaltiesScore !==
                                                    0 ? (
                                                    <>
                                                        <h2>{`(${matchData.homeTeamPenaltiesScore} : ${matchData.awayTeamPenaltiesScore})`}</h2>
                                                        <h2>Po karnych</h2>
                                                    </>
                                                ) : (
                                                    <h2>Po Dogrywce</h2>
                                                )
                                            ) : (
                                                <h2>Koniec</h2>
                                            )}
                                        </>
                                    )}
                                </div>
                                <div className={`${MatchLayout.teamBox} `}>
                                    <GetTeamDetails
                                        teamId={matchData.awayTeamId.toString()}
                                        matchStatus={matchData.matchStatus}
                                        isHomeTeam={false}
                                        homeTeamScore={matchData.homeTeamScore}
                                        homeTeamPenScore={
                                            matchData.homeTeamPenaltiesScore
                                        }
                                        awayTeamScore={matchData.awayTeamScore}
                                        awayTeamPenScore={
                                            matchData.awayTeamPenaltiesScore
                                        }
                                    />
                                </div>
                            </div>
                            {matchData.isOverTime &&
                            matchData.matchStatus === MatchStatus.IN_PROGRESS &&
                            matchData.homeTeamScore ===
                                matchData.awayTeamScore ? (
                                <div className={MatchLayout.penBox}>
                                    <h1>Karne</h1>
                                    <form>
                                        <div className={MatchLayout.inputGroup}>
                                            <input
                                                type="number"
                                                name="homeTeam"
                                                defaultValue={
                                                    matchPenalties.homeTeam
                                                }
                                                onChange={handlePenaltiesScore}
                                            />
                                            <label>Gosp.</label>
                                        </div>
                                        <h1>:</h1>
                                        <div className={MatchLayout.inputGroup}>
                                            <input
                                                type="number"
                                                name="awayTeam"
                                                defaultValue={
                                                    matchPenalties.awayTeam
                                                }
                                                onChange={handlePenaltiesScore}
                                            />
                                            <label>Goście</label>
                                        </div>
                                    </form>
                                </div>
                            ) : null}
                            <div className={MatchLayout.EventsBox}>
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
                                    matchStatus={matchData.matchStatus}
                                    events={mappedEvents}
                                    tournamentId={matchData.tournamentId.toString()}
                                    isOverTime={matchData.isOverTime}
                                    matchPenalties={matchPenalties}
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
