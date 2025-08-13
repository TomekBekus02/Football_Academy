"use client";
import classes from "./staff.module.css";
import Member from "./member/member";
import { IStaffMember } from "@/types/IStaffMember";
import { FetchStaff } from "@/services/StaffFetches/useStaff";
import { useQuery } from "@tanstack/react-query";

export default function Staff() {
    const {
        data: staffData,
        error,
        isLoading,
    } = useQuery<IStaffMember[], Error>({
        queryKey: ["StaffMembers"],
        queryFn: FetchStaff,
    });

    const renderContent = () => {
        if (isLoading) return <p>Pobieranie...</p>;
        if (error) return <p>{error.message}</p>;
        if (!staffData?.length) return <p>Brak sztabu</p>;

        return staffData.map((member) => (
            <>
                {console.log("photo:", staffData![0].photo)}
                <Member
                    key={member._id}
                    name={member.name}
                    age={member.age}
                    photo={member.photo}
                    role={member.role}
                    ageGroup={member.ageGroup}
                />
            </>
        ));
    };

    return (
        <div className={classes.staffBox}>
            <div className={classes.staffContent}>{renderContent()}</div>
        </div>
    );
}
