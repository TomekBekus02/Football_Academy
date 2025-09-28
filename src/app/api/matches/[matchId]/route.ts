import { connectDB } from "@/lib/mongodb";
import Match, { IMatch, MatchStatus } from "@/models/match";
import Player from "@/models/player";
import { IMatchEventExt } from "@/types/IEvent";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import {
    updateCleanSheetAndAppearances,
    updatedStatsAfterMatch,
} from "../../players/stats/route";
import Team from "@/models/team";
import Competition from "@/models/competition";

export async function GET(
    request: NextRequest,
    { params }: { params: { matchId: string } }
) {
    try {
        await connectDB();
        const { matchId } = await params;
        const match = await Match.findById(matchId);
        if (!match) {
            return NextResponse.json({
                message: "nie znaleziono meczu",
                status: 404,
            });
        }
        return NextResponse.json(match, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Nie udało się pobrać danych",
            status: 500,
        });
    }
}

export async function POST(
    request: NextRequest,
    { params }: { params: { matchId: string } }
) {
    try {
        await connectDB();
        const newEvent = await request.json();
        const { matchId } = await params;
        const { result } = newEvent;

        const match = await Match.findById(matchId);
        if (!match) {
            return NextResponse.json({
                message: "nie znaleziono meczu",
                status: 404,
            });
        }
        let newEventType = newEvent.eventType;
        if (newEvent.eventType === "YellowCard") {
            const yellowCardEvent = match.events.find(
                (e) =>
                    e.player.id.toString() === newEvent.player.id.toString() &&
                    e.eventType === "YellowCard"
            );
            if (yellowCardEvent) {
                newEventType = "RedYellowCard";
            }
        }
        const safeEvent = {
            ...newEvent,
            eventType: newEventType,
            player: {
                ...newEvent.player,
                id: new mongoose.Types.ObjectId(newEvent.player.id),
            },
            assist_player:
                newEvent.assist_player.id !== ""
                    ? {
                          ...newEvent.assist_player,
                          id: new mongoose.Types.ObjectId(
                              newEvent.assist_player.id
                          ),
                      }
                    : undefined,
        };
        match.events.push(safeEvent);
        match.homeTeamScore = result.homeTeamResult;
        match.awayTeamScore = result.awayTeamResult;

        await match.save();
        return NextResponse.json({ status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Nie udało się pobrać danych",
            status: 500,
        });
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { matchId: string } }
) {
    try {
        await connectDB();
        const { matchStatusType } = await request.json();
        const { matchId } = await params;

        if (matchStatusType === "matchStatus") {
            await Match.findByIdAndUpdate(matchId, {
                $set: { matchStatus: "IN_PROGRESS" },
            });
        } else {
            await Match.findByIdAndUpdate(matchId, {
                $set: { isOverTime: true },
            });
        }
        return NextResponse.json({ status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Nie udało się pobrać danych",
            status: 500,
        });
    }
}
const translateEventType = (eventType: string): string => {
    if (eventType === "Goal") {
        return "goals";
    } else if (eventType === "YellowCard") {
        return "yellowCards";
    } else if (eventType === "RedCard") {
        return "redCards";
    } else {
        return "";
    }
};
export async function DELETE(
    request: NextRequest,
    { params }: { params: { matchId: string } }
) {
    try {
        const { matchId } = await params;
        const { searchParams } = new URL(request.url);
        const competitionId = searchParams.get("competitionId");
        const match = await Match.findById(matchId);
        if (match) {
            if (match.matchStatus === MatchStatus.FINISHED) {
                await Promise.all([
                    updatedStatsAfterMatch(
                        match,
                        matchId,
                        {
                            homeTeam: match.homeTeamPenaltiesScore,
                            awayTeam: match.awayTeamPenaltiesScore,
                        },
                        -1
                    ),
                ]);
            }
            await Match.findByIdAndDelete(matchId);
            await Competition.findByIdAndDelete(competitionId);
        }
        return NextResponse.json({
            message: "Poprawnie usunięto dane",
            status: 200,
        });
    } catch (error) {
        return NextResponse.json({
            message: "Błąd podczas usuwania danych",
            status: 500,
        });
    }
}
