import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import StaffMember from "@/models/staffMember";
import fs from "fs";

export async function GET() {
    try {
        await connectDB();
        const staffMembers = await StaffMember.find();
        return NextResponse.json(staffMembers, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Błąd przy pobieraniu sztabu" },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        await connectDB();
        const formData = await req.formData();
        const name = formData.get("name") as string;
        const age = formData.get("age") as number | null;
        const photo = formData.get("photo") as File | null;
        const role = formData.get("role") as string;
        const ageGroup = formData.get("ageGroup") as string;
        let photoPath = "/staff/default_staff.png";

        if (photo) {
            const extension = photo?.name.split(".").pop();
            const fileName = `${name.replace(" ", "_")}.${extension}`;
            const bufferedImage: ArrayBuffer = await photo.arrayBuffer();

            await fs.promises.writeFile(
                `public/staff/${fileName}`,
                Buffer.from(bufferedImage)
            );
            photoPath = `/staff/${fileName}`;
        }
        const newMember = new StaffMember({
            name,
            age,
            photo: photoPath,
            role,
            ageGroup,
        });
        await newMember.save();

        return NextResponse.json(
            { message: "Dodano piłkarza" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Błąd przy pobieraniu sztabu" },
            { status: 500 }
        );
    }
}
