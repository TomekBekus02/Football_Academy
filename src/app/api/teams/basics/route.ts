import { connectDB } from "@/lib/mongodb";
import Team from "@/models/team";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();
        const team = await Team.find().select("_id name logo");
        return NextResponse.json(team, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Błąd serwera",
            status: 500,
        });
    }
}
