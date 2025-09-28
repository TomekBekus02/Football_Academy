import Image from "next/image";
import CompetitionLayout from "./teamDetails.module.css";
import { MatchStatus } from "@/types/IMatch";

type TeamDetailsProps = {
    name: string;
    logo: string;
    isHomeTeam: boolean;
    homeTeamScore: number;
    awayTeamScore: number;
    matchStatus: MatchStatus;
};

export default function TeamDetails({
    name,
    logo,
    isHomeTeam,
    homeTeamScore,
    awayTeamScore,
    matchStatus,
}: TeamDetailsProps) {
    let isWinner = false;
    if (matchStatus === MatchStatus.FINISHED) {
        if (isHomeTeam) {
            isWinner = homeTeamScore > awayTeamScore;
        } else {
            isWinner = homeTeamScore < awayTeamScore;
        }
    }

    return (
        <div
            className={`${CompetitionLayout.competitionName}
            } ${isHomeTeam ? CompetitionLayout.homeTeam : null}`}
        >
            <Image
                src={logo}
                alt={name}
                width={75}
                height={65}
                className="imageStyle"
            ></Image>
            {isWinner ? (
                <h2 style={{ fontWeight: "900" }}>{name}*</h2>
            ) : (
                <h2>{name}</h2>
            )}
        </div>
    );
}
