import { Hammer, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { IMatchCompetition } from "@/types/ICompetition";
import { MatchStatus } from "@/types/IMatch";

type competitionProps = {
    matches: IMatchCompetition[];
};
export default function MatchLabel({ matches }: competitionProps) {
    return (
        <>
            {matches.map((m) => (
                <div key={m._id}>
                    <div>
                        <p>{m.matchDate}</p>
                        <p>{m.matchHour}</p>
                        <p>{m.place}</p>
                    </div>
                    <div>
                        <div>
                            <Image
                                src={m.homeTeamId.logo}
                                alt={m.homeTeamId.name}
                                width={150}
                                height={120}
                                className="imageStyle"
                            ></Image>
                            <p>{m.homeTeamId.name}</p>
                        </div>
                    </div>
                    {m.matchStatus !== MatchStatus.CREATED ? (
                        <h1>
                            {m.homeTeamScore}:{m.awayTeamScore}
                        </h1>
                    ) : (
                        <h1>VS</h1>
                    )}
                    <div>
                        <div>
                            <Image
                                src={m.awayTeamId.logo}
                                alt={m.awayTeamId.name}
                                width={150}
                                height={120}
                                className="imageStyle"
                            ></Image>
                            <p>{m.awayTeamId.name}</p>
                        </div>
                    </div>
                    <div>
                        <button>
                            <Link href={`/admin/mecz/${m._id}`}>
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
