import { connectDB } from "@/lib/mongodb";
import Player, { IPlayer } from "@/models/player";
import Team, { ITeam } from "@/models/team";
import { IPlayerDetails } from "@/types/IPlayer";
import { NextRequest, NextResponse } from "next/server";
import { strickerStats } from "@/data/defaultPlayerStats/StrickerStats";
import { midFielderStats } from "@/data/defaultPlayerStats/MidfielderStats";
import { deffenderStats } from "@/data/defaultPlayerStats/DeffenderStats";
import { goalkeeperStats } from "@/data/defaultPlayerStats/GoalkeeperStats";

async function countTeamAssist(teamId: string) {
    const result = await Player.aggregate([
        { $match: { teamId } },
        { $group: { _id: null, totalAssists: { $sum: "$assists" } } },
    ]);
    return result[0]?.totalAssists || 0;
}

function transformPlayerStats(player: IPlayer, team: ITeam): IPlayerDetails {
    const clamp = (value: number, min: number, max: number): number =>
        Math.floor(Math.min(Math.max(value, min), max));

    let baseStats = midFielderStats;
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

    const leagueAvgGoals = 1.4;
    const leagueAvgConceded = 1.4;
    // individual stats factor
    const goalMult = clamp(
        player.goals / player.appearances / baseStats.Attack.goals,
        0.5,
        2.0
    );
    const assistMult = clamp(
        player.assists / player.appearances / baseStats.Playmaking.assists,
        0.5,
        2.0
    );
    const csMult =
        baseStats.Defense.cleanSheets > 0
            ? clamp(
                  player.cleanSheet /
                      player.appearances /
                      baseStats.Defense.cleanSheets,
                  0.5,
                  2.0
              )
            : 1;
    const yellowMult = clamp(
        player.yellowCards / player.appearances / baseStats.Defense.yellowCards,
        0.3,
        3.0
    );
    const redMult =
        baseStats.Defense.redCards > 0
            ? clamp(
                  player.redCards /
                      player.appearances /
                      baseStats.Defense.redCards,
                  0.1,
                  5.0
              )
            : 1;
    const concededMult = clamp(
        team.concededGoals /
            team.matches /
            baseStats.Goalkeeper.xpConcededGoals,
        0.4,
        2.0
    );
    // team assists
    let teamAssists = 0;
    countTeamAssist(team._id as string).then((res) => (teamAssists = res));

    // team stats factor
    const teamOffense = team.scoredGoals / team.matches / leagueAvgGoals;
    const teamDefense = leagueAvgConceded / (team.concededGoals / team.matches);

    return {
        _id: player._id as string,
        name: player.name,
        shirtNumber: player.shirtNumber,
        dateBirth: player.dateOfBirth,
        photo: player.photo,
        position: player.position,
        appearances: player.appearances,
        cleanSheet: player.cleanSheet,
        goals: player.goals,
        assists: player.assists,
        redCards: player.redCards,
        yellowCards: player.yellowCards,
        AvgPlayerStatsdetails: {
            Attack: {
                goals: Number((player.goals / player.appearances).toFixed(2)),
                xpGoal: Number(
                    (
                        baseStats.Attack.xpGoal *
                        goalMult *
                        teamOffense *
                        1.6
                    ).toFixed(2)
                ),
                shots: Number(
                    (baseStats.Attack.shots * goalMult * teamOffense).toFixed(2)
                ),
                shotsOntarget: Number(
                    (
                        baseStats.Attack.shotsOntarget *
                        goalMult *
                        teamOffense
                    ).toFixed(2)
                ),
                offensiveDuels: {
                    lost: Number(
                        (
                            baseStats.Attack.offensiveDuels.lost *
                            (1 + (goalMult - 1) * 0.5)
                        ).toFixed(1)
                    ),
                    won: Number(
                        (
                            baseStats.Attack.offensiveDuels.won * goalMult
                        ).toFixed(1)
                    ),
                },
            },
            Playmaking: {
                assists: Number(
                    (player.assists / player.appearances).toFixed(2)
                ),
                xpAssists: Number(
                    (
                        baseStats.Playmaking.xpAssists *
                        assistMult *
                        teamOffense
                    ).toFixed(2)
                ),
                createdChances: Number(
                    (
                        baseStats.Playmaking.createdChances *
                        assistMult *
                        teamOffense
                    ).toFixed(1)
                ),
                passAccuracy: clamp(
                    baseStats.Playmaking.passAccuracy + (assistMult - 1) * 5,
                    70,
                    95
                ),
                longPassAccuracy: clamp(
                    baseStats.Playmaking.longPassAccuracy +
                        (assistMult - 1) * 4,
                    50,
                    90
                ),
                progressivePasses: Number(
                    (
                        baseStats.Playmaking.progressivePasses *
                        assistMult *
                        teamOffense
                    ).toFixed(1)
                ),
                crosses: {
                    failed: Number(
                        (
                            baseStats.Playmaking.crosses.failed *
                            (2 - assistMult)
                        ).toFixed(1)
                    ),
                    succeded: Number(
                        (
                            baseStats.Playmaking.crosses.succeded * assistMult
                        ).toFixed(1)
                    ),
                },
            },
            Defense: {
                cleanSheets: Number(
                    (player.cleanSheet / player.appearances).toFixed(1)
                ),
                yellowCards: Number(
                    (player.yellowCards / player.appearances).toFixed(1)
                ),
                redCards: Number(
                    (player.redCards / player.appearances).toFixed(1)
                ),
                headerDuels: {
                    lost: Number(
                        (
                            baseStats.Defense.headerDuels.lost *
                                (1 + (yellowMult - 1) * 0.3) +
                            redMult * 0.4
                        ).toFixed(1)
                    ),
                    won: Number(
                        (
                            baseStats.Defense.headerDuels.won *
                            (2 - yellowMult * 0.5)
                        ).toFixed(1)
                    ),
                },
                groundDuels: {
                    lost: Number(
                        (
                            baseStats.Defense.groundDuels.lost *
                                (1 + (yellowMult - 1) * 0.2) +
                            redMult * 0.4
                        ).toFixed(1)
                    ),
                    won: Number(
                        (
                            baseStats.Defense.groundDuels.won *
                            (2.4 + (csMult - 1) * 0.4)
                        ).toFixed(1)
                    ),
                },
                fauls: Number(
                    (
                        baseStats.Defense.fauls +
                        yellowMult +
                        redMult * 0.4
                    ).toFixed(1)
                ),
                interceptions: Number(
                    (
                        baseStats.Defense.interceptions *
                        teamDefense *
                        (1 + (csMult - 1) * 0.3)
                    ).toFixed(1)
                ),
            },
            Goalkeeper: {
                cleanSheets:
                    player.position === "Bramkarz"
                        ? Number(
                              (player.cleanSheet / player.appearances).toFixed(
                                  2
                              )
                          )
                        : 0,
                xpConcededGoals:
                    player.position === "Bramkarz"
                        ? Number(
                              (
                                  baseStats.Goalkeeper.xpConcededGoals +
                                  concededMult * teamDefense
                              ).toFixed(2)
                          )
                        : 0,
                saveSuccessRate:
                    player.position === "Bramkarz"
                        ? clamp(
                              (baseStats.Goalkeeper.saveSuccessRate *
                                  (csMult + 1 / Math.max(concededMult, 0.1))) /
                                  2,
                              55,
                              92
                          )
                        : 0,
                interventions:
                    player.position === "Bramkarz"
                        ? Number(
                              clamp(
                                  baseStats.Goalkeeper.interventions * csMult,
                                  1.5,
                                  6.0
                              )
                          )
                        : 0,
            },
        },
        teamStats: {
            matches: team.matches,
            wins: team.wins,
            draws: team.draws,
            loses: team.loses,
            assists: teamAssists,
            goals_scored: team.scoredGoals,
            goals_conceded: team.concededGoals,
            goals_balance: team.scoredGoals - team.concededGoals,
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
                const playerStats = transformPlayerStats(player, team);
                return NextResponse.json(playerStats, { status: 200 });
            }
        }
        return NextResponse.json("", { status: 404 });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Błąd przy pobieraniu statystyk" },
            { status: 500 }
        );
    }
}
