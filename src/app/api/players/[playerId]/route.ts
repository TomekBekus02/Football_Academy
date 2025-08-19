import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Player from "@/models/player";

export async function GET(
    request: NextRequest,
    { params }: { params: { playerId: string } }
) {
    try {
        console.log("params.id: ", params.playerId);
        await connectDB();
        const player = await Player.findById(params.playerId);
        if (!player) {
            return NextResponse.json(
                { message: "Gracz nie znaleziony" },
                { status: 404 }
            );
        }
        return NextResponse.json(player, { status: 200 });
    } catch (error) {
        console.log("error", error);
        return NextResponse.json(
            { message: "Błąd przy pobieraniu graczy" },
            { status: 500 }
        );
    }
}

// export async function PUT({ params }: { params: { id: string } }) {
//     try {
//         await connectDB();
//         const player = await Player.findByIdAndUpdate(params.id);
//         return NextResponse.json(player);
//     } catch (error) {
//         return NextResponse.json(
//             { message: "Błąd przy pobieraniu graczy" },
//             { status: 500 }
//         );
//     }
// }
// export async function DELETE({ params }: { params: { id: string } }) {
//     try {
//         await connectDB();
//         await Player.findByIdAndDelete(params.id);
//         return NextResponse.json(
//             { message: "Usunieto Zawodnika" },
//             { status: 200 }
//         );
//     } catch (error) {
//         return NextResponse.json(
//             { message: "Błąd przy usuwaniu graczy" },
//             { status: 500 }
//         );
//     }
// }
