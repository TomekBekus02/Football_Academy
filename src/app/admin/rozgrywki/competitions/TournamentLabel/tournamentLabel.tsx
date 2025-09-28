import { ITournamentCompetition } from "@/types/ICompetition";
import { Hammer, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CompetitionLayout from "../competitionLabel.module.css";
import { useState } from "react";
import { ChevronUp, Medal } from "lucide-react";
import CompetitionDetails from "../competitionDetails";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTournament } from "@/services/TournamentFetches/useTournament";

type competitionProps = {
    tournaments: ITournamentCompetition[];
};

export default function TournamentLabel({ tournaments }: competitionProps) {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: deleteTournament,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["competitions"] });
            queryClient.invalidateQueries({ queryKey: ["match"] });
            queryClient.invalidateQueries({ queryKey: ["teams"] });
        },
    });
    const [openedId, setOpenedId] = useState("");
    return (
        <>
            {tournaments.map((tournament) => {
                const t = tournament.TournamentDetails;
                return (
                    <div
                        key={t._id}
                        className={CompetitionLayout.accordionItem}
                    >
                        <div
                            className={`${CompetitionLayout.accordionTitle} ${
                                openedId === t._id
                                    ? CompetitionLayout.selected
                                    : ""
                            }`}
                            onClick={() =>
                                t._id === openedId
                                    ? setOpenedId("")
                                    : setOpenedId(t._id)
                            }
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
                                className={`${
                                    CompetitionLayout.accordionIcon
                                } ${
                                    openedId === t._id
                                        ? CompetitionLayout.accordionIconActive
                                        : null
                                }`}
                                size={30}
                            />
                        </div>
                        {openedId === t._id && (
                            <div className={CompetitionLayout.accordionContent}>
                                <CompetitionDetails
                                    isFinished={!t.isOnGoing}
                                    textDate={t.date}
                                    textHour={t.hour}
                                    textPlace={t.place}
                                />
                                <div style={{ textAlign: "center" }}>
                                    <h2>Uczestnicy</h2>
                                    <div
                                        className={
                                            CompetitionLayout.participantsBox
                                        }
                                    >
                                        {t.participants.map((team, index) => (
                                            <Image
                                                src={team.logo}
                                                alt=""
                                                key={index}
                                                width={70}
                                                height={65}
                                                className={`imageStyle ${CompetitionLayout.accordionImgBox}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                                {true ? (
                                    <div
                                        className={CompetitionLayout.buttonBox}
                                    >
                                        <div>
                                            <button className="buttonStyle editBtn">
                                                <Link
                                                    href={`/admin/tournament/${t._id}`}
                                                >
                                                    <Hammer />
                                                </Link>
                                            </button>
                                            <button
                                                className="buttonStyle deleteBtn"
                                                onClick={() =>
                                                    mutate({
                                                        competitionId:
                                                            tournament.competitionId,
                                                        tournamentId: t._id,
                                                    })
                                                }
                                            >
                                                <Trash />
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div
                                        className={CompetitionLayout.buttonBox}
                                    >
                                        <h2>
                                            <Medal />
                                            Zwycięzca:
                                            <div
                                                style={{ textAlign: "center" }}
                                            >
                                                {t.winnerId ? (
                                                    <>
                                                        <Image
                                                            src={
                                                                t.winnerId.logo
                                                            }
                                                            alt={
                                                                t.winnerId.name
                                                            }
                                                            width={70}
                                                            height={65}
                                                            className={`imageStyle ${CompetitionLayout.accordionImgBox}`}
                                                        />
                                                        <p>{t.winnerId.name}</p>
                                                    </>
                                                ) : (
                                                    <h1>-</h1>
                                                )}
                                            </div>
                                        </h2>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                );
            })}
        </>
    );
}
