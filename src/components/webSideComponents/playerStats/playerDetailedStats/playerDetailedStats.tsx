import { IPlayerDetails } from "@/types/IPlayer";
import TableStatCategory from "./tableStatCategory/tableStatCategory";

export default function PlayerDetailedStats({
    player,
}: {
    player: IPlayerDetails;
}) {
    const offStat = player.AvgPlayerStatsdetails.Attack;
    const offCategories = [
        {
            shortName: "Br",
            extName: "Bramki",
            value: offStat.goals,
        },
        {
            shortName: "xpBr",
            extName: "xp Bramki",
            value: offStat.xpGoal,
        },
        {
            shortName: "strz",
            extName: "Strzały",
            value: offStat.shots,
        },
        {
            shortName: "strz+",
            extName: "Strzały celne",
            value: offStat.shotsOntarget,
        },
        {
            shortName: "poj+",
            extName: "Pojedynki wygrane",
            value: offStat.offensiveDuels.won,
        },
        {
            shortName: "poj-",
            extName: "Pojedynki przegrane",
            value: offStat.offensiveDuels.lost,
        },
    ];

    const midStat = player.AvgPlayerStatsdetails.Playmaking;
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
            value: midStat.createdChances,
        },
        {
            shortName: "Pod%",
            extName: "Procent celnych podań",
            value: midStat.passAccuracy,
        },
        {
            shortName: "PodDł",
            extName: "Udane Długie Podania",
            value: midStat.longPassAccuracy,
        },
        {
            shortName: "ProPod",
            extName: "Progresywne podania",
            value: midStat.progressivePasses,
        },
        {
            shortName: "Doś-",
            extName: "Niecelne Dośrodkowania",
            value: midStat.crosses.failed,
        },
        {
            shortName: "Doś+",
            extName: "Celne Dośrodkowania",
            value: midStat.crosses.succeded,
        },
    ];

    const defStat = player.AvgPlayerStatsdetails.Defense;
    const defCategories = [
        {
            shortName: "CS",
            extName: "Czyste Konta",
            value: defStat.cleanSheets,
        },
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
            value: defStat.headerDuels.lost,
        },
        {
            shortName: "PojGł+",
            extName: "Wygrane Pojedynki Główkowe",
            value: defStat.headerDuels.won,
        },
        {
            shortName: "Poj-",
            extName: "Przegrane Pojedynki na ziemi",
            value: defStat.groundDuels.lost,
        },
        {
            shortName: "Poj+",
            extName: "Wygrane Pojedynki na ziemi",
            value: defStat.groundDuels.won,
        },
        {
            shortName: "Faul",
            extName: "Faule",
            value: defStat.fauls,
        },
        {
            shortName: "Prze",
            extName: "Udane Przechwyty",
            value: defStat.interceptions,
        },
    ];

    const gkStat = player.AvgPlayerStatsdetails.Goalkeeper;
    const GKCategories = [
        {
            shortName: "CS",
            extName: "Meczy bez utraty bramki",
            value: gkStat.cleanSheets,
        },
        {
            shortName: "xpGA",
            extName: "xp Stracone Bramki",
            value: gkStat.xpConcededGoals,
        },
        {
            shortName: "Obr%",
            extName: "Procent udanych interwencji",
            value: gkStat.saveSuccessRate,
        },
        {
            shortName: "Obr",
            extName: "Udane interwencje",
            value: gkStat.interventions,
        },
    ];
    return (
        <div style={{ display: "flex" }}>
            {player.position !== "Bramkarz" && (
                <TableStatCategory
                    categories={offCategories}
                    captionText="Ø Statystyki Ofensywne"
                    position="off"
                />
            )}
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
            {player.position === "Bramkarz" && (
                <TableStatCategory
                    categories={GKCategories}
                    captionText="Ø Statystyki Bramkarza"
                    position="gk"
                />
            )}
        </div>
    );
}
