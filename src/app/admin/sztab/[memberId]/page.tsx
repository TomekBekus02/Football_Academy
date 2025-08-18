export default function editedStaffMember({
    params,
}: {
    params: { memberId: string };
}) {
    return (
        <div>
            <h1>this is staff member id {params.memberId}</h1>
        </div>
    );
}
