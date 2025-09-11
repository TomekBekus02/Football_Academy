import { connectDB } from "@/lib/mongodb";
import Tournament from "@/models/tournament";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: { tournamentId: string } }
) {
    try {
        await connectDB();
        const { tournamentId } = await params;
        const tournament = await Tournament.findById(tournamentId).populate({
            path: "matches",
            select: "_id homeTeamId awayTeamId homeTeamScore awayTeamScore",
            populate: [
                { path: "homeTeamId", select: "_id name logo" },
                { path: "awayTeamId", select: "_id name logo" },
            ],
        });
        if (!tournament) {
            return NextResponse.json({
                message: "nie znaleziono meczu",
                status: 404,
            });
        }

        return NextResponse.json(tournament, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Nie udało się pobrać danych",
            status: 500,
        });
    }
}
