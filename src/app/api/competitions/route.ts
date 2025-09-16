import { connectDB } from "@/lib/mongodb";
import Match from "@/models/match";
import "@/models/team";
import Competition from "@/models/competition";
import { NextRequest, NextResponse } from "next/server";
import Tournament from "@/models/tournament";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const isOnGoingParam = searchParams.get("isOnGoing");
        const isOnGoing = isOnGoingParam === "true";

        await connectDB();
        const competitions = await Competition.find({
            isOngoing: isOnGoing,
        }).sort({ _id: -1 });
        const fullData = await Promise.all(
            competitions.map(async (comp) => {
                const compObj = comp.toObject();
                if (comp.label === "Match") {
                    const TeamDetails = await Match.findById(comp.competitionId)
                        .select(
                            "_id homeTeamId awayTeamId matchStatus homeTeamScore awayTeamScore"
                        )
                        .populate("homeTeamId", "name logo")
                        .populate("awayTeamId", "name logo");
                    return { TeamDetails, ...compObj };
                } else {
                    const TournamentDetails = await Tournament.findById(
                        comp.competitionId
                    )
                        .select("_id title date hour isOnGoing winnerId")
                        .populate("winnerId", "_id name logo");
                    return { TournamentDetails, ...compObj };
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
