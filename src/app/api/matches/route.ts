import { connectDB } from "@/lib/mongodb";
import { addCompetition } from "@/lib/updateCompetitions";
import Match from "@/models/match";
import Player from "@/models/player";
import Team from "@/models/team";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const homeTeamId = searchParams.get("homeTeam");
        const awayTeamId = searchParams.get("awayTeam");

        const homeTeamName = await Team.findById(homeTeamId).select(
            "_id, name"
        );
        const awayTeamName = await Team.findById(awayTeamId).select(
            "_id, name"
        );
        if (!awayTeamName || !homeTeamName) {
            return NextResponse.json({
                message: "Nie znaleziono drużyny",
                status: 404,
            });
        }
        const homeTeamPlayers = await Player.find({
            teamId: homeTeamId,
        }).select("name shirtNumber");
        const awayTeamPlayers = await Player.find({
            teamId: awayTeamId,
        }).select("name shirtNumber");
        if (!homeTeamPlayers || !awayTeamPlayers) {
            return NextResponse.json({
                message: "Nie znaleziono zawodników tej drużyny",
                status: 404,
            });
        }
        const fullData = {
            homeTeam: {
                _id: homeTeamName._id,
                name: homeTeamName.name,
                players: homeTeamPlayers,
            },
            awayTeam: {
                _id: awayTeamName._id,
                name: awayTeamName.name,
                players: awayTeamPlayers,
            },
        };

        return NextResponse.json(fullData, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Wystąpił błąd podczas pobierania danych",
            status: 500,
        });
    }
}
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
        let tournamentId = formData.get("tournamentId") as string;
        if (!tournamentId) {
            tournamentId = "";
        }

        const newMatch = new Match({
            homeTeamId,
            homeTeamScore: 0,
            awayTeamId,
            awayTeamScore: 0,
            matchDate,
            matchHour,
            place,
            events: [],
            tournamentId,
            isOnGoing: true,
        });
        await newMatch.save();

        await addCompetition(label, newMatch._id as mongoose.Types.ObjectId);

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
