import { ITeamHead2Head } from "@/types/ITeam";
import styles from "../allTimeTable/allTimeTable.module.css";
import Image from "next/image";

type head2headParams = {
    teams: Array<ITeamHead2Head>;
};
export default function Head2Head({ teams }: head2headParams) {
    return (
        <table className={styles.table}>
            <caption>Bilans H2H</caption>
            <thead>
                <tr>
                    <th></th>
                    <th>Drużyna</th>
                    <th>Z-R-P</th>
                    <th>zdobyte</th>
                    <th>Stracone</th>
                    <th>+/-</th>
                </tr>
            </thead>
            <tbody>
                {teams.map((team, index) => {
                    return (
                        <tr key={team.teamId} className={`${styles.row} `}>
                            <td className={styles.position}>{index + 1}.</td>
                            <td>
                                <div className={styles.teamInfo}>
                                    <Image
                                        src={team.teamLogo}
                                        alt={team.teamName}
                                        width={70}
                                        height={70}
                                        className="imageStyle"
                                    />
                                    <span className={`${styles.teamName}`}>
                                        {team.teamName}
                                    </span>
                                </div>
                            </td>
                            <td className={styles.record}>
                                {team.wins}-{team.draws}-{team.losses}
                            </td>
                            <td className={styles.goalDiff}>{team.goalsFor}</td>
                            <td>{team.goalsAgainst}</td>
                            <td>{team.goalDifference}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
