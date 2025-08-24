import { connectDB } from "@/lib/mongodb";
import Match from "@/models/match";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        await connectDB();
        const formData = await req.formData();
        const label = formData.get("label") as string;
        const homeTeamId = formData.get("homeTeamId") as string;
        const awayTeamId = formData.get("awayTeamId") as string;
        const matchDate = formData.get("matchDate") as string;
        const matchHour = formData.get("matchHour") as string;
        const place = formData.get("place") as string;

        const newMatch = new Match({
            isOngoing: true,
            label,
            homeTeamId,
            awayTeamId,
            matchDate,
            matchHour,
            place,
            result: "-",
            events: [],
            tournamentId: "",
        });
        await newMatch.save();

        return NextResponse.json(
            { message: "Stworzono mecz" },
            { status: 200 }
        );
    } catch (error) {
        console.log("error: ", error);
        return NextResponse.json(
            { message: "Błąd przy tworzeniu meczu" },
            { status: 500 }
        );
    }
}
