import { connectDB } from "@/lib/mongodb";
import Match from "@/models/match";
import "@/models/team";
import Competition from "@/models/competition";
import { NextRequest, NextResponse } from "next/server";
import Tournament from "@/models/tournament";
import { ITeamsForm } from "@/types/ITeam";

const transformData = (teamDetails: any) => {
    const home = teamDetails.homeTeamId as any;
    const away = teamDetails.awayTeamId as any;
    return {
        ...teamDetails,
        homeTeamId: {
            ...home,
            form: away.form?.map((f: any) => ({
                matchId: f.matchId,
                matchDate: f.matchDate,
                homeTeam: {
                    id: f.homeTeam.id,
                    name: f.homeTeam.name,
                    score: f.homeTeam.score,
                    penScore: f.homeTeam.penalties,
                },
                awayTeam: {
                    id: f.awayTeam.id,
                    name: f.awayTeam.name,
                    score: f.awayTeam.score,
                    penScore: f.awayTeam.penalties,
                },
            })),
        },
        awayTeamId: {
            ...away,
            form: away.form?.map((f: any) => ({
                matchId: f.matchId,
                matchDate: f.matchDate,
                homeTeam: {
                    id: f.homeTeam.id,
                    name: f.homeTeam.name,
                    score: f.homeTeam.score,
                    penScore: f.homeTeam.penalties,
                },
                awayTeam: {
                    id: f.awayTeam.id,
                    name: f.awayTeam.name,
                    score: f.awayTeam.score,
                    penScore: f.awayTeam.penalties,
                },
            })),
        },
    };
};
export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const competitions = await Competition.find().sort({ isOnGoing: -1 });
        const allMatches: any[] = [];
        const allTournaments: any[] = [];
        await Promise.all(
            competitions.map(async (comp) => {
                if (comp.label === "Match") {
                    const teamDetails = await Match.findById(comp.competitionId)
                        .select(
                            "_id homeTeamId awayTeamId matchStatus homeTeamScore homeTeamPenaltiesScore awayTeamScore awayTeamPenaltiesScore matchDate matchHour place"
                        )
                        .populate("homeTeamId", "name logo form")
                        .populate("awayTeamId", "name logo form")
                        .lean();
                    if (teamDetails) {
                        const transformed = transformData(teamDetails);
                        allMatches.push(transformed);
                    }
                } else {
                    const TournamentDetails = await Tournament.findById(
                        comp.competitionId
                    )
                        .select(
                            "_id title date hour isOnGoing winnerId participants"
                        )
                        .populate("winnerId", "_id name logo")
                        .populate("participants", "_id logo");
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
        console.log(error);
        return NextResponse.json(
            { message: "Nie udało się pobrać danych" },
            { status: 500 }
        );
    }
}
