import { Slack } from "lucide-react";
import Link from "next/link";
import navLayout from "./dashboard.module.css";

export default function UserLayout({
    children,
    teamId,
}: Readonly<{
    children: React.ReactNode;
    teamId: string;
}>) {
    return (
        <>
            <nav className={navLayout.navBox}>
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
                            <Link href="*">O Nas</Link>
                        </li>
                        <li>
                            <Link href="*">Kontakt</Link>
                        </li>
                    </div>
                    <div className={navLayout.joinUsButtonContainer}>
                        <li>
                            <Link href="*">Dołącz do nas</Link>
                        </li>
                    </div>
                </ul>
            </nav>
            {children}
        </>
    );
}
