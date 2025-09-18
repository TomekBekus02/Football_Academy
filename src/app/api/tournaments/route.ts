import { connectDB } from "@/lib/mongodb";
import { createNewMatch } from "@/lib/services/matchService";
import { addCompetition } from "@/lib/updateCompetitions";
import Match, { MatchStatus } from "@/models/match";
import Tournament from "@/models/tournament";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

function shuffleArray<T>(array: T[]): T[] {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}


export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { title, date, hour, place, participants } = body;
        await connectDB();
        const newTournament = new Tournament({
            title,
            date,
            hour,
            place,
            participants: shuffleArray(participants),
            topTeams: [],
            isOnGoing: true,
        });
        await newTournament.save();
        await addCompetition(
            "Tournament",
            newTournament._id as mongoose.Types.ObjectId
        );
        const tournament = await Tournament.findById(newTournament._id);

        if (tournament) {
            const matchPromises = [];
            const maxRounds = Math.log2(participants.length);

            for (let round = 1; round <= maxRounds; round++) {
                const matchesInRound = participants.length / Math.pow(2, round);
                let matchNumber = 1;

                for (let i = 0; i < matchesInRound * 2; i += 2) {
                    const home = round === 1 ? participants[i] : null;
                    const away = round === 1 ? participants[i + 1] : null;

                    matchPromises.push(
                        createNewMatch(
                            home,
                            away,
                            date,
                            hour,
                            place,
                            round,
                            matchNumber,
                            newTournament._id
                        )
                    );
                    matchNumber++;
                }
            }
            const createdMatches = await Promise.all(matchPromises);
            tournament.matches = createdMatches.map(
                (m) => new mongoose.Types.ObjectId(m._id as string)
            );

            await tournament.save();
        }
        return NextResponse.json({
            message: "Pomyślnie stworzono turniej",
            status: 200,
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Błąd serwera, spróbuj ponownie",
            status: 500,
        });
    }
}
