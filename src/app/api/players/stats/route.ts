import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Player from "@/models/player";
import Match, { IMatch, MatchStatus } from "@/models/match";
import mongoose, { ObjectId } from "mongoose";
import Competition from "@/models/competition";
import Team from "@/models/team";
import Tournament from "@/models/tournament";

interface IPlayerStats {
    player: { id: string };
    events: {
        type: string;
        quantity: number;
    }[];
}
type penaltiesType = {
    homeTeam: number;
    awayTeam: number;
};
type Accumulator = Record<string, IPlayerStats>;

export const reduceForPlayer = (
    acc: Accumulator,
    playerId: string,
    eventType: string
): Accumulator => {
    if (!acc[playerId]) {
        acc[playerId] = {
            player: {
                id: playerId,
            },
            events: [],
        };
    }

    const existingEvent = acc[playerId].events.find(
        (e: any) => e.type === eventType
    );

    if (existingEvent) {
        existingEvent.quantity += 1;
    } else {
        acc[playerId].events.push({
            type: eventType,
            quantity: 1,
        });
    }
    return acc;
};

export async function updateCleanSheetAndAppearances(
    teamId: string,
    shouldUpdate: boolean,
    IncValue: number
) {
    const teamPlayers = await Player.find({
        teamId: new mongoose.Types.ObjectId(teamId),
    }).select("_id position");

    const cleanSheetOps = teamPlayers
        .filter((p) => p.position === "Obrońca" || p.position === "Bramkarz")
        .map((p) => ({
            updateOne: {
                filter: { _id: p._id },
                update: { $inc: { cleanSheet: shouldUpdate ? IncValue : 0 } },
            },
        }));
    const appearancesOps = teamPlayers.map((p) => ({
        updateOne: {
            filter: { _id: p._id },
            update: { $inc: { appearances: IncValue } },
        },
    }));
    const bulkOps = [...cleanSheetOps, ...appearancesOps];
    if (bulkOps.length > 0) {
        await Player.bulkWrite(bulkOps);
    }
}

export const matchResult = (
    homeTeamScore: number,
    awayTeamScore: number,
    homeTeamPenaltiesScore: number,
    awayTeamPenaltiesScore: number
) => {
    if (
        homeTeamScore > awayTeamScore ||
        homeTeamPenaltiesScore > awayTeamPenaltiesScore
    ) {
        return "wins";
    } else if (
        homeTeamScore < awayTeamScore ||
        homeTeamPenaltiesScore < awayTeamPenaltiesScore
    ) {
        return "loses";
    } else {
        return "draws";
    }
};

export async function updateTeamStats(
    matchId: string,
    matchDate: string,
    homeTeamId: mongoose.Types.ObjectId,
    homeTeamScore: number,
    awayTeamId: mongoose.Types.ObjectId,
    awayTeamScore: number,
    homeTeamPenaltiesScore: number,
    awayTeamPenaltiesScore: number,
    IncValue: number
) {
    const [homeTeam, awayTeam] = await Promise.all([
        Team.findById(homeTeamId),
        Team.findById(awayTeamId),
    ]);
    if (!homeTeam || !awayTeam) return;

    const homeTeamResult = matchResult(
        homeTeamScore,
        awayTeamScore,
        homeTeamPenaltiesScore,
        awayTeamPenaltiesScore
    );
    const awayTeamResult = matchResult(
        awayTeamScore,
        homeTeamScore,
        awayTeamPenaltiesScore,
        homeTeamPenaltiesScore
    );

    let homeTeamForm;
    let awayTeamForm;
    if (IncValue > 0) {
        const newMatch = {
            matchId: new mongoose.Types.ObjectId(matchId),
            matchDate,
            homeTeam: {
                id: homeTeamId,
                name: homeTeam.name,
                score: homeTeamScore,
                penalties:
                    homeTeamPenaltiesScore > 0 ? homeTeamPenaltiesScore : 0,
            },
            awayTeam: {
                id: awayTeamId,
                name: awayTeam.name,
                score: awayTeamScore,
                penalties:
                    awayTeamPenaltiesScore > 0 ? awayTeamPenaltiesScore : 0,
            },
        };
        homeTeamForm = [...homeTeam.form, newMatch].slice(-5);
        awayTeamForm = [...awayTeam.form, newMatch].slice(-5);
    } else {
        homeTeamForm = homeTeam.form.filter(
            (m) => m.matchId.toString() !== matchId
        );
        awayTeamForm = awayTeam.form.filter(
            (m) => m.matchId.toString() !== matchId
        );
    }

    const homeTeamGoalBalance = (homeTeamScore - awayTeamScore) * IncValue;
    const awayTeamGoalBalance = (awayTeamScore - homeTeamScore) * IncValue;

    await Promise.all([
        Team.findByIdAndUpdate(homeTeamId, {
            $inc: {
                [homeTeamResult]: IncValue,
                matches: IncValue,
                goal_balance: homeTeamGoalBalance,
            },
            $set: {
                form: homeTeamForm,
            },
        }),
        Team.findByIdAndUpdate(awayTeamId, {
            $inc: {
                [awayTeamResult]: IncValue,
                matches: IncValue,
                goal_balance: awayTeamGoalBalance,
            },
            $set: {
                form: awayTeamForm,
            },
        }),
        Match.findByIdAndUpdate(matchId, {
            $set: {
                homeTeamPenaltiesScore,
                awayTeamPenaltiesScore,
            },
        }),
    ]);
}

