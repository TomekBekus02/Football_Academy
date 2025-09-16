import { MatchStatus } from "@/types/IMatch";
import { IBracketMatch } from "@/types/ITournament";
import Image from "next/image";

type tournamentMatchProps = {
    match: IBracketMatch;
};
export default function tournamentMatch({ match }: tournamentMatchProps) {
    return (
        <div>
            <span>
                {match.home.team && (
                    <Image
                        src={match.home.team.logo}
                        alt={`${match.home.team.name} logo`}
                        width={50}
                        height={45}
                    />
                )}
                <p>{match.home.team == null ? "TBD" : match.home.team.name} </p>
            </span>
            <p>vs </p>
            <span>
                {match.away.team && (
                    <Image
                        src={match.away.team.logo}
                        alt={`${match.away.team.name} logo`}
                        width={50}
                        height={45}
                    />
                )}
                <p>{match.away.team == null ? "TBD" : match.away.team.name}</p>
            </span>
            <span>
                {match.matchStatus !== MatchStatus.CREATED ? (
                    <div>
                        {match.home.score} - {match.away.score}
                    </div>
                ) : (
                    " - "
                )}
            </span>
        </div>
    );
}
