import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Slack } from "lucide-react";
import classes from "@/app/dashboard.module.css";
import Link from "next/link";

export default function AdminLayout({
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
                            <Link href="/admin">Zawodnicy</Link>
                        </li>
                        <li>
                            <Link href="/staff">Sztab</Link>
                        </li>
                        <li>
                            <Link href="*">Turnieje</Link>
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
