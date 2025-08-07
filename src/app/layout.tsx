import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Slack } from 'lucide-react';
import classes from './dashboard.module.css'
import "./globals.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <nav className={classes.navBox}>
          <div className={classes.logoBox}>
            <Link href="*"><Slack /> Football Academy</Link>
          </div>
          <ul className={classes.linksBox}>
            <div className={classes.tabContainer}>
              <li><Link href="*">Zawodnicy</Link></li>
              <li><Link href="*">Sztab</Link></li>
              <li><Link href="*">Kontakt</Link></li>
              <li><Link href="*">Kontakt</Link></li>
            </div>
            <div className={classes.joinUsButtonContainer}>
              <li><Link href="*">Dołącz do nas</Link></li>
            </div>
          </ul>
        </nav>
        {children}
      </body>
    </html>
  );
}