export async function updatedStatsAfterMatch(
    match: IMatch,
    matchId: string,
    matchPenalties: penaltiesType,
    incValue: number
) {
    const playersStats = Object.values(
        match.events.reduce((acc, event) => {
            let playerId = event.player.id.toString();
            reduceForPlayer(acc, playerId, event.eventType);
            if (event.eventType === "Goal" && event.assist_player) {
                playerId = event.assist_player.id.toString();
                reduceForPlayer(acc, playerId, "Assist");
            }
            return acc;
        }, {} as Accumulator)
    );

    for (const p of playersStats) {
        const update: Record<string, number> = {};
        for (const e of p.events) {
            switch (e.type) {
                case "Goal":
                    update.goals = e.quantity * incValue;
                    break;
                case "Assist":
                    update.assists = e.quantity * incValue;
                    break;
                case "YellowCard":
                    update.yellowCards = e.quantity * incValue;
                    break;
                case "RedCard":
                case "RedYellowCard":
                    update.redCards = e.quantity * incValue;
                    break;
            }
        }
        await Player.findByIdAndUpdate(p.player.id, {
            $inc: update,
        });
    }
    await updateCleanSheetAndAppearances(
        match.homeTeamId.toString(),
        match.awayTeamScore === 0,
        incValue
    );
    await updateCleanSheetAndAppearances(
        match.awayTeamId.toString(),
        match.homeTeamScore === 0,
        incValue
    );

    await updateTeamStats(
        matchId,
        match.matchDate,
        match.homeTeamId,
        match.homeTeamScore,
        match.awayTeamId,
        match.awayTeamScore,
        matchPenalties.homeTeam,
        matchPenalties.awayTeam,
        incValue
    );

    if (incValue > 0) {
        await Match.findByIdAndUpdate(matchId, {
            $set: { matchStatus: MatchStatus.FINISHED },
        });
        await Competition.findOneAndUpdate(
            { competitionId: new mongoose.Types.ObjectId(matchId) },
            { $set: { isOngoing: false } }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const body = await request.json();
        const { matchId, matchPenalties } = body;
        const match = await Match.findById(matchId);
        if (!match) {
            return NextResponse.json({
                message: "nie znaleziono meczu",
                status: 404,
            });
        }
        await updatedStatsAfterMatch(match, matchId, matchPenalties, 1);
        if (match.tournamentId !== "") {
            const teamsQuantityInTournament = await Tournament.findById(
                match.tournamentId
            ).select("_id participants");
            if (teamsQuantityInTournament) {
                const maxRounds = Math.log2(
                    teamsQuantityInTournament?.toObject().participants.length
                );
                let winnerId;
                if (match.homeTeamScore === match.awayTeamScore) {
                    winnerId =
                        matchPenalties.homeTeam > matchPenalties.awayTeam
                            ? match.homeTeamId
                            : match.awayTeamId;
                } else {
                    winnerId =
                        match.homeTeamScore > match.awayTeamScore
                            ? match.homeTeamId
                            : match.awayTeamId;
                }

                if (match.round === maxRounds) {
                    await Tournament.findByIdAndUpdate(match.tournamentId, {
                        $set: { isOnGoing: false, winnerId: winnerId },
                    });
                } else {
                    const nextMatch = await Match.findOne({
                        tournamentId: match.tournamentId,
                        round: match.round + 1,
                        matchNumber: Math.ceil(match.matchNumber / 2),
                    });
                    if (nextMatch) {
                        const homeOrAway =
                            match.matchNumber % 2 !== 0
                                ? "homeTeamId"
                                : "awayTeamId";
                        await Match.findByIdAndUpdate(nextMatch?._id, {
                            $set: { [homeOrAway]: winnerId },
                        });
                    }
                }
            }
        }

        return NextResponse.json(
            { message: "Statystyki zaktualizowane pomyślnie" },
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Błąd przy aktualizowaniu statystyk" },
            { status: 500 }
        );
    }
}
