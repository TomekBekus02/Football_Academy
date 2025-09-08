import { connectDB } from "@/lib/mongodb";
import Match from "@/models/match";
import { IMatchEventExt } from "@/types/IEvent";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

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
        console.log("newEvent", matchId);
        const match = await Match.findById(matchId);
        if (!match) {
            return NextResponse.json({
                message: "nie znaleziono meczu",
                status: 404,
            });
        }
        const safeEvent = {
            ...newEvent,
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
