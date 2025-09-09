import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Player from "@/models/player";
import Match from "@/models/match";
import mongoose, { ObjectId } from "mongoose";
import Competition from "@/models/competition";
import Team from "@/models/team";

interface IPlayerStats {
    player: { id: string };
    events: {
        type: string;
        quantity: number;
    }[];
}
type Accumulator = Record<string, IPlayerStats>;

const reduceForPlayer = (
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

async function updateCleanSheetAndAppearances(
    teamId: string,
    shouldUpdate: boolean
) {
    if (!shouldUpdate) return;

    const teamPlayers = await Player.find({
        teamId: new mongoose.Types.ObjectId(teamId),
    }).select("_id position");

    const cleanSheetOps = teamPlayers
        .filter((p) => p.position === "Obrońca" || p.position === "Bramkarz")
        .map((p) => ({
            updateOne: {
                filter: { _id: p._id },
                update: { $inc: { cleanSheet: 1 } },
            },
        }));
    const appearancesOps = teamPlayers.map((p) => ({
        updateOne: {
            filter: { _id: p._id },
            update: { $inc: { appearances: 1 } },
        },
    }));
    const bulkOps = [...cleanSheetOps, ...appearancesOps];
    if (bulkOps.length > 0) {
        await Player.bulkWrite(bulkOps);
    }
}
const matchResult = (homeTeamScore: number, awayTeamScore: number) => {
    if (homeTeamScore > awayTeamScore) {
        return "wins";
    } else if (homeTeamScore < awayTeamScore) {
        return "loses";
    } else {
        return "draws";
    }
};
async function updateTeamStats(
    matchId: string,
    matchDate: string,
    homeTeamId: mongoose.Types.ObjectId,
    homeTeamScore: number,
    awayTeamId: mongoose.Types.ObjectId,
    awayTeamScore: number
) {
    const [homeTeam, awayTeam] = await Promise.all([
        Team.findById(homeTeamId),
        Team.findById(awayTeamId),
    ]);
    if (!homeTeam || !awayTeam) return;

    const homeTeamResult = matchResult(homeTeamScore, awayTeamScore);
    const awayTeamResult = matchResult(awayTeamScore, homeTeamScore);

    const newMatch = {
        matchId: new mongoose.Types.ObjectId(matchId),
        matchDate,
        homeTeam: {
            id: homeTeamId,
            name: homeTeam.name,
            score: homeTeamScore,
        },
        awayTeam: {
            id: awayTeamId,
            name: awayTeam.name,
            score: awayTeamScore,
        },
    };
    const homeTeamForm = [...homeTeam.form, newMatch].slice(-5);
    const awayTeamForm = [...awayTeam.form, newMatch].slice(-5);
    await Promise.all([
        Team.findByIdAndUpdate(homeTeamId, {
            $inc: {
                [homeTeamResult]: 1,
                matches: 1,
                goal_balance: homeTeamScore - awayTeamScore,
            },
            $set: { form: homeTeamForm },
        }),
        Team.findByIdAndUpdate(awayTeamId, {
            $inc: {
                [awayTeamResult]: 1,
                matches: 1,
                goal_balance: awayTeamScore - homeTeamScore,
            },
            $set: { form: awayTeamForm },
        }),
    ]);
}

export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const body = await request.json();
        const matchId = body.matchId;
        const match = await Match.findById(matchId);
        if (!match) {
            return NextResponse.json({
                message: "nie znaleziono meczu",
                status: 404,
            });
        }

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
                        update.goals = e.quantity;
                        break;
                    case "Assist":
                        update.assists = e.quantity;
                        break;
                    case "YellowCard":
                        update.yellowCards = e.quantity;
                        break;
                    case "RedCard":
                    case "RedYellowCard":
                        update.redCards = e.quantity;
                        break;
                }
            }
            await Player.findByIdAndUpdate(p.player.id, {
                $inc: update,
            });
        }
        await updateCleanSheetAndAppearances(
            match.homeTeamId.toString(),
            match.awayTeamScore === 0
        );
        await updateCleanSheetAndAppearances(
            match.awayTeamId.toString(),
            match.homeTeamScore === 0
        );

        await updateTeamStats(
            matchId,
            match.matchDate,
            match.homeTeamId,
            match.homeTeamScore,
            match.awayTeamId,
            match.awayTeamScore
        );

        await Match.findByIdAndUpdate(matchId, {
            $set: { isOnGoing: false },
        });
        await Competition.findOneAndUpdate(
            { competitionId: new mongoose.Types.ObjectId(matchId) },
            { $set: { isOngoing: false } }
        );

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
