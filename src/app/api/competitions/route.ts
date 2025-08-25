import { connectDB } from "@/lib/mongodb";
import Match from "@/models/match";
import "@/models/team";
import Competition from "@/models/competition";
import { NextRequest, NextResponse } from "next/server";
import { console } from "inspector";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const isOnGoingParam = searchParams.get("isOnGoing");
        const isOnGoing = isOnGoingParam === "true";

        await connectDB();
        const competitions = await Competition.find({ isOngoing: isOnGoing });
        const fullData = await Promise.all(
            competitions.map(async (comp) => {
                const compObj = comp.toObject();
                if (comp.label === "Match") {
                    const TeamDetails = await Match.findById(comp.competitionId)
                        .select("_id result homeTeamId awayTeamId")
                        .populate("homeTeamId", "name logo")
                        .populate("awayTeamId", "name logo");
                    return { ...compObj, TeamDetails };
                } else {
                    return compObj;
                }
            })
        );
        return NextResponse.json(fullData, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Nie udało się pobrać danych" },
            { status: 500 }
        );
    }
}
