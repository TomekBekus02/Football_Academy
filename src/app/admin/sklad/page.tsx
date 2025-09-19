import PlayerRow from "@/app/admin/sklad/playerRow/playerRow";
import Link from "next/link";
import pageLayout from "./page.module.css";

export default function Players() {
    return (
        <div className={pageLayout.pageBox}>
            <div className={pageLayout.tableBox}>
                <div className={pageLayout.headerBox}>
                    <h1>Drużyna Football Academy</h1>
                    <Link href="/admin/sklad/dodaj-zawodnika">
                        <button className="buttonStyle addBtn">
                            Dodaj zawodnika
                        </button>
                    </Link>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Numer</th>
                            <th scope="col">Nazwisko</th>
                            <th scope="col">Występy</th>
                            <th scope="col">Bramki</th>
                            <th scope="col">Asysty</th>
                            <th scope="col">Czyste konta</th>
                            <th scope="col">Czerwone kartki</th>
                            <th scope="col">Żółte kartki</th>
                            <th scope="col">MVP</th>
                            <th scope="col">Pozycja</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <PlayerRow />
                    </tbody>
                </table>
            </div>
        </div>
    );
}
