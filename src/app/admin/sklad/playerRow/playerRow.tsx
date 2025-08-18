"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash, Pencil } from "lucide-react";
import { IPlayer } from "@/types/IPlayer";
import { fetchPlayers } from "@/services/PlayersFetches/usePlayers";
import { useQuery } from "@tanstack/react-query";

export default function playerRow() {
    const {
        data: playersData,
        error,
        isLoading,
    } = useQuery<IPlayer[], Error>({
        queryKey: ["players"],
        queryFn: fetchPlayers,
    });

    if (isLoading)
        return (
            <tr>
                <td>Ładowanie...</td>
            </tr>
        );
    if (error)
        return (
            <tr>
                <td>Błąd: {error.message}</td>
            </tr>
        );

    return (
        <>
            {playersData!.length > 0 ? (
                playersData!.map((player: IPlayer) => (
                    <tr key={player._id}>
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
                        <td>{player.shirtNumber}</td>
                        <td>
                            <Link href={`/players/${player._id}`}>
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
                            <button>
                                <Link href={`/admin/sklad/${player._id}`}>
                                    <Pencil />
                                </Link>
                            </button>
                        </td>
                        <td>
                            <button>
                                <Trash />
                            </button>
                        </td>
                    </tr>
                ))
            ) : (
                <h1>No players</h1>
            )}
        </>
    );
}
