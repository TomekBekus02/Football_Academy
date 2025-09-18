import { MatchStatus } from "@/types/IMatch";
import { IBracketMatch } from "@/types/ITournament";
import bracketMatchLayout from "./tournamentMatch.module.css";
import BracketTeam from "./bracketTeam/bracketTeam";

type tournamentMatchProps = {
    match: IBracketMatch;
};
export default function tournamentMatch({ match }: tournamentMatchProps) {
    return (
        <div className={bracketMatchLayout.matchBox}>
            {match.home.team == null ? (
                <BracketTeam
                    imgPath="/teams/default_TeamLogo.png"
                    teamName="TBD"
                    score="-"
                    penaltiesScore={0}
                    isOverTime={false}
                    isDraw={false}
                />
            ) : (
                <BracketTeam
                    imgPath={match.home.team.logo}
                    teamName={match.home.team.name}
                    score={
                        match.matchStatus !== MatchStatus.CREATED
                            ? match.home.score
                            : "-"
                    }
                    penaltiesScore={match.home.penaltiesScore}
                    isOverTime={match.isOverTime}
                    isDraw={match.home.score === match.away.score}
                />
            )}
            {match.away.team == null ? (
                <BracketTeam
                    imgPath="/teams/default_TeamLogo.png"
                    teamName="TBD"
                    score="-"
                    penaltiesScore={0}
                    isOverTime={false}
                    isDraw={false}
                />
            ) : (
                <BracketTeam
                    imgPath={match.away.team.logo}
                    teamName={match.away.team.name}
                    score={
                        match.matchStatus !== MatchStatus.CREATED
                            ? match.away.score
                            : "-"
                    }
                    penaltiesScore={match.away.penaltiesScore}
                    isOverTime={match.isOverTime}
                    isDraw={match.home.score === match.away.score}
                />
            )}
        </div>
    );
}
