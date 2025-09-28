import { connectDB } from "@/lib/mongodb";
import Match from "@/models/match";
import Tournament from "@/models/tournament";
import { NextRequest, NextResponse } from "next/server";
import { deleteMatch } from "../../matches/[matchId]/route";
import Competition from "@/models/competition";
import Team from "@/models/team";

export async function GET(
    request: NextRequest,
    { params }: { params: { tournamentId: string } }
) {
    try {
        await connectDB();
        const { tournamentId } = await params;
        const tournament = await Tournament.findById(tournamentId).populate({
            path: "matches",
            select: "_id homeTeamId awayTeamId homeTeamScore homeTeamPenaltiesScore awayTeamScore awayTeamPenaltiesScore round matchNumber isOverTime matchStatus",
            populate: [
                { path: "homeTeamId", select: "_id name logo" },
                { path: "awayTeamId", select: "_id name logo" },
            ],
        });
        if (!tournament) {
            return NextResponse.json({
                message: "nie znaleziono meczu",
                status: 404,
            });
        }

        const bracketData = tournament.matches.map((m: any) => ({
            id: m._id.toString(),
            round: m.round,
            matchNumber: m.matchNumber,
            matchStatus: m.matchStatus,
            isOverTime: m.isOverTime,
            home: {
                team: m.homeTeamId
                    ? { name: m.homeTeamId.name, logo: m.homeTeamId.logo }
                    : null,
                score: m.homeTeamScore,
                penaltiesScore: m.homeTeamPenaltiesScore,
            },
            away: {
                team: m.awayTeamId
                    ? { name: m.awayTeamId.name, logo: m.awayTeamId.logo }
                    : null,
                score: m.awayTeamScore,
                penaltiesScore: m.awayTeamPenaltiesScore,
            },
        }));

        return NextResponse.json(
            { ...tournament.toObject(), matches: bracketData },
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Nie udało się pobrać danych",
            status: 500,
        });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { tournamentId: string } }
) {
    try {
        const { tournamentId } = await params;
        const { searchParams } = new URL(request.url);
        const competitionId = searchParams.get("competitionId");
        const tournament = await Tournament.findById(tournamentId);
        if (tournament) {
            await Promise.all(
                tournament.matches.map(async (matchId) => {
                    const match = await Match.findById(matchId);
                    if (match) {
                        await deleteMatch(match, match._id as string);
                    }
                })
            );
            await Team.findByIdAndUpdate(tournament.winnerId, {
                $pull: { achievements: { competitionId: tournamentId } },
            });
            await tournament.deleteOne();
        }
        await Competition.findByIdAndDelete(competitionId);

        return NextResponse.json({
            message: "Poprawnie usunięto dane",
            status: 200,
        });
    } catch (error) {
        return NextResponse.json({
            message: "Błąd podczas usuwania danych",
            status: 500,
        });
    }
}