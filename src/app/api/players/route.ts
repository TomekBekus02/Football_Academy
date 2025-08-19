import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Player from "@/models/player";
import fs from "fs";

export async function GET() {
    try {
        await connectDB();
        const teamID = "689a4c7170a41052e449061b"; //hard Coded for dev purposes
        const players = await Player.find({ teamId: teamID });

        return NextResponse.json(players, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Błąd przy pobieraniu graczy" },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        await connectDB();
        const formData = await req.formData();
        const name = formData.get("name") as string;
        const dateBirth = formData.get("dateOfBirth") as string;
        const position = formData.get("position") as string;
        const shirtNumber = formData.get("number") as string;
        const photo = formData.get("photo") as File | null;
        let photoPath = "/players/default_player.png";

        if (photo) {
            const extension = photo?.name.split(".").pop();
            const fileName = `${name.replace(" ", "_")}.${extension}`;
            const bufferedImage: ArrayBuffer = await photo.arrayBuffer();

            await fs.promises.writeFile(
                `public/players/${fileName}`,
                Buffer.from(bufferedImage)
            );
            photoPath = `/players/${fileName}`;
        }
        const newPlayer = new Player({
            teamId: "689a4c7170a41052e449061b",
            name,
            shirtNumber,
            dateOfBirth: dateBirth,
            photo: photoPath,
            position,
            appearances: 0,
            cleanSheet: 0,
            goals: 0,
            assists: 0,
            MVPs: 0,
            redCards: 0,
            yellowCards: 0,
        });
        await newPlayer.save();

        return NextResponse.json(
            { message: "Dodano piłkarza" },
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

