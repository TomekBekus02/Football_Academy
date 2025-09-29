import { connectDB } from "@/lib/mongodb";
import Match from "@/models/match";
import { NextRequest, NextResponse } from "next/server";

interface IResult {
    homeTeamResult: number;
    awayTeamResult: number;
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { matchId: string; eventId: string } }
) {
    try {
        const { matchId, eventId } = await params;
        const { searchParams } = new URL(req.url);
        const resultParam = searchParams.get("result");
        console.log("resultParam", JSON.stringify(resultParam, null, 2));
        let result: IResult | null = null;

        if (resultParam) {
            result = JSON.parse(resultParam) as IResult;
        }
        await connectDB();
        const match = await Match.findById(matchId);
        if (match) {
            const newEvents = match.events.filter(
                (e) => e._id.toString() !== eventId
            );
            if (result) {
                match.homeTeamScore = result.homeTeamResult;
                match.awayTeamScore = result.awayTeamResult;
            }
            match.events = newEvents;
            await match.save();
            return NextResponse.json({
                message: "Poprawnie usunięto event",
                status: 200,
            });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Nie udało się usunąć eventu",
            status: 500,
        });
    }
}
