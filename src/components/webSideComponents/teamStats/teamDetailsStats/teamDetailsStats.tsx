import { IAvgTeamStats } from "@/types/ITeam";
import TableStatCategory from "../../playerStats/playerDetailedStats/tableStatCategory/tableStatCategory";

export default function TeamDetailsStats({ team }: { team: IAvgTeamStats }) {
    const offStat = team.offense;
    const offCategories = [
        {
            shortName: "Br",
            extName: "Bramki",
            value: offStat.goals,
        },
        {
            shortName: "xpBr",
            extName: "xp Bramki",
            value: offStat.xpGoals,
        },
        {
            shortName: "strz",
            extName: "Strzały",
            value: offStat.shoots,
        },
        {
            shortName: "strz+",
            extName: "Strzały celne",
            value: offStat.shotsOnTarget,
        },
        {
            shortName: "poj+",
            extName: "Pojedynki wygrane",
            value: offStat.duelsWon,
        },
        {
            shortName: "poj-",
            extName: "Pojedynki przegrane",
            value: offStat.duelsLost,
        },
    ];
    const midStat = team.playmaking;
    const MidCategories = [
        {
            shortName: "Ast",
            extName: "Asysty",
            value: midStat.assists,
        },
        {
            shortName: "xAst",
            extName: "xp Asysty",
            value: midStat.xpAssists,
        },
        {
            shortName: "Szns",
            extName: "Stworzone Szanse",
            value: midStat.createdChance,
        },
        {
            shortName: "Pod%",
            extName: "Procent celnych podań",
            value: 87,
        },
        {
            shortName: "Pos%",
            extName: "Procent Posiadania Piłki",
            value: 55,
        },
        {
            shortName: "ProPod",
            extName: "Progresywne podania",
            value: midStat.progressivePasses,
        },
        {
            shortName: "Doś-",
            extName: "Niecelne Dośrodkowania",
            value: midStat.failedCrosses,
        },
        {
            shortName: "Doś+",
            extName: "Celne Dośrodkowania",
            value: midStat.successCrosses,
        },
    ];
    const defStat = team.deffense;
    const defCategories = [
        {
            shortName: "Żk",
            extName: "Żółte kartki",
            value: defStat.yellowCards,
        },
        {
            shortName: "Czk",
            extName: "Czerwone kartki",
            value: defStat.redCards,
        },
        {
            shortName: "PojGł-",
            extName: "Przegrane Pojedynki Główkowe",
            value: defStat.airDuelsLost,
        },
        {
            shortName: "PojGł+",
            extName: "Wygrane Pojedynki Główkowe",
            value: defStat.airDuelsWon,
        },
        {
            shortName: "Poj-",
            extName: "Przegrane Pojedynki na ziemi",
            value: defStat.groundDuelsLost,
        },
        {
            shortName: "Poj+",
            extName: "Wygrane Pojedynki na ziemi",
            value: defStat.groundDuelsWon,
        },
        {
            shortName: "Faul",
            extName: "Faule",
            value: defStat.fauls,
        },
    ];
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
            }}
        >
            <TableStatCategory
                categories={offCategories}
                captionText="Ø Statystyki Ofensywne"
                position="off"
            />
            <TableStatCategory
                categories={MidCategories}
                captionText="Ø Statystyki Rozgrywania"
                position="mid"
            />
            <TableStatCategory
                categories={defCategories}
                captionText="Ø Statystyki Defensywne"
                position="def"
            />
        </div>
    );
}
