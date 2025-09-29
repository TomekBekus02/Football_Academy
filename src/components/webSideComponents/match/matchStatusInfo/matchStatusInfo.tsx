import { IMatch, MatchStatus } from "@/types/IMatch";

export default function MatchStatusInfo({ matchData }: { matchData: IMatch }) {
    return (
        <>
            <h3>
                {matchData.matchDate} {matchData.matchHour}
            </h3>
            {matchData.matchStatus !== MatchStatus.CREATED ? (
                <h1>{`${matchData.homeTeamScore}:${matchData.awayTeamScore}`}</h1>
            ) : (
                <h1>-</h1>
            )}
            {matchData.matchStatus === MatchStatus.IN_PROGRESS && <h2>TRWA</h2>}

            {matchData.matchStatus === MatchStatus.FINISHED && (
                <>
                    {matchData.isOverTime ? (
                        matchData.homeTeamPenaltiesScore !== 0 &&
                        matchData.awayTeamPenaltiesScore !== 0 ? (
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
        </>
    );
}
