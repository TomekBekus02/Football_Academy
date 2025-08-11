import { playersData } from "@/data/players";
import AdminPlayerRow from "./adminPlayerRow/adminPlayerRow";

export default function () {
    return (
        <div>
            <h1>Drużyna {playersData[0].team}</h1>
            <button>Dodaj piłkarza</button>
            <table>
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Nazwisko</th>
                        <th scope="col">Występy</th>
                        <th scope="col">Bramki</th>
                        <th scope="col">Asysty</th>
                        <th scope="col">Czyste konta</th>
                        <th scope="col">Czerwone kartki</th>
                        <th scope="col">Żółte kartki</th>
                        <th scope="col">MVP</th>
                        <th scope="col">Pozycja</th>
                    </tr>
                </thead>
                <tbody>
                    <AdminPlayerRow />
                </tbody>
            </table>
        </div>
    );
}
