"use client";
import { IPlayerDetails } from "@/types/IPlayer";
import { useState } from "react";
import styles from "./radarChart.module.css";
import defStyles from "../chartsStyle.module.css";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
});

interface RadarChartProps {
    player: IPlayerDetails;
    position: string;
}

enum StatCategoryEnum {
    Attack = "Attack",
    Playmaking = "Playmaking",
    Defense = "Defense",
    Goalkeeper = "Goalkeeper",
}

const defineChartData = (
    player: IPlayerDetails,
    category: StatCategoryEnum
) => {
    switch (category) {
        case StatCategoryEnum.Goalkeeper:
            const playerGkStat = player.AvgPlayerStatsdetails.Goalkeeper;
            const teamGkStat = player.AvgTeammatesStatsdetails.Goalkeeper;
            return {
                categories: ["Czyste konta", "xp Stracone gole", "Interwencje"],
                series: [
                    {
                        name: "Zawodnik",
                        data: [
                            playerGkStat.cleanSheets,
                            playerGkStat.xpConcededGoals,
                            playerGkStat.interventions,
                        ],
                    },
                    {
                        name: "Śr. Drużyny",
                        data: [
                            teamGkStat.cleanSheets,
                            teamGkStat.xpConcededGoals,
                            teamGkStat.interventions,
                        ],
                    },
                ],
            };

        case StatCategoryEnum.Defense:
            const playerDefStat = player.AvgPlayerStatsdetails.Defense;
            const teamDefStat = player.AvgTeammatesStatsdetails.Defense;
            return {
                categories: [
                    "PojGł-",
                    "PojGł+",
                    "Poj-",
                    "Poj+",
                    "Faule",
                    "Przechwyty",
                ],
                series: [
                    {
                        name: "Zawodnik",
                        data: [
                            playerDefStat.headerDuels.lost,
                            playerDefStat.headerDuels.won,
                            playerDefStat.groundDuels.lost,
                            playerDefStat.groundDuels.won,
                            playerDefStat.fauls,
                            playerDefStat.interceptions,
                        ],
                    },
                    {
                        name: "Śr. Drużyny",
                        data: [
                            teamDefStat.headerDuels.lost,
                            teamDefStat.headerDuels.won,
                            teamDefStat.groundDuels.lost,
                            teamDefStat.groundDuels.won,
                            teamDefStat.fauls,
                            teamDefStat.interceptions,
                        ],
                    },
                ],
            };
        case StatCategoryEnum.Playmaking:
            const playerMidStat = player.AvgPlayerStatsdetails.Playmaking;
            const teamMidStat = player.AvgTeammatesStatsdetails.Playmaking;
            return {
                categories: [
                    "Asysty",
                    "xp Asysty",
                    "Szns",
                    "ProgPod",
                    "Doś-",
                    "Doś+",
                ],
                series: [
                    {
                        name: "Zawodnik",
                        data: [
                            playerMidStat.assists,
                            playerMidStat.xpAssists,
                            playerMidStat.createdChances,
                            playerMidStat.progressivePasses,
                            playerMidStat.crosses.failed,
                            playerMidStat.crosses.succeded,
                        ],
                    },
                    {
                        name: "Śr. Drużyny",
                        data: [
                            teamMidStat.assists,
                            teamMidStat.xpAssists,
                            teamMidStat.createdChances,
                            teamMidStat.progressivePasses,
                            teamMidStat.crosses.failed,
                            teamMidStat.crosses.succeded,
                        ],
                    },
                ],
            };
        case StatCategoryEnum.Attack:
            const playerFwdStat = player.AvgPlayerStatsdetails.Attack;
            const teamFwdStat = player.AvgTeammatesStatsdetails.Attack;
            return {
                categories: [
                    "Bramki",
                    "xpBramki",
                    "Strzały",
                    "Cel. Strzały",
                    "Pojedynki-",
                    "Pojedynki+",
                ],
                series: [
                    {
                        name: "Zawodnik",
                        data: [
                            playerFwdStat.goals,
                            playerFwdStat.xpGoal,
                            playerFwdStat.shots,
                            playerFwdStat.shotsOntarget,
                            playerFwdStat.offensiveDuels.lost,
                            playerFwdStat.offensiveDuels.won,
                        ],
                    },
                    {
                        name: "Śr. Drużyny",
                        data: [
                            teamFwdStat.goals,
                            teamFwdStat.xpGoal,
                            teamFwdStat.shots,
                            teamFwdStat.shotsOntarget,
                            teamFwdStat.offensiveDuels.lost,
                            teamFwdStat.offensiveDuels.won,
                        ],
                    },
                ],
            };
    }
};

export default function RadarChartCompare({
    player,
    position,
}: RadarChartProps) {
    const [category, setCategory] = useState(StatCategoryEnum.Defense);
    const chartData = defineChartData(player, category);

    const [state] = useState({
        series: chartData.series,
        options: {
            chart: {
                type: "radar",
                toolbar: { show: false },
                dropShadow: {
                    enabled: true,
                    top: 5,
                    left: 5,
                    blur: 5,
                    opacity: 0.2,
                },
                offsetX: 23,
            },
            stroke: { width: 2 },
            fill: {
                opacity: 0.2,
                colors: [getPositionColor(position), "#888"],
            },
            markers: {
                size: 2,
                colors: ["#fff"],
                strokeColors: getPositionColor(position),
                strokeWidth: 2,
            },
            yaxis: {
                min: 0,
                tickAmount: 3,
                labels: {
                    formatter: (val: number) => `${val}`,
                    style: { colors: "#ffffffff", fontSize: "12px" },
                },
            },
            xaxis: {
                categories: chartData.categories,
                labels: {
                    useHTML: true,
                    style: {
                        colors: "#333",
                        fontSize: "11px",
                        fontWeight: 500,
                    },
                },
            },
            tooltip: {
                y: { formatter: (val: number) => `${val.toFixed(2)}/mecz` },
                theme: "dark",
                style: {
                    background: getPositionColor(position),
                    color: "#fff",
                    fontSize: "12px",
                },
            },
            legend: {
                position: "bottom",
                horizontalAlign: "center",
                floating: false,
                fontSize: "14px",
                offsetY: -15,
                labels: {
                    colors: "#ffffffff",
                },
                markers: {
                    width: 10,
                    height: 10,
                    radius: 5,
                },
            },
            dataLabels: {
                enabled: false,
            },
            grid: {
                padding: {
                    bottom: 10,
                },
            },
        },
    });

    return (
        <div className={`${defStyles.chartWrapper} ${defStyles.squareWrapper}`}>
            <ReactApexChart
                options={state.options as any}
                series={state.series}
                type="radar"
                height={450}
                width={450}
            />
        </div>
    );
}

function getPositionColor(position: string) {
    switch (position) {
        case "Napastnik":
            return "#1e90ff";
        case "Pomocnik":
            return "#28a745";
        case "Obrońca":
            return "#ffb400";
        case "Bramkarz":
            return "#e63946";
        default:
            return "#888";
    }
}
