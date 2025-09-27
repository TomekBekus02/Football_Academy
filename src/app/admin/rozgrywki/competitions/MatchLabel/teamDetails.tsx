import Image from "next/image";
import CompetitionLayout from "./teamDetails.module.css";

type TeamDetailsProps = {
    name: string;
    logo: string;
    isHomeTeam: boolean;
};

export default function TeamDetails({
    name,
    logo,
    isHomeTeam,
}: TeamDetailsProps) {
    return (
        <div
            className={`${CompetitionLayout.competitionName}
            } ${isHomeTeam ? CompetitionLayout.homeTeam : null}`}
        >
            <Image
                src={logo}
                alt={name}
                width={75}
                height={65}
                className="imageStyle"
            ></Image>
            <h2>{name}</h2>
        </div>
    );
}
