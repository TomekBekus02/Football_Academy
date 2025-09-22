"use client";

import PlayerRow from "@/app/admin/druzyna/[teamId]/sklad/playerRow/playerRow";
import Link from "next/link";
import pageLayout from "./page.module.css";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { IPlayer } from "@/types/IPlayer";
import { fetchTeamSquad } from "@/services/PlayersFetches/usePlayers";
import SortableTableHeader from "./playerRow/SortableTableHeader/SortableTableHeader";

export default function Players({
    params,
}: {
    params: Promise<{ teamId: string }>;
}) {
    const { teamId } = React.use(params);
    const { data, error, isLoading } = useQuery<IPlayer[], Error>({
        queryKey: ["players", teamId],
        queryFn: ({ queryKey }) => {
            const [, teamId] = queryKey;
            return fetchTeamSquad(teamId as string);
        },
    });

    const [playersData, setPlayersData] = useState<IPlayer[]>([]);

    useEffect(() => {
        if (data) {
            setPlayersData(data);
        }
    }, [data]);
    return (
        <div className={pageLayout.pageBox}>
            <div className={pageLayout.tableBox}>
                <div className={pageLayout.headerBox}>
                    <Link
                        href={`/admin/druzyna/${teamId}/sklad/dodaj-zawodnika`}
                    >
                        <button className="buttonStyle addBtn">
                            Dodaj zawodnika
                        </button>
                    </Link>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <SortableTableHeader
                                setPlayersData={setPlayersData}
                            />
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <PlayerRow
                            playersData={playersData}
                            teamId={teamId}
                            isLoading={isLoading}
                            error={error}
                        />
                    </tbody>
                </table>
            </div>
        </div>
    );
}
