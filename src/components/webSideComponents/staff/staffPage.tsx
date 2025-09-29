import LoadProvider from "@/components/LoadProvider/LoadProvider";
import { ManageStaffDialog, ModalHandle } from "./dialog/manageStaffDialog";
import Member from "./member/member";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    deleteStaffMember,
    FetchStaff,
} from "@/services/StaffFetches/useStaff";
import { IStaffMember } from "@/types/IStaffMember";
import { useRef, useState } from "react";
import { Trash, Pencil } from "lucide-react";
import staffLayout from "./staffPage.module.css";

interface StaffPageParams {
    isAdmin: boolean;
}
export default function StaffPage({ isAdmin }: StaffPageParams) {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: deleteStaffMember,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["staffMembers"] });
        },
    });
    const {
        data: staffData,
        error,
        isLoading,
    } = useQuery<IStaffMember[], Error>({
        queryKey: ["staffMembers"],
        queryFn: FetchStaff,
    });

    const modalRef = useRef<ModalHandle>(null);
    const handleOpenModal = () => {
        modalRef.current?.showModal();
    };
    const handleStaffDialog = (memberId: string) => {
        setStaffMemberId(memberId !== "" ? memberId : "");
        handleOpenModal();
    };
    const [staffMemberId, setStaffMemberId] = useState<string>("");

    const renderContent = () => {
        if (!staffData?.length) return <p>Brak sztabu</p>;

        return staffData.map((member) => (
            <div style={{ position: "relative" }} key={member._id}>
                {isAdmin && (
                    <div className={staffLayout.buttonBox}>
                        <button
                            className="editBtn"
                            onClick={() =>
                                handleStaffDialog(member._id as string)
                            }
                        >
                            <Pencil
                                className={`${staffLayout.icon} ${staffLayout.editIcon}`}
                            />
                        </button>
                        <button
                            className="deleteBtn"
                            onClick={() =>
                                member._id && mutation.mutate(member._id)
                            }
                        >
                            <Trash
                                className={`${staffLayout.icon} ${staffLayout.deleteIcon}`}
                            />
                        </button>
                    </div>
                )}

                <Member
                    key={member._id}
                    name={member.name}
                    age={member.age}
                    photo={member.photo}
                    role={member.role}
                    ageGroup={member.ageGroup}
                />
            </div>
        ));
    };

    return (
        <LoadProvider error={error} isLoading={isLoading}>
            <div className={staffLayout.staffBox}>
                <div>
                    {isAdmin && (
                        <>
                            <ManageStaffDialog
                                staffMemberId={staffMemberId}
                                ref={modalRef}
                            />
                            <button
                                className="buttonStyle addBtn"
                                onClick={() => handleStaffDialog("")}
                            >
                                Dodaj członka sztabu
                            </button>
                        </>
                    )}

                    <div className={staffLayout.staffContent}>
                        {renderContent()}
                    </div>
                </div>
            </div>
        </LoadProvider>
    );
}
