import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import StaffMember from "@/models/staffMember";

export async function GET() {
    try {
        await connectDB();
        const staffMembers = await StaffMember.find();
        console.log(staffMembers);
        return NextResponse.json(staffMembers, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Błąd przy pobieraniu sztabu" },
            { status: 500 }
        );
    }
}
