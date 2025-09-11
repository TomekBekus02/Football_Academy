import { ITournamentCompetition } from "@/types/ICompetition";
import { Hammer, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
type competitionProps = {
    comp: ITournamentCompetition;
};
export default function TournamentLabel({ comp }: competitionProps) {
    return (
        <div
            style={{
                display: "flex",
                border: "1px solid black",
                padding: "5px",
            }}
        >
            <Image
                src="/tournament_Icon.png"
                alt="Trophy Icon"
                width={110}
                height={100}
            />
            <div>
                <h4>
                    {comp.TournamentDetails.date} {comp.TournamentDetails.hour}
                </h4>
                <h1>{comp.TournamentDetails.title}</h1>
            </div>

            <div>
                <button>
                    <Link href={`/admin/tournament/${comp.competitionId}`}>
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
