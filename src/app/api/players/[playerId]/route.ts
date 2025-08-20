import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Player from "@/models/player";
import fs from "fs";

export async function GET(
    request: NextRequest,
    { params }: { params: { playerId: string } }
) {
    try {
        await connectDB();
        const { playerId } = await params;
        const player = await Player.findById(playerId);

        if (!player) {
            return NextResponse.json(
                { message: "Gracz nie znaleziony" },
                { status: 404 }
            );
        }
        return NextResponse.json(player, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Błąd przy pobieraniu graczy" },
            { status: 500 }
        );
    }
}
export async function PUT(
    req: Request,
    { params }: { params: { playerId: string } }
) {
    try {
        await connectDB();
        const { playerId } = await params;
        const formData = await req.formData();
        const name = formData.get("name") as string;
        const dateBirth = formData.get("dateOfBirth") as string;
        const position = formData.get("position") as string;
        const shirtNumber = formData.get("number") as string;
        const photo = formData.get("photo") as File | null;
        let photoPath = formData.get("photoPath") as string;

        if (photo && photo?.size !== 0) {
            const extension = photo?.name.split(".").pop();
            const fileName = `${name.replace(" ", "_")}.${extension}`;
            const bufferedImage: ArrayBuffer = await photo.arrayBuffer();

            await fs.promises.writeFile(
                `public/players/${fileName}`,
                Buffer.from(bufferedImage)
            );
            if (`/players/${fileName}` !== photoPath) {
                fs.unlink(`public/${photoPath}`, (err) => {
                    if (err) {
                        console.error("Błąd przy usuwaniu pliku:", err);
                        return NextResponse.json(
                            { message: "Błąd przy usuwaniu pliku" },
                            { status: 500 }
                        );
                    }
                    console.log("Plik został usunięty:", photoPath);
                });
                photoPath = `/players/${fileName}`;
            }
        }
        const updatedPlayer = await Player.findByIdAndUpdate(playerId, {
            name,
            shirtNumber,
            dateOfBirth: dateBirth,
            photo: photoPath,
            position,
            new: true,
        });
        if (!updatedPlayer) {
            return NextResponse.json(
                { message: "Nie znaleziono piłkarza" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Zaktualizowano piłkarza" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Błąd POST /api/players:", error);
        return NextResponse.json(
            { message: "Nie udało się dodać piłkarza" },
            { status: 500 }
        );
    }
}
export async function DELETE(
    req: Request,
    { params }: { params: { playerId: string } }
) {
    try {
        const { playerId } = await params;
        await connectDB();
        const player = await Player.findById(playerId);
        const photoPath = player?.photo;
        fs.unlink(`public/${photoPath}`, (err) => {
            if (err) {
                return NextResponse.json(
                    { message: "Błąd przy usuwaniu pliku" },
                    { status: 500 }
                );
            }
        });
        await Player.findByIdAndDelete(playerId);
        return NextResponse.json(
            { message: "Usunieto Zawodnika" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Błąd przy usuwaniu graczy" },
            { status: 500 }
        );
    }
}
