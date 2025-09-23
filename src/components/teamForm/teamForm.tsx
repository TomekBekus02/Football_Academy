import { matchResultIcon } from "@/components/eventTypeIcons";
import { IshortTeamInfo, ITeamsForm } from "@/types/ITeam";
import Link from "next/link";
import teamFormLayout from "./teamForm.module.css";
import "@/styles/toolTip.css";

const getTeamPerspectiveIcon = (
    homeTeam: IshortTeamInfo,
    awayTeam: IshortTeamInfo,
    teamId: string,
    IconWidth: number
) => {
    if (homeTeam.id == teamId) {
        return matchResultIcon(
            homeTeam.score,
            homeTeam.penScore,
            awayTeam.score,
            awayTeam.penScore,
            IconWidth
        );
    } else {
        return matchResultIcon(
            awayTeam.score,
            awayTeam.penScore,
            homeTeam.score,
            homeTeam.penScore,
            IconWidth
        );
    }
};
type teamFormType = {
    teamId: string;
    form: Array<ITeamsForm>;
    IconWidth: number;
};
export default function TeamForm({ teamId, form, IconWidth }: teamFormType) {
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
                            IconWidth
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
