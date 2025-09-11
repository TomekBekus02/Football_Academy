import { connectDB } from "@/lib/mongodb";
import { addCompetition } from "@/lib/updateCompetitions";
import Tournament from "@/models/tournament";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

function shuffleArray<T>(array: T[]): T[] {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { title, date, hour, place, participants } = body;
        await connectDB();
        const tournament = new Tournament({
            title,
            date,
            hour,
            place,
            participants: shuffleArray(participants),
            topTeams: [],
            isOnGoing: true,
        });
        await tournament.save();
        await addCompetition(
            "Tournament",
            tournament._id as mongoose.Types.ObjectId
        );
        return NextResponse.json({
            message: "Pomyślnie stworzono turniej",
            status: 200,
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Błąd serwera, spróbuj ponownie",
            status: 500,
        });
    }
}
