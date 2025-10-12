"use client";
import { IPlayerDetails } from "@/types/IPlayer";
import { useState } from "react";
import styles from "./radarChart.module.css";
import dynamic from "next/dynamic";

// dynamic import dla Next.js (SSR)
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
});

interface RadarChartProps {
    player: any;
    position: string;
}
export default function RadarChart({ player, position }: RadarChartProps) {
    const calculateRatios = (player: IPlayerDetails) => {
        const playerStat = player.AvgPlayerStatsdetails;
        const passAccRatio = playerStat.Playmaking.passAccuracy;
        const longPassRatio = playerStat.Playmaking.longPassAccuracy;
        const shotsAccRatio =
            playerStat.Attack.shots > 0
                ? Math.floor(
                      (playerStat.Attack.shotsOntarget /
                          playerStat.Attack.shots) *
                          100
                  )
                : 0;
        const offDuels =
            playerStat.Attack.offensiveDuels.won +
            playerStat.Attack.offensiveDuels.lost;
        const offDuelsRatio =
            offDuels > 0
                ? Math.floor(
                      (playerStat.Attack.offensiveDuels.won / offDuels) * 100
                  )
                : 0;

        const taklesAttemps =
            playerStat.Defense.interceptions + playerStat.Defense.fauls;
        const taklesRatio =
            taklesAttemps > 0
                ? Math.floor(
                      (playerStat.Defense.interceptions / taklesAttemps) * 100
                  )
                : 0;

        const defDuels =
            playerStat.Defense.groundDuels.lost +
            playerStat.Defense.groundDuels.won +
            playerStat.Defense.headerDuels.won +
            playerStat.Defense.headerDuels.lost;
        const defDuelsRatio =
            defDuels > 0
                ? Math.floor(
                      ((playerStat.Defense.groundDuels.won +
                          playerStat.Defense.headerDuels.won) /
                          defDuels) *
                          100
                  )
                : 0;

        return {
            passAccRatio,
            longPassRatio,
            shotsAccRatio,
            offDuelsRatio,
            taklesRatio,
            defDuelsRatio,
        };
    };

    const {
        passAccRatio,
        longPassRatio,
        shotsAccRatio,
        offDuelsRatio,
        taklesRatio,
        defDuelsRatio,
    } = calculateRatios(player);
    const [state] = useState({
        series: [
            {
                name: "Statystyki",
                data: [
                    passAccRatio,
                    longPassRatio,
                    shotsAccRatio,
                    offDuelsRatio,
                    taklesRatio,
                    defDuelsRatio,
                ],
            },
        ],
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
            },
            title: {
                text: "Bilans statystyk",
                style: {
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#d3d2d2ff",
                },
            },
            stroke: { width: 2 },
            fill: {
                opacity: 0.2,
                colors: [getPositionColor(position)],
            },
            markers: {
                size: 4,
                colors: ["#fff"],
                strokeColors: getPositionColor(position),
                strokeWidth: 2,
            },
            yaxis: {
                min: 0,
                max: 100,
                tickAmount: 5,
                labels: {
                    formatter: (val: number) => `${val}%`,
                    style: { colors: "#ffffffff", fontSize: "12px" },
                },
            },
            xaxis: {
                categories: [
                    "%Podań",
                    "%Długich Podań",
                    "%Celnych Strzałów",
                    "%Off Pojedynków",
                    "%Odbiorów",
                    "%Def Pojedynków",
                ],
                labels: {
                    style: {
                        colors: "#333",
                        fontSize: "12px",
                        fontWeight: 500,
                    },
                },
            },
            tooltip: {
                y: { formatter: (val: number) => `${val.toFixed(2)}%` },
                theme: "dark",
                style: {
                    background: getPositionColor(position),
                    color: "#fff",
                    fontSize: "12px",
                },
            },
        },
    });

    return (
        <div className={styles.chartWrapper}>
            <ReactApexChart
                options={state.options as any}
                series={state.series}
                type="radar"
                height={490}
                width={500}
            />
        </div>
    );
}

// Funkcja do kolorów wg pozycji
function getPositionColor(position: string) {
    switch (position) {
        case "Napastnik":
            return "#1e90ff"; // niebieski
        case "Pomocnik":
            return "#28a745"; // zielony
        case "Obrońca":
            return "#ffb400"; // żółto-pomarańczowy
        case "Bramkarz":
            return "#e63946"; // czerwony
        default:
            return "#888"; // szary fallback
    }
}
