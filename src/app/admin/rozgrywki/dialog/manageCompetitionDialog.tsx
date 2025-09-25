"use client";

import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import CreateMatch from "@/app/admin/rozgrywki/dialog/createMatch/createMatch";
import CreateTournament from "@/app/admin/rozgrywki/dialog/createTournament/createTournament";
import competitionDialogLayout from "./CompetitionDialog.module.css";

export type ModalHandle = {
    showModal: () => void;
};

export const ManageCompetitionDialog = forwardRef<ModalHandle>(({}, ref) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    const [eventType, setEventType] = useState("tournament");

    useImperativeHandle(ref, () => ({
        showModal: () => {
            dialogRef.current?.showModal();
        },
    }));
    return (
        <dialog ref={dialogRef} className={competitionDialogLayout.dialogBox}>
            <div className="dialogContent">
                <h1>Nowe wydarzenie</h1>
                <div>
                    <button
                        onClick={() => setEventType("tournament")}
                        className={`buttonStyle ${
                            eventType === "tournament" ? "addBtn" : "defaultBtn"
                        }`}
                    >
                        Turniej
                    </button>
                    <button
                        onClick={() => setEventType("match")}
                        className={`buttonStyle ${
                            eventType === "match" ? "addBtn" : "defaultBtn"
                        }`}
                    >
                        Mecz
                    </button>
                </div>

                {eventType === "tournament" ? (
                    <CreateTournament dialogRef={dialogRef} />
                ) : (
                    <CreateMatch dialogRef={dialogRef} />
                )}
            </div>
        </dialog>
    );
});
