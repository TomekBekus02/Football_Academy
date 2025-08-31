import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectDB } from "./mongodb";
import Competition from "@/models/competition";

export async function addCompetition(
    label: string,
    competitionId: mongoose.Types.ObjectId
) {
    try {
        await connectDB();
        const newCompetition = new Competition({
            isOngoing: true,
            label,
            competitionId,
            competitionType: label === "Match" ? "Match" : "Player", //Player na Tournament
        });

        await newCompetition.save();

        return NextResponse.json(
            { message: "Stworzono nowe rozgrywki" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Błąd POST /api/players:", error);
        return NextResponse.json(
            { message: "Nie udało się dodać nowych rozgrywek" },
            { status: 500 }
        );
    }
}
