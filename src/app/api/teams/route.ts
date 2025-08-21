import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Team from "@/models/team";

export async function GET() {
    try {
        await connectDB();
        const teams = await Team.find();
        return NextResponse.json(teams, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Błąd przy pobieraniu graczy" },
            { status: 500 }
        );
    }
}
