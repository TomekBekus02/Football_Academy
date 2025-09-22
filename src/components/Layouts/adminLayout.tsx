import { Slack } from "lucide-react";
import Link from "next/link";
import navLayout from "./dashboard.module.css";

export default function AdminLayout({ teamId }: { teamId: string }) {
    return (
        <nav className={navLayout.navBox}>
            <div className={navLayout.logoBox}>
                <Link href="/home">
                    <Slack /> Football Academy
                </Link>
            </div>

            <ul className={navLayout.linksBox}>
                <div className={navLayout.tabContainer}>
                    <li>
                        <Link href={`/admin/druzyna/${teamId}/sklad`}>
                            Skład
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin/sztab">Sztab</Link>
                    </li>
                    <li>
                        <Link href="/admin/rozgrywki">Rozgrywki</Link>
                    </li>
                </div>
                <div className={navLayout.joinUsButtonContainer}>
                    <li>
                        <Link href="*">Dołącz do nas</Link>
                    </li>
                </div>
            </ul>
        </nav>
    );
}
