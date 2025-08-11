import { playersData } from "@/data/players";
import Image from "next/image";
import Link from "next/link";

type Player = {
    id: number;
    name: string;
    dateBirth: string;
    photo: string;
    position: string;
    team: string;
    ageGroup: string;
    appearances: number;
    cleanSheet: number;
    goals: number;
    assists: number;
    MVPs: number;
    redCards: number;
    yellowCards: number;
};

export default function adminPlayerRow() {
    return (
        <>
            {playersData.map((player: Player) => (
                <tr key={player.id}>
                    <th scope="row">
                        {
                            <Image
                                src={player.photo}
                                alt=""
                                width={50}
                                height={60}
                            />
                        }
                    </th>
                    <td>
                        <Link href={`/players/${player.id}`}>
                            {player.name}
                        </Link>
                    </td>
                    <td>{player.appearances}</td>
                    <td>{player.goals}</td>
                    <td>{player.assists}</td>
                    <td>{player.cleanSheet}</td>
                    <td>{player.redCards}</td>
                    <td>{player.yellowCards}</td>
                    <td>{player.MVPs}</td>
                    <td>{player.position}</td>
                    <td>
                        <button>Usuń</button>
                        <button>Edytuj</button>
                    </td>
                </tr>
            ))}
        </>
    );
}
