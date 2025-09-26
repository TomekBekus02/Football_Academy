import { ITournamentCompetition } from "@/types/ICompetition";
import { Hammer, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
type competitionProps = {
    tournaments: ITournamentCompetition[];
};
export default function TournamentLabel({ tournaments }: competitionProps) {
    return (
        <>
            {tournaments.map((t) => (
                <div key={t._id}>
                    <Image
                        src="/tournament_Icon.png"
                        alt="Trophy Icon"
                        width={110}
                        height={100}
                        className="imageStyle"
                    />
                    <div>
                        <h4>
                            {t.date} {t.hour}
                        </h4>
                        <h1>{t.title}</h1>
                    </div>
                    <div>
                        <button>
                            <Link href={`/admin/tournament/${t._id}`}>
                                <Hammer /> Zarządzaj
                            </Link>
                        </button>
                        <button>
                            <Trash /> Usuń
                        </button>
                    </div>
                </div>
            ))}
        </>
    );
}
