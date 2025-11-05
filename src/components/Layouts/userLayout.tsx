import { Slack } from "lucide-react";
import Link from "next/link";
import navLayout from "./dashboard.module.css";

export default function UserLayout({ teamId }: { teamId: string }) {
    return (
        <div className={navLayout.navBox}>
            <div className={navLayout.logoBox}>
                <Link href="/home">
                    <Slack /> Football Academy
                </Link>
            </div>
            <ul className={navLayout.linksBox}>
                <div className={navLayout.tabContainer}>
                    <li
                        className={`${navLayout.navItem} ${navLayout.dropdown}`}
                    >
                        <p>Drużyna</p>
                        <ul className={navLayout.dropdownMenu}>
                            <li>
                                <Link href={`/druzyna/${teamId}/sklad`}>
                                    Skład
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={`/druzyna/${teamId}/statystyki-druzyny`}
                                >
                                    Statystyki drużyny
                                </Link>
                            </li>
                            <li>
                                <Link href={`/druzyna/${teamId}/sztab`}>
                                    Sztab
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link href="/rozgrywki">Rozgrywki</Link>
                    </li>
                    <li>
                        <Link href="/home#oNas">O nas</Link>
                    </li>
                    <li>
                        <Link href="/home#Treningi">Treningi</Link>
                    </li>
                    <li>
                        <Link href="/home#FAQ">FAQ</Link>
                    </li>
                    <li>
                        <Link href="/home#kontakt">Kontakt</Link>
                    </li>
                </div>
                <div className={navLayout.joinUsButtonContainer}>
                    <li>
                        <Link href="/kontakt">Dołącz do nas</Link>
                    </li>
                </div>
            </ul>
        </div>
    );
}
