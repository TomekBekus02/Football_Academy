"use client";

import { IPlayerStatsHistory } from "@/types/IPlayer";
import dynamic from "next/dynamic";
import styles from "./columnChart.module.css";
import defStyles from "../chartsStyle.module.css";
import { useState } from "react";
import Image from "next/image";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
});

const defineChartData = (player: IPlayerStatsHistory[], position: string) => {
    const appearance = {
        history: player.map((p) => p.playerStats.appearances),
        color: "#105eacff",
    };
    const goal = {
        history: player.map((p) => p.playerStats.goals),
        color: "#117629ff",
    };
    const assist = {
        history: player.map((p) => p.playerStats.assists),
        color: "#6e3385ff",
    };
    const yellowCard = {
        history: player.map((p) => p.playerStats.yellowCards),
        color: "#b19110ff",
    };
    const redCard = {
        history: player.map((p) => p.playerStats.redCards),
        color: "#841f14ff",
    };
    const cleanSheet = {
        history: player.map((p) => p.playerStats.cleanSheets),
        color: "#4b7973ff",
    };
    const seriesData = [
        { name: "Występy", data: appearance.history },
        { name: "Bramki", data: goal.history },
        { name: "Asysty", data: assist.history },
        { name: "Żółte kartki", data: yellowCard.history },
        { name: "Czerwone kartki", data: redCard.history },
        { name: "Czyste konta", data: cleanSheet.history },
    ];
    let colorsData = [
        appearance.color,
        goal.color,
        assist.color,
        yellowCard.color,
        redCard.color,
        cleanSheet.color,
    ];
    let statIcons = ["👟", "⚽", "🎯", "🟨", "🟥", "🧤"];
    if (position === "Bramkarz") {
        colorsData = [
            appearance.color,
            assist.color,
            yellowCard.color,
            redCard.color,
            cleanSheet.color,
        ];
        statIcons = ["👟", "🎯", "🟨", "🟥", "🧤"];
    } else if (position === "Napastnik" || position === "Pomocnik") {
        colorsData = [
            appearance.color,
            goal.color,
            assist.color,
            yellowCard.color,
            redCard.color,
        ];
        statIcons = ["👟", "⚽", "🎯", "🟨", "🟥"];
    }

    const filteredSeries = seriesData.filter((stat) => {
        if (position === "Bramkarz") {
            return stat.name !== "Bramki";
        } else if (position === "Napastnik" || position === "Pomocnik") {
            return stat.name !== "Czyste konta";
        }
        return true;
    });
    return {
        seriesData: filteredSeries,
        colorsData: colorsData,
        statIcons: statIcons,
    };
};
export default function ColumnChart({
    player,
    position,
}: {
    player: IPlayerStatsHistory[];
    position: string;
}) {
    const teams = player.map((p) => p.team.logo);
    const chartData = defineChartData(player, position);
    const icons = chartData.statIcons;

    const [state] = useState<any>({
        series: chartData.seriesData,
        options: {
            chart: {
                type: "bar",
                height: 350,
            },
            colors: chartData.colorsData,
            legend: {
                position: "top",
                horizontalAlign: "center",
                fontSize: "14px",
                labels: { colors: "#ffffffff" },
                markers: {
                    radius: 12,
                },
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: "70%",
                    borderRadius: 5,
                    borderRadiusApplication: "end",
                },
            },
            dataLabels: {
                enabled: true,
            },
            stroke: {
                show: true,
                width: 3,
                colors: ["transparent"],
            },
            xaxis: {
                categories: teams,
                labels: {
                    style: { fontSize: "0px" },
                },
            },
            yaxis: {
                title: {
                    text: "Liczby gracza",
                    style: {
                        color: "#e0e0e0",
                        fontWeight: 600,
                        fontSize: 16,
                    },
                },
                labels: {
                    style: {
                        colors: "#b0b0b0",
                        fontSize: "14px",
                        fontWeight: 500,
                    },
                },
            },
            fill: {
                opacity: 1,
            },
            tooltip: {
                enabled: true,
                theme: "dark",
                y: {
                    formatter: (
                        val: any,
                        { seriesIndex }: { seriesIndex: number }
                    ) => {
                        return `${icons[seriesIndex]} ${val}`;
                    },
                },
            },
        },
    });

    return (
        <div className={`${defStyles.chartWrapper} ${styles.columnWrapper}`}>
            <ReactApexChart
                options={state.options}
                series={state.series}
                type="bar"
                height={500}
                width={900}
            />

            <div className={styles.teamImages}>
                {teams.map((team: any, i: number) => (
                    <Image
                        key={i}
                        src={team}
                        alt=""
                        className={`${styles.teamLogo} imageStyle`}
                        width={80}
                        height={80}
                    />
                ))}
            </div>
        </div>
    );
}
