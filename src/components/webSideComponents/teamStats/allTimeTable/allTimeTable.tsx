import { ITeamsTable } from "@/types/ITeam";
import Image from "next/image";
import styles from "./allTimeTable.module.css";

type allTimeTableParams = {
    teams: Array<ITeamsTable>;
    teamId: string;
};
export default function AllTimeTable({ teams, teamId }: allTimeTableParams) {
    return (
        <table className={styles.table}>
            <caption>ALL-TIME TABLE</caption>
            <thead>
                <tr>
                    <th></th>
                    <th>Drużyna</th>
                    <th>Z-R-P</th>
                    <th>+/-</th>
                    <th>Pts</th>
                </tr>
            </thead>
            <tbody>
                {teams.map((team, index) => {
                    const isCurrent = team._id === teamId;
                    return (
                        <tr
                            key={team._id}
                            className={`${styles.row} ${
                                isCurrent ? styles.currentTeam : ""
                            }`}
                        >
                            <td className={styles.position}>{index + 1}.</td>
                            <td className={styles.teamInfo}>
                                <Image
                                    src={team.logo}
                                    alt={team.name}
                                    width={70}
                                    height={70}
                                    className="imageStyle"
                                />
                                <span
                                    className={`${
                                        isCurrent ? "" : styles.teamName
                                    }`}
                                >
                                    {team.name}
                                </span>
                            </td>
                            <td className={styles.record}>
                                {team.wins}-{team.draws}-{team.loses}
                            </td>
                            <td className={styles.goalDiff}>
                                {team.goalBalance}
                            </td>
                            <td className={styles.points}>{team.points}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
