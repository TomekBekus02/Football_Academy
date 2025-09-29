import Image from "next/image";
import bracketMatchLayout from "./bracketTeam.module.css";

type bracketTeamProps = {
    imgPath: string;
    teamName: string;
    score: number | string;
    penaltiesScore: number;
    isOverTime: boolean;
    isDraw: boolean;
};
export default function BracketTeam({
    imgPath,
    teamName,
    score,
    penaltiesScore,
    isOverTime,
    isDraw,
}: bracketTeamProps) {
    return (
        <div className={bracketMatchLayout.matchContent}>
            <div className={bracketMatchLayout.teamContent}>
                <Image src={imgPath} alt={teamName} width={85} height={73} />
                <h2>{teamName}</h2>
            </div>
            <div className={bracketMatchLayout.scoreContent}>
                <h1>{score}</h1>
                {isOverTime && isDraw && penaltiesScore > 0 ? (
                    <h1>{penaltiesScore}</h1>
                ) : null}
            </div>
        </div>
    );
}
