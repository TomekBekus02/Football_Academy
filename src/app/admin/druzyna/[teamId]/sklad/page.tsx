"use client";

import PlayerRow from "@/app/admin/druzyna/[teamId]/sklad/playerRow/playerRow";
import Link from "next/link";
import pageLayout from "./page.module.css";
import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { IPlayer } from "@/types/IPlayer";
import { fetchTeamSquad } from "@/services/PlayersFetches/usePlayers";
import SortableTableHeader from "./playerRow/SortableTableHeader/SortableTableHeader";
import { ModalHandle } from "./dialog/managePlayerDialog";
import { ManagePlayerDialog } from "./dialog/managePlayerDialog";

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

    const modalRef = useRef<ModalHandle>(null);
    const handleOpenModal = () => {
        modalRef.current?.showModal();
    };
    const handleAddPlayerDialog = () => {
        setPlayerId("");
        handleOpenModal();
    };
    const [playerId, setPlayerId] = useState<string>("");

    useEffect(() => {
        if (data) {
            setPlayersData(data);
        }
    }, [data]);

    return (
        <div className={pageLayout.pageBox}>
            <ManagePlayerDialog playerId={playerId} ref={modalRef} />
            <div className={pageLayout.tableBox}>
                <div className={pageLayout.headerBox}>
                    <button
                        className="buttonStyle addBtn"
                        onClick={() => handleAddPlayerDialog()}
                    >
                        Dodaj zawodnika
                    </button>
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
                            setPlayerId={setPlayerId}
                            OpenModal={handleOpenModal}
                        />
                    </tbody>
                </table>
            </div>
        </div>
    );
}
