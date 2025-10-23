import { connectDB } from "@/lib/mongodb";
import Player, { IPlayer } from "@/models/player";
import Team, { ITeam } from "@/models/team";
import {
    IAttackStat,
    IDeffenseStat,
    IGoalkeeperStat,
    IPlayerDetails,
    IPlayerStatsDetails,
    IPlaymakingStat,
} from "@/types/IPlayer";
import { NextRequest, NextResponse } from "next/server";
import { strickerStats } from "@/data/defaultPlayerStats/StrickerStats";
import { midFielderStats } from "@/data/defaultPlayerStats/MidfielderStats";
import { deffenderStats } from "@/data/defaultPlayerStats/DeffenderStats";
import { goalkeeperStats } from "@/data/defaultPlayerStats/GoalkeeperStats";
import Match from "@/models/match";
import {
    countTeamAssist,
    countTeamGoals,
    countTeamRedCards,
    countTeamYellowCards,
    transformTeamStats,
} from "@/app/api/teams/[teamId]/details/route";
import { ITeamStats } from "@/types/ITeam";

const clamp = (value: number, min: number, max: number): number =>
    Math.min(Math.max(value, min), max);

function setIndividualStatsFactor(
    baseStats: IPlayerStatsDetails,
    player: IPlayer,
    team: ITeam
) {
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
    return [goalMult, assistMult, csMult, yellowMult, redMult, concededMult];
}

function calculateTeamPlayerAvg(
    GkStat: number,
    DefStat: number,
    MidStat: number,
    FwdStat: number,
    position = "",
    composition = { goalkeeper: 1, defenders: 4, midfielders: 4, forwards: 2 }
) {
    const { goalkeeper, defenders, midfielders, forwards } = composition;
    let players = 11;
    if (position === "Bramkarz") {
        players = 1;
    }
    return (
        (GkStat * goalkeeper +
            DefStat * defenders +
            MidStat * midfielders +
            FwdStat * forwards) /
        players
    );
}

