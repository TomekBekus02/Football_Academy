"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash, Pencil } from "lucide-react";
import { IPlayer } from "@/types/IPlayer";
import {
    deletePlayer,
    fetchTeamSquad,
} from "@/services/PlayersFetches/usePlayers";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import rowStyles from "./playerRow.module.css";
import { useEffect, useState } from "react";
import SortableTableHeader from "./SortableTableHeader/SortableTableHeader";

type playerRowType = {
    teamId: string;
    playersData: IPlayer[];
    isLoading: boolean;
    error: Error | null;
};
export default function playerRow({
    teamId,
    playersData,
    isLoading,
    error,
}: playerRowType) {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: deletePlayer,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["players"] });
        },
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
                        <td className={rowStyles.nameStyle}>
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

                        <td className={rowStyles.buttonBox}>
                            <Link
                                href={`/admin/druzyna/${teamId}/sklad/${player._id}`}
                            >
                                <button className="editBtn">
                                    <Pencil className={rowStyles.icon} />
                                </button>
                            </Link>
                            <button
                                onClick={() =>
                                    player._id && mutation.mutate(player._id)
                                }
                                className="deleteBtn"
                            >
                                <Trash className={rowStyles.icon} />
                            </button>
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td>No players</td>
                </tr>
            )}
        </>
    );
}
