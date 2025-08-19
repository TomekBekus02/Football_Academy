"use client";
import { addPlayer } from "@/services/PlayersFetches/usePlayers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import inputTemplate from "@/components/inputTemplate/inputTemplate";

export default function addPlayerFunc() {
    const queryClient = useQueryClient();
    const router = useRouter();
    const { mutate, isPending, isError } = useMutation({
        mutationFn: (newPlayer: FormData) => addPlayer(newPlayer),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["Players"] });
            router.push("/admin/sklad");
            router.refresh();
        },
    });
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        // const name = formData.get("name") as string;
        // const dateBirth = formData.get("dateOfBirth") as string;
        // const position = formData.get("position") as string;
        // const shirtNumber = formData.get("number") as string;
        // const photo = formData.get("photo") as File | null;

        mutate(formData);
    };
    return (
        <div>
            <h1>here add player</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Imie i nazwisko</label>
                    <input type="text" name="name" required />
                </div>
                <div>
                    <label>Data urodzenia</label>
                    <input type="date" name="dateOfBirth" required />
                </div>
                <div>
                    <label>Pozycja</label>
                    <select name="position">
                        <option value="Bramkarz">Bramkarz</option>
                        <option value="Obrońca">Obrońca</option>
                        <option value="Pomocnik">Pomocnik</option>
                        <option value="Napastnik">Napastnik</option>
                    </select>
                </div>
                <div>
                    <label>Numer na koszulce</label>
                    <input type="text" name="number" required />
                </div>
                <div>
                    <label>Obraz</label>
                    <input
                        type="file"
                        accept="image/png, image/jpeg, image/jpg"
                        name="photo"
                        required
                    />
                </div>
                <button type="submit" disabled={isPending}>
                    {isPending ? "Dodawania..." : "Dodaj"}
                </button>
            </form>
        </div>
    );
}
