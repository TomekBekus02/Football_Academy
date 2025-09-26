import { connectDB } from "@/lib/mongodb";
import Match from "@/models/match";
import "@/models/team";
import Competition from "@/models/competition";
import { NextRequest, NextResponse } from "next/server";
import Tournament from "@/models/tournament";

export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const competitions = await Competition.find().sort({ isOnGoing: -1 });
        const allMatches: any[] = [];
        const allTournaments: any[] = [];
        await Promise.all(
            competitions.map(async (comp) => {
                if (comp.label === "Match") {
                    const TeamDetails = await Match.findById(comp.competitionId)
                        .select(
                            "_id homeTeamId awayTeamId matchStatus homeTeamScore homeTeamPenaltiesScore awayTeamScore awayTeamPenaltiesScore matchDate matchHour place"
                        )
                        .populate("homeTeamId", "name logo")
                        .populate("awayTeamId", "name logo");
                    allMatches.push(TeamDetails);
                } else {
                    const TournamentDetails = await Tournament.findById(
                        comp.competitionId
                    )
                        .select("_id title date hour isOnGoing winnerId")
                        .populate("winnerId", "_id name logo");
                    allTournaments.push(TournamentDetails);
                }
            })
        );

        return NextResponse.json(
            {
                allMatches: allMatches,
                allTournaments: allTournaments,
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Nie udało się pobrać danych" },
            { status: 500 }
        );
    }
}
