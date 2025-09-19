"use client";

import classes from "@/styles/staff.module.css";
import Member from "@/app/staff/member/member";
import { IStaffMember } from "@/types/IStaffMember";
import {
    deleteStaffMember,
    FetchStaff,
} from "@/services/StaffFetches/useStaff";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Trash, Pencil } from "lucide-react";
import Link from "next/link";
import LoadProvider from "@/components/LoadProvider/LoadProvider";
import staffLayout from "./page.module.css";

export default function Staff() {
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

    const renderContent = () => {
        if (!staffData?.length) return <p>Brak sztabu</p>;

        return staffData.map((member) => (
            <>
                <div style={{ position: "relative" }}>
                    <div className={staffLayout.buttonBox}>
                        <button className="editBtn">
                            <Link href={`/admin/sztab/${member._id}`}>
                                <Pencil
                                    className={`${staffLayout.icon} ${staffLayout.editIcon}`}
                                />
                            </Link>
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
                    <Member
                        key={member._id}
                        name={member.name}
                        age={member.age}
                        photo={member.photo}
                        role={member.role}
                        ageGroup={member.ageGroup}
                    />
                </div>
            </>
        ));
    };

    return (
        <LoadProvider error={error} isLoading={isLoading}>
            <div className={classes.staffBox}>
                <div>
                    <Link href={"/admin/sztab/dodaj-czlonka-sztabu"}>
                        <button className="buttonStyle addBtn">
                            Dodaj członka sztabu
                        </button>
                    </Link>
                    <div className={classes.staffContent}>
                        {renderContent()}
                    </div>
                </div>
            </div>
        </LoadProvider>
    );
}