async function transformPlayerStats(
    player: IPlayer,
    team: ITeam
): Promise<IPlayerDetails> {
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
    const [goalMult, assistMult, csMult, yellowMult, redMult, concededMult] =
        setIndividualStatsFactor(baseStats, player, team);

    // team stats factor
    const teamOffense = team.scoredGoals / team.matches / leagueAvgGoals;
    const teamDefense = leagueAvgConceded / (team.concededGoals / team.matches);

    // team stats
    const [teamAssists, teamGoals, teamYellowCards, teamRedCards] =
        await Promise.all([
            countTeamAssist(team._id as string),
            countTeamGoals(team._id as string),
            countTeamYellowCards(team._id as string),
            countTeamRedCards(team._id as string),
        ]);

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
                        0.01 +
                        baseStats.Attack.xpGoal * goalMult * teamOffense * 1.6
                    ).toFixed(2)
                ),
                shots: Number(
                    (
                        0.2 +
                        baseStats.Attack.shots * goalMult * teamOffense
                    ).toFixed(2)
                ),
                shotsOntarget: Number(
                    (
                        0.1 +
                        baseStats.Attack.shotsOntarget * goalMult * teamOffense
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
                        0.1 +
                        baseStats.Playmaking.xpAssists *
                            assistMult *
                            teamOffense
                    ).toFixed(2)
                ),
                createdChances: Number(
                    (
                        0.1 +
                        baseStats.Playmaking.createdChances *
                            assistMult *
                            teamOffense
                    ).toFixed(1)
                ),
                passAccuracy: Math.round(
                    clamp(
                        baseStats.Playmaking.passAccuracy +
                            (assistMult - 1) * 5,
                        70,
                        95
                    )
                ),
                longPassAccuracy: Math.round(
                    clamp(
                        baseStats.Playmaking.longPassAccuracy +
                            (assistMult - 1) * 4,
                        50,
                        90
                    )
                ),
                progressivePasses: Number(
                    (
                        0.2 +
                        baseStats.Playmaking.progressivePasses *
                            assistMult *
                            teamOffense
                    ).toFixed(1)
                ),
                crosses: {
                    failed: Number(
                        (
                            baseStats.Playmaking.crosses.failed *
                            (2.2 - assistMult)
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
                        ? Math.round(
                              clamp(
                                  (baseStats.Goalkeeper.saveSuccessRate *
                                      (csMult +
                                          1 / Math.max(concededMult, 0.1))) /
                                      2,
                                  55,
                                  92
                              )
                          )
                        : 0,
                interventions:
                    player.position === "Bramkarz"
                        ? Number(
                              clamp(
                                  baseStats.Goalkeeper.interventions * csMult,
                                  1.5,
                                  6.0
                              ).toFixed(2)
                          )
                        : 0,
            },
        },
        AvgTeammatesStatsdetails: {
            Attack: {
                goals: Number(
                    calculateTeamPlayerAvg(
                        0,
                        deffenderStats.Attack.goals,
                        midFielderStats.Attack.goals,
                        strickerStats.Attack.goals
                    ).toFixed(2)
                ),
                xpGoal: Number(
                    calculateTeamPlayerAvg(
                        0,
                        deffenderStats.Attack.xpGoal,
                        midFielderStats.Attack.xpGoal,
                        strickerStats.Attack.xpGoal
                    ).toFixed(2)
                ),
                shots: Number(
                    calculateTeamPlayerAvg(
                        0,
                        deffenderStats.Attack.shots,
                        midFielderStats.Attack.shots,
                        strickerStats.Attack.shots
                    ).toFixed(2)
                ),
                shotsOntarget: Number(
                    calculateTeamPlayerAvg(
                        0,
                        deffenderStats.Attack.shotsOntarget,
                        midFielderStats.Attack.shotsOntarget,
                        strickerStats.Attack.shotsOntarget
                    ).toFixed(2)
                ),
                offensiveDuels: {
                    lost: Number(
                        calculateTeamPlayerAvg(
                            0,
                            deffenderStats.Attack.offensiveDuels.lost,
                            midFielderStats.Attack.offensiveDuels.lost,
                            strickerStats.Attack.offensiveDuels.lost
                        ).toFixed(1)
                    ),
                    won: Number(
                        calculateTeamPlayerAvg(
                            0,
                            deffenderStats.Attack.offensiveDuels.won,
                            midFielderStats.Attack.offensiveDuels.won,
                            strickerStats.Attack.offensiveDuels.won
                        ).toFixed(1)
                    ),
                },
            },
            Playmaking: {
                assists: Number(
                    calculateTeamPlayerAvg(
                        0,
                        deffenderStats.Playmaking.assists,
                        midFielderStats.Playmaking.assists,
                        strickerStats.Playmaking.assists
                    ).toFixed(2)
                ),
                xpAssists: Number(
                    calculateTeamPlayerAvg(
                        0,
                        deffenderStats.Playmaking.xpAssists,
                        midFielderStats.Playmaking.xpAssists,
                        strickerStats.Playmaking.xpAssists
                    ).toFixed(2)
                ),
                createdChances: Number(
                    calculateTeamPlayerAvg(
                        0,
                        deffenderStats.Playmaking.createdChances,
                        midFielderStats.Playmaking.createdChances,
                        strickerStats.Playmaking.createdChances
                    ).toFixed(1)
                ),
                passAccuracy: Math.round(
                    calculateTeamPlayerAvg(
                        0,
                        deffenderStats.Playmaking.passAccuracy,
                        midFielderStats.Playmaking.passAccuracy,
                        strickerStats.Playmaking.passAccuracy
                    )
                ),
                longPassAccuracy: Math.round(
                    calculateTeamPlayerAvg(
                        0,
                        deffenderStats.Playmaking.longPassAccuracy,
                        midFielderStats.Playmaking.longPassAccuracy,
                        strickerStats.Playmaking.longPassAccuracy
                    )
                ),
                progressivePasses: Number(
                    calculateTeamPlayerAvg(
                        0,
                        deffenderStats.Playmaking.progressivePasses,
                        midFielderStats.Playmaking.progressivePasses,
                        strickerStats.Playmaking.progressivePasses
                    ).toFixed(1)
                ),
                crosses: {
                    failed: Number(
                        calculateTeamPlayerAvg(
                            0,
                            deffenderStats.Playmaking.crosses.failed,
                            midFielderStats.Playmaking.crosses.failed,
                            strickerStats.Playmaking.crosses.failed
                        ).toFixed(1)
                    ),
                    succeded: Number(
                        calculateTeamPlayerAvg(
                            0,
                            deffenderStats.Playmaking.crosses.succeded,
                            midFielderStats.Playmaking.crosses.succeded,
                            strickerStats.Playmaking.crosses.succeded
                        ).toFixed(1)
                    ),
                },
            },
            Defense: {
                cleanSheets: Number(
                    calculateTeamPlayerAvg(
                        0,
                        deffenderStats.Defense.cleanSheets,
                        midFielderStats.Defense.cleanSheets,
                        strickerStats.Defense.cleanSheets
                    ).toFixed(1)
                ),
                yellowCards: Number(
                    calculateTeamPlayerAvg(
                        goalkeeperStats.Defense.yellowCards,
                        deffenderStats.Defense.yellowCards,
                        midFielderStats.Defense.yellowCards,
                        strickerStats.Defense.yellowCards
                    ).toFixed(1)
                ),
                redCards: Number(
                    calculateTeamPlayerAvg(
                        goalkeeperStats.Defense.redCards,
                        deffenderStats.Defense.redCards,
                        midFielderStats.Defense.redCards,
                        strickerStats.Defense.redCards
                    ).toFixed(1)
                ),
                headerDuels: {
                    lost: Number(
                        calculateTeamPlayerAvg(
                            0,
                            deffenderStats.Defense.redCards,
                            midFielderStats.Defense.redCards,
                            strickerStats.Defense.redCards
                        ).toFixed(1)
                    ),
                    won: Number(
                        calculateTeamPlayerAvg(
                            0,
                            deffenderStats.Defense.redCards,
                            midFielderStats.Defense.redCards,
                            strickerStats.Defense.redCards
                        ).toFixed(1)
                    ),
                },
                groundDuels: {
                    lost: Number(
                        calculateTeamPlayerAvg(
                            0,
                            deffenderStats.Defense.groundDuels.lost,
                            midFielderStats.Defense.groundDuels.lost,
                            strickerStats.Defense.groundDuels.lost
                        ).toFixed(1)
                    ),
                    won: Number(
                        calculateTeamPlayerAvg(
                            0,
                            deffenderStats.Defense.groundDuels.won,
                            midFielderStats.Defense.groundDuels.won,
                            strickerStats.Defense.groundDuels.won
                        ).toFixed(1)
                    ),
                },
                fauls: Number(
                    calculateTeamPlayerAvg(
                        0,
                        deffenderStats.Defense.fauls,
                        midFielderStats.Defense.fauls,
                        strickerStats.Defense.fauls
                    ).toFixed(1)
                ),
                interceptions: Number(
                    calculateTeamPlayerAvg(
                        0,
                        deffenderStats.Defense.interceptions,
                        midFielderStats.Defense.interceptions,
                        strickerStats.Defense.interceptions
                    ).toFixed(1)
                ),
            },
            Goalkeeper: {
                cleanSheets: Number(
                    calculateTeamPlayerAvg(
                        goalkeeperStats.Goalkeeper.cleanSheets,
                        0,
                        0,
                        0,
                        "Bramkarz"
                    ).toFixed(2)
                ),
                xpConcededGoals: Number(
                    calculateTeamPlayerAvg(
                        goalkeeperStats.Goalkeeper.xpConcededGoals,
                        0,
                        0,
                        0,
                        "Bramkarz"
                    ).toFixed(2)
                ),

                saveSuccessRate: Math.round(
                    calculateTeamPlayerAvg(
                        goalkeeperStats.Goalkeeper.saveSuccessRate,
                        0,
                        0,
                        0,
                        "Bramkarz"
                    )
                ),
                interventions: Number(
                    calculateTeamPlayerAvg(
                        goalkeeperStats.Goalkeeper.interventions,
                        0,
                        0,
                        0,
                        "Bramkarz"
                    ).toFixed(2)
                ),
            },
        },
        teamStats: {
            matches: team.matches,
            wins: team.wins,
            draws: team.draws,
            loses: team.loses,
            assists: teamAssists,
            yellowCards: teamYellowCards,
            redCards: teamRedCards,
            scoredGoals: teamGoals,
            concededGoals: team.concededGoals,
            goals_balance: team.scoredGoals - team.concededGoals,
        },
    };
}

