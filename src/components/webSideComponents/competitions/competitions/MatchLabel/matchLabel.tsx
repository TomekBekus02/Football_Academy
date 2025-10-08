import { Hammer, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { IMatchCompetition } from "@/types/ICompetition";
import { MatchStatus } from "@/types/IMatch";
import CompetitionLayout from "../competitionLabel.module.css";
import { useState } from "react";
import TeamDetails from "./teamDetails/teamDetails";
import { ChevronUp } from "lucide-react";
import CompetitionDetails from "../competitionDetails";
import TeamForm from "@/components/teamForm/teamForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMatch } from "@/services/MatchFetches/useMatch";

type competitionProps = {
    matches: IMatchCompetition[];
    isAdmin: boolean;
};
export default function MatchLabel({ matches, isAdmin }: competitionProps) {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: deleteMatch,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["competitions"] });
            queryClient.invalidateQueries({ queryKey: ["match"] });
            queryClient.invalidateQueries({ queryKey: ["teams"] });
        },
    });
    const [openedId, setOpenedId] = useState("");
    return (
        <>
            {matches.map((m) => (
                <div key={m._id} className={CompetitionLayout.accordionItem}>
                    <div
                        onClick={() =>
                            m._id === openedId
                                ? setOpenedId("")
                                : setOpenedId(m._id)
                        }
                        className={`${CompetitionLayout.accordionTitle} ${
                            openedId === m._id ? CompetitionLayout.selected : ""
                        }`}
                    >
                        <div className={CompetitionLayout.teamsBox}>
                            <div>
                                <TeamDetails
                                    teamId={m.homeTeamId._id}
                                    name={m.homeTeamId.name}
                                    logo={m.homeTeamId.logo}
                                    isHomeTeam={true}
                                    homeTeamScore={m.homeTeamScore}
                                    awayTeamScore={m.awayTeamScore}
                                    matchStatus={m.matchStatus}
                                />
                            </div>
                            <div className={CompetitionLayout.scoreBox}>
                                <Link
                                    href={
                                        !isAdmin
                                            ? `/rozgrywki/mecz/${m._id}`
                                            : ``
                                    }
                                >
                                    {m.matchStatus !== MatchStatus.CREATED ? (
                                        <h1>
                                            {m.homeTeamScore}:{m.awayTeamScore}
                                        </h1>
                                    ) : (
                                        <h3>VS</h3>
                                    )}
                                </Link>
                                {m.matchStatus === MatchStatus.IN_PROGRESS && (
                                    <div
                                        className={CompetitionLayout.liveDot}
                                    ></div>
                                )}
                            </div>
                            <div>
                                <TeamDetails
                                    teamId={m.awayTeamId._id}
                                    name={m.awayTeamId.name}
                                    logo={m.awayTeamId.logo}
                                    isHomeTeam={false}
                                    homeTeamScore={m.homeTeamScore}
                                    awayTeamScore={m.awayTeamScore}
                                    matchStatus={m.matchStatus}
                                />
                            </div>
                        </div>
                        <ChevronUp
                            className={`${CompetitionLayout.accordionIcon} ${
                                openedId === m._id
                                    ? CompetitionLayout.accordionIconActive
                                    : null
                            }`}
                            size={30}
                        />
                    </div>
                    {openedId === m._id && (
                        <div className={CompetitionLayout.accordionContent}>
                            <CompetitionDetails
                                isFinished={
                                    m.matchStatus === MatchStatus.FINISHED
                                }
                                textDate={m.matchDate}
                                textHour={m.matchHour}
                                textPlace={m.place}
                            />

                            <div style={{ textAlign: "center" }}>
                                <h3>Forma</h3>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <Image
                                        src={m.homeTeamId.logo}
                                        alt={m.homeTeamId.name}
                                        width={60}
                                        height={60}
                                        className="imageStyle"
                                    />
                                    <div
                                        style={{
                                            textAlign: "center",
                                            gap: "2px",
                                        }}
                                    >
                                        <TeamForm
                                            teamId={m.homeTeamId._id}
                                            form={m.homeTeamId.form}
                                            IconSize={30}
                                        />
                                    </div>
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <Image
                                        src={m.awayTeamId.logo}
                                        alt={m.awayTeamId.name}
                                        width={60}
                                        height={60}
                                        className="imageStyle"
                                    />
                                    <div style={{ textAlign: "center" }}>
                                        <TeamForm
                                            teamId={m.awayTeamId._id}
                                            form={m.awayTeamId.form}
                                            IconSize={30}
                                        />
                                    </div>
                                </div>
                            </div>
                            {isAdmin ? (
                                <div className={CompetitionLayout.buttonBox}>
                                    <div>
                                        <Link href={`/admin/mecz/${m._id}`}>
                                            <button className="buttonStyle editBtn">
                                                <Hammer />
                                            </button>
                                        </Link>
                                        <button
                                            className="buttonStyle deleteBtn"
                                            onClick={() =>
                                                mutate({
                                                    competitionId:
                                                        m.competitionId,
                                                    matchId: m._id,
                                                })
                                            }
                                        >
                                            <Trash />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <p>there will be head-to-head record</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            ))}
        </>
    );
}
