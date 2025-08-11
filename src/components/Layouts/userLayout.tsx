import { Slack } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import AdminLayout from "@/components/adminLayout";
import classes from "@/app/dashboard.module.css";
import "@/app/globals.css";

export default function UserLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <nav className={classes.navBox}>
                <div className={classes.logoBox}>
                    <Link href="/home">
                        <Slack /> Football Academy
                    </Link>
                </div>
                <ul className={classes.linksBox}>
                    <div className={classes.tabContainer}>
                        <li>
                            <Link href="/players">Zawodnicy</Link>
                        </li>
                        <li>
                            <Link href="/staff">Sztab</Link>
                        </li>
                        <li>
                            <Link href="*">Statystyki klubu</Link>
                        </li>
                        <li>
                            <Link href="*">O Nas</Link>
                        </li>
                        <li>
                            <Link href="*">Kontakt</Link>
                        </li>
                    </div>
                    <div className={classes.joinUsButtonContainer}>
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
