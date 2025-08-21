"use client";

import {
    editStaffMember,
    FetchStaffMember,
} from "@/services/StaffFetches/useStaff";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function editedStaffMember({
    params,
}: {
    params: { memberId: string };
}) {
    const queryClient = useQueryClient();
    const router = useRouter();
    const memberId = params.memberId;
    const { mutate, isPending } = useMutation({
        mutationFn: editStaffMember,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["staffMembers"] });
            router.push("/admin/sztab");
            router.refresh();
        },
    });
    const {
        data: memberData,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["staffMembers", memberId],
        queryFn: ({ queryKey }) => {
            const [, memberId] = queryKey;
            return FetchStaffMember(memberId);
        },
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);
        mutate({ memberId, formData });
    };
    if (isLoading)
        return (
            <tr>
                <td>Ładowanie...</td>
            </tr>
        );
    if (error)
        return (
            <tr>
                <td>Błąd: {error.message}</td>
            </tr>
        );
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Imie i Nazwisko</label>
                    <input
                        type="text"
                        name="name"
                        defaultValue={memberData.name}
                    />
                </div>
                <div>
                    <label>Wiek</label>
                    <input
                        type="number"
                        name="age"
                        defaultValue={memberData.age}
                    />
                </div>
                <div>
                    <label>Rola</label>
                    <select name="role" defaultValue={memberData.role}>
                        <option value="Główny Trener">Główny Trener</option>
                        <option value="Asystent Trenera">
                            Asystent Trenera
                        </option>
                        <option value="Trener Bramkarzy">
                            Trener Bramkarzy
                        </option>
                        <option value="Fizjoterapeuta">Fizjoterapeuta</option>
                        <option value="Lekarz">Lekarz</option>
                        <option value="Trener przygotowania fizycznego">
                            Trener przygotowania fizycznego
                        </option>
                        <option value="Analityk">Analityk</option>
                    </select>
                </div>
                <div>
                    <label>Grupa wiekowa</label>
                    <select name="ageGroup" defaultValue={memberData.ageGroup}>
                        <option value="U12">U12</option>
                    </select>
                </div>
                <div>
                    <input
                        type="file"
                        name="photo"
                        accept="image/png, image/jpeg, image/jpg"
                    />
                </div>
                <input
                    type="text"
                    name="photoPath"
                    defaultValue={memberData.photo}
                    hidden
                />
                <button>{isPending ? "Aktualizowanie..." : "Edytuj"}</button>
            </form>
        </div>
    );
}
