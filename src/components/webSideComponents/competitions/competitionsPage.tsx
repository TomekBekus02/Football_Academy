import { useRef } from "react";
import {
    ManageCompetitionDialog,
    ModalHandle,
} from "./dialog/manageCompetitionDialog";
import Competitions from "./competitions/Competitions";

interface CompetitionsPageParams {
    isAdmin: boolean;
}
export default function CompetitionsPage({ isAdmin }: CompetitionsPageParams) {
    const modalRef = useRef<ModalHandle>(null);
    const handleOpenModal = () => {
        modalRef.current?.showModal();
    };
    return (
        <div>
            {isAdmin && (
                <>
                    <button
                        onClick={handleOpenModal}
                        className="buttonStyle addBtn"
                    >
                        Stwórz nowe wydarzenie
                    </button>
                </>
            )}
            <ManageCompetitionDialog ref={modalRef} />
            <div>
                <Competitions isAdmin={isAdmin} />
            </div>
        </div>
    );
}
