import { connectDB } from "@/lib/mongodb";
import Player from "@/models/player";
import Team from "@/models/team";
import { NextRequest, NextResponse } from "next/server";
import { teamStats as baseStats } from "@/data/defaultPlayerStats/TeamStats";
import { ITeamStats } from "@/types/ITeam";

export async function countTeamAssist(teamId: string) {
    const result = await Player.aggregate([
        { $match: { teamId } },
        { $group: { _id: null, totalAssists: { $sum: "$assists" } } },
    ]);
    return result[0]?.totalAssists || 0;
}
export async function countTeamRedCards(teamId: string) {
    const result = await Player.aggregate([
        { $match: { teamId } },
        { $group: { _id: null, totalRedCards: { $sum: "$redCards" } } },
    ]);
    return result[0]?.totalRedCards || 0;
}
export async function countTeamYellowCards(teamId: string) {
    const result = await Player.aggregate([
        { $match: { teamId } },
        { $group: { _id: null, totalYellowCards: { $sum: "$yellowCards" } } },
    ]);
    return result[0]?.totalYellowCards || 0;
}
export async function countTeamGoals(teamId: string) {
    const result = await Player.aggregate([
        { $match: { teamId } },
        { $group: { _id: null, totalGoals: { $sum: "$goals" } } },
    ]);
    return result[0]?.totalGoals || 0;
}

const clamp = (value: number, min: number, max: number): number =>
    Math.min(Math.max(value, min), max);

function setTeamStatsFactor(
    actualGoals: number,
    actualAssists: number,
    actualConceded: number,
    actualYellow: number,
    actualRed: number,
    matches: number,
    wins: number,
    draws: number
) {
    // league AVG stats
    const LEAGUE_AVG_GOALS = 1.4;
    const LEAGUE_AVG_ASSISTS = 1.1;
    const LEAGUE_AVG_YELLOW = 1.8;
    const LEAGUE_AVG_RED = 0.05;
    const LEAGUE_AVG_GOALS_CONCEDED = 1.4;

    const offenseMult = clamp(
        (actualGoals / LEAGUE_AVG_GOALS + actualAssists / LEAGUE_AVG_ASSISTS) /
            2,
        0.5,
        2.0
    );
    const defenseMult = clamp(
        LEAGUE_AVG_GOALS_CONCEDED / actualConceded,
        0.5,
        2.0
    );

    const yellowMult = clamp(actualYellow / LEAGUE_AVG_YELLOW, 0.4, 2.5);
    const redMult = clamp(actualRed / LEAGUE_AVG_RED, 0.2, 5.0);
    const disciplineMult = Math.sqrt(yellowMult * redMult);
    const points = wins * 3 + draws;
    const pointsPerMatch = points / matches;
    const formMult = clamp(pointsPerMatch / 1.5, 0.6, 2.6);

    return [offenseMult, defenseMult, disciplineMult, formMult];
}

export async function transformTeamStats(team: any): Promise<ITeamStats> {
    // team stats
    const [teamAssists, teamGoals, teamYellowCards, teamRedCards] =
        await Promise.all([
            countTeamAssist(team._id as string),
            countTeamGoals(team._id as string),
            countTeamYellowCards(team._id as string),
            countTeamRedCards(team._id as string),
        ]);

    // team factors
    const [offenseMult, defenseMult, disciplineMult, formMult] =
        setTeamStatsFactor(
            teamGoals,
            teamAssists,
            team.concededGoals,
            teamYellowCards,
            teamRedCards,
            team.matches,
            team.wins,
            team.draws
        );
    return {
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
        avgTeamStats: {
            offense: {
                goals: Number((teamGoals / team.matches).toFixed(2)),
                xpGoals: Number(
                    (baseStats.offense.xpGoals * offenseMult).toFixed(2)
                ),
                shoots: Number(
                    (baseStats.offense.shoots * offenseMult * formMult).toFixed(
                        2
                    )
                ),
                shotsOnTarget: Number(
                    (
                        baseStats.offense.shotsOnTarget *
                        offenseMult *
                        formMult
                    ).toFixed(2)
                ),
                duelsWon: Number(
                    (
                        (baseStats.offense.duelsWon *
                            formMult *
                            (offenseMult + defenseMult)) /
                        2
                    ).toFixed(2)
                ),
                duelsLost: Number(
                    (baseStats.offense.duelsLost * disciplineMult).toFixed(2)
                ),
            },
            deffense: {
                fauls: Number(
                    (baseStats.defense.fauls * disciplineMult).toFixed(2)
                ),
                yellowCards: Number(
                    (teamYellowCards / team.matches).toFixed(2)
                ),
                redCards: Number((teamRedCards / team.matches).toFixed(2)),
                airDuelsWon: Number(
                    (
                        baseStats.defense.airDuelsWon *
                        defenseMult *
                        formMult
                    ).toFixed(2)
                ),
                airDuelsLost: Number(
                    (
                        baseStats.defense.airDuelsLost *
                        (2 - defenseMult) *
                        disciplineMult
                    ).toFixed(2)
                ),
                groundDuelsWon: Number(
                    (
                        baseStats.defense.groundDuelsWon *
                        defenseMult *
                        formMult
                    ).toFixed(2)
                ),
                groundDuelsLost: Number(
                    (
                        baseStats.defense.groundDuelsLost *
                        (2 - defenseMult) *
                        disciplineMult
                    ).toFixed(2)
                ),
            },
            playmaking: {
                assists: Number((teamAssists / team.matches).toFixed(2)),
                xpAssists: Number(
                    (baseStats.playmaking.xpAssists * offenseMult).toFixed(2)
                ),
                createdChance: Number(
                    (
                        baseStats.playmaking.createdChance *
                        offenseMult *
                        formMult
                    ).toFixed(2)
                ),
                progressivePasses: Number(
                    (
                        baseStats.playmaking.progressivePasses *
                        offenseMult *
                        formMult
                    ).toFixed(2)
                ),
                successCrosses: Number(
                    (baseStats.playmaking.successCrosses * offenseMult).toFixed(
                        2
                    )
                ),
                failedCrosses: Number(
                    (
                        baseStats.playmaking.failedCrosses * disciplineMult
                    ).toFixed(2)
                ),
            },
        },
    };
}
export async function GET(
    req: NextRequest,
    { params }: { params: { teamId: string } }
) {
    try {
        const { teamId } = await params;
        await connectDB();
        const team = await Team.findById(teamId)
            .select(
                "_id matches wins draws loses assists concededGoals scoredGoals"
            )
            .lean();
        const transformedTeamStats = await transformTeamStats(team);
        return NextResponse.json(transformedTeamStats, { status: 200 });
    } catch (error) {
        return NextResponse.json({ status: 500, message: error });
    }
}
