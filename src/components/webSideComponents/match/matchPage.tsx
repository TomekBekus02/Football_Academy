import LoadProvider from "@/components/LoadProvider/LoadProvider";
import { fetchMatchDetails } from "@/services/MatchFetches/useMatch";
import { IMatchEvent } from "@/types/IEvent";
import { IMatch, MatchStatus } from "@/types/IMatch";
import { mapEventsToIMatchEvent } from "@/utils/utils";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import MatchLayout from "./matchPage.module.css";
import GetTeamDetails from "./teamDetails/teamDetails";
import MatchEvents from "./matchEvents/matchEvents";
import TeamSquad from "./teamSquad/teamSquad";
import MatchStatusInfo from "./matchStatusInfo/matchStatusInfo";
import PenaltiesPanel from "./penaltiesPanel/penaltiesPanel";

interface matchPageProps {
    matchId: string;
    isAdmin: boolean;
}

export default function MatchPage({ matchId, isAdmin }: matchPageProps) {
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
                                    <MatchStatusInfo matchData={matchData} />
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
                            {isAdmin &&
                                matchData.isOverTime &&
                                matchData.matchStatus ===
                                    MatchStatus.IN_PROGRESS &&
                                matchData.homeTeamScore ===
                                    matchData.awayTeamScore && (
                                    <PenaltiesPanel
                                        handlePenaltiesScore={
                                            handlePenaltiesScore
                                        }
                                        matchPenalties={matchPenalties}
                                    />
                                )}
                            <div className={MatchLayout.EventsBox}>
                                <div className={`${MatchLayout.teamSquadBox}`}>
                                    <TeamSquad
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
                                    isAdmin={isAdmin}
                                />
                                <div
                                    className={`${MatchLayout.teamSquadBox} ${MatchLayout.awayteamSquadBox}`}
                                >
                                    <TeamSquad
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
