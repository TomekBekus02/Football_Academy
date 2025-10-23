"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import defStyles from "../chartsStyle.module.css";
import styles from "./pieChart.module.css";
import { IPlayerDetails } from "@/types/IPlayer";
import { ITeamStats } from "@/types/ITeam";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
});
type piechartTypes = {
    player: IPlayerDetails;
    team: ITeamStats;
};
const defineChartData = (player: IPlayerDetails, team: ITeamStats) => {
    return {
        percentages: [
            Number(((player.appearances * 100) / team.matches || 0).toFixed(2)),
            Number(((player.goals * 100) / team.scoredGoals || 0).toFixed(2)),
            Number(((player.assists * 100) / team.assists || 0).toFixed(2)),
            Number(
                ((player.yellowCards * 100) / team.yellowCards || 0).toFixed(2)
            ),
            Number(((player.redCards * 100) / team.redCards || 0).toFixed(2)),
        ],
        teamStats: [
            team.matches,
            team.scoredGoals,
            team.assists,
            team.yellowCards,
            team.redCards,
        ],
        seriesData: [
            player.appearances,
            player.goals,
            player.assists,
            player.yellowCards,
            player.redCards,
        ],
    };
};

export default function PieChart({ player, team }: piechartTypes) {
    const chartData = defineChartData(player, team);

    const [state, setState] = useState({
        series: chartData.percentages,
        options: {
            chart: {
                type: "donut",
                width: "100%",
                offsetY: 11,
            },
            labels: [
                "Występy",
                "Bramki",
                "Asysty",
                "Żółte Kartki",
                "Czerwone Kartki",
            ],
            colors: [
                "#105eacff",
                "#117629ff",
                "#6e3385ff",
                "#b19110ff",
                "#841f14ff",
            ],
            tooltip: {
                style: {
                    fontSize: "16px",
                    fontWeight: "800",
                    color: "#d3d2d2ff",
                },
                y: {
                    formatter: (
                        val: any,
                        { seriesIndex }: { seriesIndex: number }
                    ) => {
                        return `
                            drużyny: ${chartData.teamStats[seriesIndex]} <br/>
                            zawodnika: ${chartData.seriesData[seriesIndex]} <br/>
                            procentowy udział: ${val}%
                        `;
                    },
                },
            },
            plotOptions: {
                pie: {
                    startAngle: -90,
                    endAngle: 90,
                    offsetY: 70,
                    donut: {
                        size: "45%",
                    },
                },
            },
            legend: {
                position: "bottom",
                horizontalAlign: "center",
                floating: false,
                fontSize: "14px",
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
                    bottom: -100,
                },
            },
        },
    });

    return (
        <div>
            <div
                className={`${defStyles.chartWrapper} ${defStyles.squareWrapper}`}
            >
                <ReactApexChart
                    options={state.options as any}
                    series={state.series}
                    type="donut"
                    width={500}
                />
            </div>
            <div id="html-dist"></div>
        </div>
    );
}
