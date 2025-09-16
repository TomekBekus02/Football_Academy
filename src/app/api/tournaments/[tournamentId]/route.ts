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
            select: "_id homeTeamId awayTeamId homeTeamScore homeTeamPenaltiesScore awayTeamScore awayTeamPenaltiesScore round matchNumber isOverTime",
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

        const bracketData = tournament.matches.map((m: any) => ({
            id: m._id.toString(),
            round: m.round,
            matchNumber: m.matchNumber,
            matchStatus: m.matchStatus,
            isOverTime: m.isOverTime,
            home: {
                team: m.homeTeamId
                    ? { name: m.homeTeamId.name, logo: m.homeTeamId.logo }
                    : null,
                score: m.homeTeamScore,
                penaltiesScore: m.homeTeamPenaltiesScore,
            },
            away: {
                team: m.awayTeamId
                    ? { name: m.awayTeamId.name, logo: m.awayTeamId.logo }
                    : null,
                score: m.awayTeamScore,
                penaltiesScore: m.awayTeamPenaltiesScore,
            },
        }));

        return NextResponse.json(
            { ...tournament.toObject(), matches: bracketData },
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Nie udało się pobrać danych",
            status: 500,
        });
    }
}
