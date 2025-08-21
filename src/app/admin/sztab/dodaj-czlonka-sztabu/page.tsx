"use client";

import { addStaffMember } from "@/services/StaffFetches/useStaff";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function addMember() {
    const queryClient = useQueryClient();
    const router = useRouter();

    const { mutate, isPending, isError } = useMutation({
        mutationFn: (newMember: FormData) => addStaffMember(newMember),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["staffMembers"] });
            router.push("/admin/sztab");
            router.refresh();
        },
    });
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        mutate(formData);
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Imie i Nazwisko</label>
                    <input type="text" name="name" />
                </div>
                <div>
                    <label>Wiek</label>
                    <input type="number" name="age" />
                </div>
                <div>
                    <label>Rola</label>
                    <select name="role">
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
                    <select name="ageGroup">
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
                <button>{isPending ? "Dodawanie..." : "Dodaj"}</button>
            </form>
        </div>
    );
}
