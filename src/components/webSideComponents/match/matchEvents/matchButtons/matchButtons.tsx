import { useRouter } from "next/navigation";
import MatchEventsLayout from "./matchButtons.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePlayerStats } from "@/services/PlayersFetches/usePlayers";
import { updateMatchProgress } from "@/services/MatchFetches/useMatch";
import { MatchStatus } from "@/types/IMatch";
import React from "react";

type penaltiesType = {
    homeTeam: number;
    awayTeam: number;
};
type matchEventProps = {
    matchId: string;
    tournamentId: string;
    homeTeamScore: number;
    awayTeamScore: number;
    matchStatus: MatchStatus;
    isOverTime: boolean;
    matchPenalties: penaltiesType;
    eventDialog: React.RefObject<HTMLDialogElement | null>;
};
export default function matchButtons({
    matchId,
    tournamentId,
    homeTeamScore,
    awayTeamScore,
    matchStatus,
    isOverTime,
    matchPenalties,
    eventDialog,
}: matchEventProps) {
    const router = useRouter();
    const queryClient = useQueryClient();

    const endMatch = useMutation({
        mutationFn: ({
            matchId,
            matchPenalties,
        }: {
            matchId: string;
            matchPenalties: penaltiesType;
        }) => updatePlayerStats(matchId, matchPenalties),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["players"] });
            const transferPath =
                tournamentId !== ""
                    ? `/admin/tournament/${tournamentId}`
                    : "/admin/rozgrywki";
            router.push(transferPath);
            router.refresh();
        },
    });

    const startMatch = useMutation({
        mutationFn: (matchId: string) =>
            updateMatchProgress({ matchStatusType: "matchStatus", matchId }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["match"] });
        },
    });
    const startOverTime = useMutation({
        mutationFn: (matchId: string) =>
            updateMatchProgress({ matchStatusType: "isOverTime", matchId }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["match"] });
        },
    });
    return (
        <div className={MatchEventsLayout.buttonsBox}>
            {matchStatus !== MatchStatus.FINISHED ? (
                matchStatus === MatchStatus.IN_PROGRESS ? (
                    <>
                        {matchPenalties.homeTeam === 0 &&
                        matchPenalties.awayTeam === 0 ? (
                            <button
                                onClick={() => {
                                    eventDialog.current?.showModal();
                                }}
                                className={`buttonStyle ${MatchEventsLayout.addEventBtn}`}
                            >
                                Dodaj event
                            </button>
                        ) : null}

                        {!isOverTime &&
                        homeTeamScore === awayTeamScore &&
                        tournamentId !== "" ? (
                            <button
                                onClick={() => startOverTime.mutate(matchId)}
                                className={`buttonStyle ${MatchEventsLayout.overTimeBtn}`}
                            >
                                Rozpocznij Dogrywke
                            </button>
                        ) : (
                            <button
                                onClick={() =>
                                    endMatch.mutate({
                                        matchId,
                                        matchPenalties,
                                    })
                                }
                                className={`buttonStyle ${MatchEventsLayout.endGameBtn}`}
                            >
                                Zakończ mecz
                            </button>
                        )}
                    </>
                ) : (
                    <button
                        onClick={() => startMatch.mutate(matchId)}
                        className={`buttonStyle ${MatchEventsLayout.startGame}`}
                    >
                        Rozpocznij mecz
                    </button>
                )
            ) : null}
        </div>
    );
}
