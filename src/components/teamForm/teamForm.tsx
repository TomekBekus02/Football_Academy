import { matchResultIcon } from "@/components/eventTypeIcons";
import { IshortTeamInfo, ITeamsForm } from "@/types/ITeam";
import Link from "next/link";
import teamFormLayout from "./teamForm.module.css";
import "@/styles/toolTip.css";

const getTeamPerspectiveIcon = (
    homeTeam: IshortTeamInfo,
    awayTeam: IshortTeamInfo,
    teamId: string,
    IconSize: number
) => {
    if (homeTeam.id == teamId) {
        return matchResultIcon(
            homeTeam.score,
            homeTeam.penalties,
            awayTeam.score,
            awayTeam.penalties,
            IconSize
        );
    } else {
        return matchResultIcon(
            awayTeam.score,
            awayTeam.penalties,
            homeTeam.score,
            homeTeam.penalties,
            IconSize
        );
    }
};
type teamFormType = {
    teamId: string;
    form: Array<ITeamsForm>;
    IconSize: number;
};
export default function TeamForm({ teamId, form, IconSize }: teamFormType) {
    return form.length > 0 ? (
        <div>
            {form.map((m, index) => {
                return (
                    <Link
                        href={`/admin/mecz/${m.matchId}`}
                        key={index}
                        className={`toolTip ${teamFormLayout.icon}`}
                    >
                        {getTeamPerspectiveIcon(
                            m.homeTeam,
                            m.awayTeam,
                            teamId,
                            IconSize
                        )}
                        <span
                            className={`toolTipText ${teamFormLayout.textTip}`}
                        >
                            <p>{`${m.homeTeam.score}:${m.awayTeam.score} (${m.homeTeam.name} - ${m.awayTeam.name})`}</p>
                            <p>{`${m.matchDate}`}</p>
                        </span>
                    </Link>
                );
            })}
        </div>
    ) : (
        " - "
    );
}
