import { Hammer, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { IMatchCompetition } from "@/types/ICompetition";
import { resultIcon } from "@/components/eventTypeIcons";

type competitionProps = {
    comp: IMatchCompetition;
};
export default function MatchLabel({ comp }: competitionProps) {
    return (
        <div style={{ display: "flex" }}>
            <div style={{ display: "flex" }}>
                {!comp.isOngoing
                    ? resultIcon(
                          comp.TeamDetails.homeTeamScore,
                          comp.TeamDetails.awayTeamScore
                      )
                    : null}
                <div>
                    <Image
                        src={comp.TeamDetails.homeTeamId.logo}
                        alt={comp.TeamDetails.homeTeamId.name}
                        width={150}
                        height={120}
                    ></Image>
                    <p>{comp.TeamDetails.homeTeamId.name}</p>
                </div>
            </div>
            <h1>
                {comp.TeamDetails.homeTeamScore}:
                {comp.TeamDetails.awayTeamScore}
            </h1>
            <div style={{ display: "flex" }}>
                <div>
                    <Image
                        src={comp.TeamDetails.awayTeamId.logo}
                        alt={comp.TeamDetails.awayTeamId.name}
                        width={150}
                        height={120}
                    ></Image>
                    <p>{comp.TeamDetails.awayTeamId.name}</p>
                </div>
                {!comp.isOngoing
                    ? resultIcon(
                          comp.TeamDetails.awayTeamScore,
                          comp.TeamDetails.homeTeamScore
                      )
                    : null}
            </div>
            <div>
                <button>
                    <Link href={`/admin/mecz/${comp.competitionId}`}>
                        <Hammer /> Zarządzaj
                    </Link>
                </button>
                <button>
                    <Trash /> Usuń
                </button>
            </div>
        </div>
    );
}
