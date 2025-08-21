import fetchTeams from "@/services/TeamsFetches/useTeams";
import InputTeamsOption from "@/components/inputTeamsOption/inputTeamsOption";
import { ITeam } from "@/types/ITeam";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function createMatch() {
    return (
        <form>
            <div>
                <InputTeamsOption
                    selectName="homeTeamId"
                    labelText="Gospodarz"
                />
                <InputTeamsOption selectName="awayTeamId" labelText="Gość" />
            </div>
            <input type="hidden" name="label" value="match" />
        </form>
    );
}
