import { fetchTeams } from "@/services/TeamsFetches/useTeams";
import { ITeam } from "@/types/ITeam";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";

type InputTeamsOptionProps = {
    selectName: string;
    labelText: string;
};

export default function inputTeamsOption({
    selectName,
    labelText,
}: InputTeamsOptionProps) {
    const {
        data: teamsData,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["teams"],
        queryFn: fetchTeams,
    });
    if (isLoading) return <h1>Ładowanie...</h1>;
    if (error) return <h1>Błąd: {error.message}</h1>;
    return (
        <div>
            <label>{labelText}</label>
            <select name={selectName}>
                {teamsData!.length > 0 ? (
                    teamsData.map((team: ITeam) => {
                        return (
                            <option value={team._id} key={team._id}>
                                {team.name}
                            </option>
                        );
                    })
                ) : (
                    <option value="">Brak Drużyn</option>
                )}
            </select>
        </div>
    );
}
