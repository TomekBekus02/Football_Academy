"use client";

import Competitions from "@/app/admin/rozgrywki/competitions/Competitions";
import {
    ManageCompetitionDialog,
    ModalHandle,
} from "./dialog/manageCompetitionDialog";
import { useRef } from "react";

export default function tournaments() {
    const modalRef = useRef<ModalHandle>(null);
    const handleOpenModal = () => {
        modalRef.current?.showModal();
    };
    return (
        <div>
            <ManageCompetitionDialog ref={modalRef} />
            <button onClick={handleOpenModal} className="buttonStyle addBtn">
                Stwórz nowe wydarzenie
            </button>
            <div>
                <h1>Zaplanowane Rozgrywki</h1>
                <Competitions isFinished={true} />
            </div>
            <div>
                <h1>Zakończone Rozgrywki</h1>
                <Competitions isFinished={false} />
            </div>
        </div>
    );
}
