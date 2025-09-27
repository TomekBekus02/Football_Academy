import { connectDB } from "@/lib/mongodb";
import Match from "@/models/match";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
    req: NextRequest,
    { params }: { params: { matchId: string; eventId: string } }
) {
    try {
        const { matchId, eventId } = await params;
        await connectDB();
        const match = await Match.findById(matchId);
        if (match) {
            const newEvents = match.events.filter(
                (e) => e._id.toString() !== eventId
            );
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
