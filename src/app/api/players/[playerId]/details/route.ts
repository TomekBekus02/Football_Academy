import { connectDB } from "@/lib/mongodb";
import Player, { IPlayer } from "@/models/player";
import Team, { ITeam } from "@/models/team";
import { IPlayerDetails } from "@/types/IPlayer";
import { NextRequest, NextResponse } from "next/server";
import { strickerStats } from "@/data/defaultPlayerStats/StrickerStats";
import { midFielderStats } from "@/data/defaultPlayerStats/MidfielderStats";
import { deffenderStats } from "@/data/defaultPlayerStats/DeffenderStats";
import { goalkeeperStats } from "@/data/defaultPlayerStats/GoalkeeperStats";

function transformPlayerStats(player: IPlayer, team: ITeam): IPlayerDetails {
    let baseStats;
    switch (player.position) {
        case "Bramkarz":
            baseStats = goalkeeperStats;
            break;
        case "Obrońca":
            baseStats = deffenderStats;
            break;
        case "Pomocnik":
            baseStats = midFielderStats;
            break;
        case "Napastnik":
            baseStats = strickerStats;
            break;
    }

    return {
        _id: player._id as string,
        name: player.name,
        shirtNumber: player.shirtNumber,
        dateBirth: player.dateOfBirth,
        photo: player.photo,
        position: player.position,
        playerStatsdetails: {
            appearances: player.appearances,
            Attack: {
                goals: player.goals,
                xpGoal: 0,
                shots: 0,
                shotsOntarget: 0,
                offensiveDuels: {
                    lost: 0,
                    won: 0,
                },
            },
            Playmaking: {
                assists: player.assists,
                xpAssists: 0,
                createdChances: 0,
                passAccuracy: 0,
                longPassAccuracy: 0,
                progressivePasses: 0,
                crosses: {
                    failed: 0,
                    succeded: 0,
                },
            },
            Deffense: {
                cleanSheets: player.cleanSheet,
                yellowCards: player.yellowCards,
                redCards: player.redCards,
                headerDuels: {
                    lost: 0,
                    won: 0,
                },
                groundDuels: {
                    lost: 0,
                    won: 0,
                },
                fauls: 0,
                interceptions: 0,
            },
            Goalkeeper: {
                cleanSheets: player.cleanSheet,
                xpConcededGoals: 0,
                saveSuccessRate: 0,
                interventions: 0,
            },
        },
        teamStats: {
            matches: team.matches,
            wins: team.wins,
            draws: team.draws,
            loses: team.loses,
            assists: 0,
            goals_scored: 0,
            goals_conceded: 0,
            goals_balance: team.goal_balance,
            avgTeamStats: {
                shots: 0,
                passAccuracy: 0,
                offDuelsRate: 0,
                deffDuelsRate: 0,
                fauls: 0,
            },
        },
    };
}

export async function GET(
    request: NextRequest,
    { params }: { params: { playerId: string } }
) {
    try {
        const { playerId } = await params;
        await connectDB();
        const player = await Player.findById(playerId);
        if (player) {
            const team = await Team.findOne({ _id: player.teamId });
            if (team) {
                transformPlayerStats(player, team);
            }
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Błąd przy pobieraniu statystyk" },
            { status: 500 }
        );
    }
}
