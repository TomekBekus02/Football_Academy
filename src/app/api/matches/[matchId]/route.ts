import { connectDB } from "@/lib/mongodb";
import Match from "@/models/match";
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
