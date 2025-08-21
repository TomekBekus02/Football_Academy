import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import StaffMember from "@/models/staffMember";
import fs from "fs";

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
