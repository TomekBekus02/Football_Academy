import { connectDB } from "@/lib/mongodb";
import Team from "@/models/team";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: { teamId: string } }
) {
    try {
        const { teamId } = await params;
        await connectDB();
        const team = await Team.findById(teamId);
        if (!team) {
            return NextResponse.json({
                message: "Błąd przy pobieraniu drużyny",
                status: 404,
            });
        }
        console.log(team);
        return NextResponse.json(team, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            message: "nie znaleziono drużyny",
            status: 500,
        });
    }
}
