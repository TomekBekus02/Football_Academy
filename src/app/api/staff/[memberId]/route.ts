import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import StaffMember from "@/models/staffMember";
import fs from "fs";

export async function GET(
    req: NextRequest,
    { params }: { params: { memberId: string } }
) {
    try {
        await connectDB();
        const { memberId } = await params;
        const member = await StaffMember.findById(memberId);
        if (!member) {
            return NextResponse.json(
                { message: "Członka sztabu nie znaleziono" },
                { status: 404 }
            );
        }
        return NextResponse.json(member, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Błąd przy pobieraniu członka sztabu" },
            { status: 500 }
        );
    }
}

export async function PUT(
    req: Request,
    { params }: { params: { memberId: string } }
) {
    try {
        const { memberId } = params;
        await connectDB();
        const formData = await req.formData();
        const name = formData.get("name") as string;
        const age = formData.get("age") as number | null;
        const photo = formData.get("photo") as File | null;
        const role = formData.get("role") as string;
        const ageGroup = formData.get("ageGroup") as string;
        let photoPath = formData.get("photoPath") as string;

        if (photo && photo?.size !== 0) {
            const extension = photo?.name.split(".").pop();
            const fileName = `${name.replace(" ", "_")}.${extension}`;
            const bufferedImage: ArrayBuffer = await photo.arrayBuffer();

            await fs.promises.writeFile(
                `public/staff/${fileName}`,
                Buffer.from(bufferedImage)
            );
            if (`/staff/${fileName}` !== photoPath) {
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
                photoPath = `/staff/${fileName}`;
            }
        }

        const updatedStaffMember = await StaffMember.findByIdAndUpdate(
            memberId,
            {
                name,
                age,
                photo: photoPath,
                role,
                ageGroup,
            }
        );

        if (!updatedStaffMember) {
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
        return NextResponse.json(
            { message: "Nie udało się dodać piłkarza" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { memberId: string } }
) {
    try {
        const { memberId } = await params;
        await connectDB();
        const member = await StaffMember.findById(memberId);
        const photoPath = member?.photo;
        fs.unlink(`public/${photoPath}`, (err) => {
            if (err) {
                return NextResponse.json(
                    { message: "Błąd przy usuwaniu pliku" },
                    { status: 500 }
                );
            }
        });
        await StaffMember.findByIdAndDelete(memberId);
        return NextResponse.json(
            { message: "Usunieto członka sztabu" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Błąd podczas usuwania członka sztabu" },
            { status: 500 }
        );
    }
}
