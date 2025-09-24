import { IStaffMember } from "@/types/IStaffMember";
import axios from "axios";

export async function FetchStaff(): Promise<IStaffMember[]> {
    const res = await fetch("/api/staff");

    if (!res.ok) {
        throw new Error("Błąd podczas pobierania danych");
    }

    return res.json();
}

export async function FetchStaffMember(memberId: string) {
    const res = await fetch(`/api/staff/${memberId}`);

    if (!res.ok) {
        throw new Error("Błąd podczas pobierania danych");
    }
    return res.json();
}

export async function addStaffMember(newMember: FormData) {
    const res = axios.post("/api/staff", newMember);

    return (await res).status;
}

export async function deleteStaffMember(memberId: string) {
    const res = axios.delete(`/api/staff/${memberId}`);

    return (await res).status;
}

export async function editStaffMember({
    memberId,
    formData,
}: {
    memberId: string;
    formData: FormData;
}) {
    const res = axios.put(`/api/staff/${memberId}`, formData);
    if ((await res).status != 200)
        throw new Error("Nie udało się pobrać danych gracza");
    return (await res).status;
}
