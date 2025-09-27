import { ITournamentCompetition } from "@/types/ICompetition";
import { Hammer, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CompetitionLayout from "../competitionLabel.module.css";
import { useState } from "react";
import { ChevronUp } from "lucide-react";

type competitionProps = {
    tournaments: ITournamentCompetition[];
};

export default function TournamentLabel({ tournaments }: competitionProps) {
    const [openedId, setOpenedId] = useState("");
    return (
        <>
            {tournaments.map((t) => (
                <div
                    key={t._id}
                    onClick={() =>
                        t._id === openedId
                            ? setOpenedId("")
                            : setOpenedId(t._id)
                    }
                    className={CompetitionLayout.accordionItem}
                >
                    <div
                        className={`${CompetitionLayout.accordionTitle} ${
                            openedId === t._id ? CompetitionLayout.selected : ""
                        }`}
                    >
                        <div className={CompetitionLayout.competitionName}>
                            <Image
                                src="/tournament_Icon.png"
                                alt="Trophy Icon"
                                width={75}
                                height={65}
                                className="imageStyle"
                            />
                            <h1>{t.title}</h1>
                        </div>
                        <ChevronUp
                            className={`${CompetitionLayout.accordionIcon} ${
                                openedId === t._id
                                    ? CompetitionLayout.accordionIconActive
                                    : null
                            }`}
                            size={30}
                        />
                    </div>
                    {openedId === t._id && (
                        <div className={CompetitionLayout.accordionContent}>
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
                    )}
                </div>
            ))}
        </>
    );
}