async function transformPlayerStatsHistory(
    playerId: string,
    teamId: string,
    position: string
) {
    const matches = await Match.find({
        $or: [{ homeTeamId: teamId }, { awayTeamId: teamId }],
    })
        .select("homeTeamId homeTeamScore awayTeamId awayTeamScore events")
        .lean();

    const teams = await Team.find({
        $nor: [{ _id: teamId }],
    })
        .select("_id name logo")
        .lean();

    const statsHistory = teams.map((team) => {
        return {
            team: {
                teamId: team._id,
                logo: team.logo,
            },
            playerStats: {
                appearances: 0,
                assists: 0,
                goals: 0,
                cleanSheets: 0,
                redCards: 0,
                yellowCards: 0,
            },
        };
    });
    matches.forEach((match) => {
        let tempPlayerStats = {
            appearances: 0,
            assists: 0,
            goals: 0,
            cleanSheets: 0,
            redCards: 0,
            yellowCards: 0,
        };
        tempPlayerStats.appearances += 1;
        if (position === "Bramkarz" || position === "Obrońca") {
            if (match.homeTeamId.toString() !== teamId.toString()) {
                if (match.homeTeamScore === 0) {
                    tempPlayerStats.cleanSheets += 1;
                }
            } else if (match.awayTeamScore === 0) {
                tempPlayerStats.cleanSheets += 1;
            }
        }
        match.events.forEach((event: any) => {
            switch (event.eventType) {
                case "Goal":
                    if (event.player.id.equals(playerId)) {
                        tempPlayerStats.goals += 1;
                    } else if (
                        event.assist_player &&
                        event.assist_player.id.equals(playerId)
                    ) {
                        tempPlayerStats.assists += 1;
                    }
                    break;
                case "YellowCard":
                    if (event.player.id.equals(playerId)) {
                        tempPlayerStats.yellowCards += 1;
                    }

                    break;
                case "RedCard":
                    if (event.player.id.equals(playerId)) {
                        tempPlayerStats.redCards += 1;
                    }
                    break;
            }
        });
        let teamIdtoUpdate = "";
        if (match.homeTeamId.toString() !== teamId.toString()) {
            teamIdtoUpdate = match.homeTeamId.toString();
        } else {
            teamIdtoUpdate = match.awayTeamId.toString();
        }
        const teamStatHistory = statsHistory.find(
            (s) => s.team.teamId.toString() === teamIdtoUpdate.toString()
        );
        if (teamStatHistory) {
            const ps = teamStatHistory.playerStats;
            ps.appearances += tempPlayerStats.appearances;
            ps.goals += tempPlayerStats.goals;
            ps.assists += tempPlayerStats.assists;
            ps.cleanSheets += tempPlayerStats.cleanSheets;
            ps.redCards += tempPlayerStats.redCards;
            ps.yellowCards += tempPlayerStats.yellowCards;
        }
    });
    return statsHistory;
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
                const playerDetails = await transformPlayerStats(player, team);
                const statsHistory = await transformPlayerStatsHistory(
                    player._id as string,
                    team._id as string,
                    player.position
                );
                return NextResponse.json(
                    { statsHistory, playerDetails },
                    { status: 200 }
                );
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
