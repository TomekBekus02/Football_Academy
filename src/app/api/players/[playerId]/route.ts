import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Player from "@/models/player";

export async function GET() {
    try {
        await connectDB();
        const teamID = "689a4c7170a41052e449061b"; //hard Coded for dev purposes
        const players = await Player.find({ teamId: teamID });
        return NextResponse.json(players, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Błąd przy pobieraniu graczy" },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {}
