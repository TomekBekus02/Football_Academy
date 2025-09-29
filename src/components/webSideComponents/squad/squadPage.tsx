import { IPlayer } from "@/types/IPlayer";
import { useEffect, useRef, useState } from "react";
import { ManagePlayerDialog, ModalHandle } from "./dialog/managePlayerDialog";
import { fetchTeamSquad } from "@/services/PlayersFetches/usePlayers";
import { useQuery } from "@tanstack/react-query";
import pageLayout from "./squadPage.module.css";
import SortableTableHeader from "./playerRow/SortableTableHeader/SortableTableHeader";
import PlayerRow from "./playerRow/playerRow";

interface squadPageParams {
    teamId: string;
    isAdmin: boolean;
}
export default function SquadPage({ teamId, isAdmin }: squadPageParams) {
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
            <div className={pageLayout.tableBox}>
                {isAdmin && (
                    <>
                        <ManagePlayerDialog
                            playerId={playerId}
                            ref={modalRef}
                        />
                        <div className={pageLayout.headerBox}>
                            <button
                                className="buttonStyle addBtn"
                                onClick={() => handleAddPlayerDialog()}
                            >
                                Dodaj zawodnika
                            </button>
                        </div>
                    </>
                )}

                <table>
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <SortableTableHeader
                                setPlayersData={setPlayersData}
                            />
                            {isAdmin && <th scope="col"></th>}
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
                            isAdmin={isAdmin}
                        />
                    </tbody>
                </table>
            </div>
        </div>
    );
}
