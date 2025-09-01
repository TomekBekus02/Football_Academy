"use client";

import LoadProvider from "@/components/LoadProvider/LoadProvider";
import { IMatch } from "@/models/match";
import { fetchMatchDetails } from "@/services/MatchFetches/useMatch";
import GetTeamSquad from "./teamSquad/teamSquad";
import { useQuery } from "@tanstack/react-query";
import GetTeamDetails from "./teamDetails/teamDetails";
import MatchLayout from "./matchProgress.module.css";

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
                                <div className={MatchLayout.matchEventsBox}>
                                    <div className={MatchLayout.matchHalfBox}>
                                        <div className={MatchLayout.halfHeader}>
                                            <h3>1. POŁOWA</h3>
                                            <p>0-0</p>
                                        </div>
                                    </div>
                                    <div className={MatchLayout.matchHalfBox}>
                                        <div className={MatchLayout.halfHeader}>
                                            <h3>2. POŁOWA</h3>
                                            <p>0-0</p>
                                        </div>
                                    </div>
                                </div>
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
                    // <div>
                    //     <div>
                    //         <h1>Miejsce: {matchData.place}</h1>
                    //         <h1>
                    //             Data: {matchData.matchDate},{" "}
                    //             {matchData.matchHour}
                    //         </h1>
                    //     </div>
                    //     <div>
                    //         <h1>Wynik: {matchData.result}</h1>
                    //     </div>
                    //     <div>
                    //         <h1>Gospodarze</h1>
                    //         <GetTeamDetails
                    //             teamId={matchData.homeTeamId.toString()}
                    //         />

                    //     </div>
                    //     <div>
                    //         <h1>Goscie</h1>
                    //         <GetTeamDetails
                    //             teamId={matchData.awayTeamId.toString()}
                    //         />
                    //         <GetTeamSquad
                    //             teamId={matchData.awayTeamId.toString()}
                    //         />
                    //     </div>
                    // </div>
                    <div>
                        <h1>Brak meczu</h1>
                    </div>
                )}
            </div>
        </LoadProvider>
    );
}
