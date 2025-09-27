import { Hammer, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { IMatchCompetition } from "@/types/ICompetition";
import { MatchStatus } from "@/types/IMatch";
import CompetitionLayout from "../competitionLabel.module.css";
import { useState } from "react";
import TeamDetails from "./teamDetails";
import { ChevronUp } from "lucide-react";
import CompetitionDetails from "../competitionDetails";
import TeamForm from "@/components/teamForm/teamForm";

type competitionProps = {
    matches: IMatchCompetition[];
};
export default function MatchLabel({ matches }: competitionProps) {
    const [openedId, setOpenedId] = useState("");
    return (
        <>
            {matches.map((m) => (
                <div
                    key={m._id}
                    onClick={() =>
                        m._id === openedId
                            ? setOpenedId("")
                            : setOpenedId(m._id)
                    }
                    className={CompetitionLayout.accordionItem}
                >
                    <div
                        className={`${CompetitionLayout.accordionTitle} ${
                            openedId === m._id ? CompetitionLayout.selected : ""
                        }`}
                    >
                        <div className={CompetitionLayout.teamsBox}>
                            <div>
                                <TeamDetails
                                    name={m.homeTeamId.name}
                                    logo={m.homeTeamId.logo}
                                    isHomeTeam={true}
                                />
                            </div>
                            <div className={CompetitionLayout.scoreBox}>
                                {m.matchStatus !== MatchStatus.CREATED ? (
                                    <h1>
                                        {m.homeTeamScore}:{m.awayTeamScore}
                                    </h1>
                                ) : (
                                    <h3>VS</h3>
                                )}
                            </div>
                            <div>
                                <TeamDetails
                                    name={m.awayTeamId.name}
                                    logo={m.awayTeamId.logo}
                                    isHomeTeam={false}
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
                            <div>
                                <CompetitionDetails
                                    label="Status: "
                                    text={
                                        m.matchStatus === MatchStatus.FINISHED
                                            ? "Roztrzygnięty"
                                            : "Nieroztrzygnięty"
                                    }
                                />
                                <CompetitionDetails
                                    label="Data: "
                                    text={m.matchDate}
                                />
                                <CompetitionDetails
                                    label="Godzina: "
                                    text={m.matchHour}
                                />
                                <CompetitionDetails
                                    label="Miejsce: "
                                    text={m.place}
                                />
                            </div>
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
                                            IconSize={35}
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
                                            IconSize={35}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={CompetitionLayout.buttonBox}>
                                <div>
                                    <button className="buttonStyle editBtn">
                                        <Link href={`/admin/mecz/${m._id}`}>
                                            <Hammer />
                                        </Link>
                                    </button>
                                    <button className="buttonStyle deleteBtn">
                                        <Trash />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </>
    );
}
