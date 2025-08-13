import { IStaffMember } from "@/types/IStaffMember";

export async function FetchStaff(): Promise<IStaffMember[]> {
    const res = await fetch("/api/staff");

    if (!res.ok) {
        throw new Error("Błąd podczas pobierania danych");
    }

    return res.json();
}
