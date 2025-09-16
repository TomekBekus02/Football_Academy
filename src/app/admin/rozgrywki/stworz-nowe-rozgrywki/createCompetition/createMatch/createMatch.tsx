import InputTeamsOption from "@/app/admin/rozgrywki/stworz-nowe-rozgrywki/createCompetition/createMatch/inputTeamsOption/inputTeamsOption";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMatch } from "@/services/MatchFetches/useMatch";
import { useRouter } from "next/navigation";

export default function createNewMatch() {
    const queryClient = useQueryClient();
    const router = useRouter();
    const { mutate, isPending, error } = useMutation({
        mutationFn: (newMatch: FormData) => createMatch(newMatch),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["match"] });
            router.push("/admin/rozgrywki");
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
        <form onSubmit={handleSubmit}>
            <div>
                <InputTeamsOption
                    selectName="homeTeamId"
                    labelText="Gospodarz"
                />
                <InputTeamsOption selectName="awayTeamId" labelText="Gość" />
            </div>
            <div>
                <label>Data meczu</label>
                <input type="date" name="matchDate" />
                <input type="time" name="matchHour" />
            </div>
            <div>
                <label>Adres meczu</label>
                <input type="text" name="place" />
            </div>
            <input type="text" name="tournamentId" defaultValue="" hidden />
            <button type="submit">
                {isPending ? "Tworzenie..." : "Stwórz mecz"}
            </button>
        </form>
    );
}
