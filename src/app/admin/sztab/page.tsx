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
        if (isLoading) return <p>Pobieranie...</p>;
        if (error) return <p>{error.message}</p>;
        if (!staffData?.length) return <p>Brak sztabu</p>;

        return staffData.map((member) => (
            <>
                <div>
                    <button>
                        <Link href={`/admin/sztab/${member._id}`}>
                            Edytuj <Pencil />
                        </Link>
                    </button>
                    <button
                        onClick={() =>
                            member._id && mutation.mutate(member._id)
                        }
                        style={{ cursor: "pointer" }}
                    >
                        Usun <Trash />
                    </button>
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
        <div className={classes.staffBox}>
            <div>
                <button>
                    <Link href={"/admin/sztab/dodaj-czlonka-sztabu"}>
                        Dodaj członka sztabu
                    </Link>
                </button>
                <div className={classes.staffContent}>{renderContent()}</div>
            </div>
        </div>
    );
}
