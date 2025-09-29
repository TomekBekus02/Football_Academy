import LoadProvider from "@/components/LoadProvider/LoadProvider";
import { fetchTeams } from "@/services/TeamsFetches/useTeams";
import { ITeam } from "@/types/ITeam";
import { useQuery } from "@tanstack/react-query";
import inputLayout from "@/components/inputTemplate/inputTemplate.module.css";

type InputTeamsOptionProps = {
    selectName: string;
    labelText: string;
};

export default function InputTeamsOption({
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

    return (
        <LoadProvider error={error} isLoading={isLoading}>
            <div className={inputLayout.inputGroup}>
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
                <label>{labelText}</label>
            </div>
        </LoadProvider>
    );
}
