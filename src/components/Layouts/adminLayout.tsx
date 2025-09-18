import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Slack } from "lucide-react";
import classes from "@/styles/dashboard.module.css";
import Link from "next/link";
import globalLayout from "@/styles/globalLayout.module.css";

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={globalLayout.wrapper}>
            <nav className={classes.navBox}>
                <div className={classes.logoBox}>
                    <Link href="/home">
                        <Slack /> Football Academy
                    </Link>
                </div>

                <ul className={classes.linksBox}>
                    <div className={classes.tabContainer}>
                        <li>
                            <Link href="/admin/sklad">Zawodnicy</Link>
                        </li>
                        <li>
                            <Link href="/admin/sztab">Sztab</Link>
                        </li>
                        <li>
                            <Link href="/admin/rozgrywki">Rozgrywki</Link>
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
        </div>
    );
}
