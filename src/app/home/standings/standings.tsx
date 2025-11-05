"use client";
import {
    Swords,
    CircleX,
    Trophy,
    Handshake,
    Volleyball,
    Hand,
    Footprints,
    Diff,
} from "lucide-react";
import classes from "./standings.module.css";
import Card from "./card/card";
import { statIcons } from "@/components/icons/matchIcons";
import mainStyles from "../main-page.module.css";
import { useQuery } from "@tanstack/react-query";
import { fetchTeamDetails } from "@/services/TeamsFetches/useTeams";
import LoadProvider from "@/components/LoadProvider/LoadProvider";
import { ITeam } from "@/types/ITeam";

export default function standings() {
    const { data, isLoading, error } = useQuery<ITeam>({
        queryKey: ["teams"],
        queryFn: () => fetchTeamDetails("689a4c7170a41052e449061b"),
    });
    return (
        <LoadProvider isLoading={isLoading} error={error}>
            <div className={classes.standingsBox}>
                <h1 className={mainStyles.title}>Statystyki Klubu</h1>
                <div className={classes.cardsBox}>
                    <Card
                        title="Mecze"
                        icon={statIcons.match}
                        values={data ? data.matches : "N/D"}
                    />
                    <Card
                        title="Zwycięstwa"
                        icon={statIcons.win}
                        values={data ? data.wins : "N/D"}
                    />
                    <Card
                        title="Remisy"
                        icon={statIcons.draw}
                        values={data ? data.draws : "N/D"}
                    />
                    <Card
                        title="Porażki"
                        icon={statIcons.lose}
                        values={data ? data.loses : "N/D"}
                    />

                    <Card
                        title="Czyste konta"
                        icon={statIcons.cleanSheet}
                        values={data ? data.cleanSheets : "N/D"}
                    />
                    <Card
                        title="Zdobyte"
                        icon={statIcons.goalsFor}
                        values={data ? data.scoredGoals : "N/D"}
                    />
                    <Card
                        title="Stracone"
                        icon={statIcons.goalsAgainst}
                        values={data ? data.concededGoals : "N/D"}
                    />
                </div>
            </div>
        </LoadProvider>
    );
}
