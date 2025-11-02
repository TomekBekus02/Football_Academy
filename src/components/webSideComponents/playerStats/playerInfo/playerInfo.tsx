import { IPlayerDetails } from "@/types/IPlayer";
import Image from "next/image";
import styles from "./playerInfo.module.css";
import { RedCard, YellowCard } from "@/components/icons/matchIcons";
import { statIcons } from "@/components/icons/matchIcons";

export default function PlayerInfo({ player }: { player: IPlayerDetails }) {
    return (
        <div className={styles.card}>
            <div className={styles.topSection}>
                <Image
                    src={player.photo}
                    alt={player.name}
                    width={180}
                    height={230}
                    className={styles.imageStyle}
                />
                <div className={styles.statsContainer}>
                    <div className={styles.statsRow}>
                        <h4 className={styles.toolTip}>
                            {statIcons.appearance}: {player.appearances}
                            <span className={styles.toolTipText}>
                                Rozegrane mecze
                            </span>
                        </h4>
                        <h4 className={styles.toolTip}>
                            {statIcons.goal}: {player.goals}
                            <span className={styles.toolTipText}>Bramki</span>
                        </h4>
                        <h4 className={styles.toolTip}>
                            {statIcons.assist}: {player.assists}
                            <span className={styles.toolTipText}>Asysty</span>
                        </h4>
                        <h4 className={styles.toolTip}>
                            {statIcons.cleanSheet}: {player.cleanSheet}
                            <span className={styles.toolTipText}>
                                Czyste konta
                            </span>
                        </h4>
                        <h4 className={styles.toolTip}>
                            <YellowCard /> {player.yellowCards}
                            <span className={styles.toolTipText}>
                                Żółte kartki
                            </span>
                        </h4>
                        <h4 className={styles.toolTip}>
                            <RedCard /> {player.redCards}
                            <span className={styles.toolTipText}>
                                Czerwone Kartki
                            </span>
                        </h4>
                    </div>
                    <div className={styles.infoSection}>
                        <h4
                            className={`${styles.toolTip} ${styles.nameSection}`}
                        >
                            <span>👤:</span> <span>{player.name}</span>
                            <span className={styles.toolTipText}>
                                Imię i Nazwisko
                            </span>
                        </h4>
                        <h4 className={styles.toolTip}>
                            🗓️: {player.dateBirth}
                            <span className={styles.toolTipText}>
                                Data Urodzenia
                            </span>
                        </h4>
                        <h4 className={styles.toolTip}>
                            🏃‍♂️: {player.position}
                            <span className={styles.toolTipText}>
                                Pozycja na boisku
                            </span>
                        </h4>
                        <h4 className={styles.toolTip}>
                            {statIcons.number}: {player.shirtNumber}
                            <span className={styles.toolTipText}>
                                Numer na koszulce
                            </span>
                        </h4>
                    </div>
                </div>
            </div>
        </div>
    );
}
