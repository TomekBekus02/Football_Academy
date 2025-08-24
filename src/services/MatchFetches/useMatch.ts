import axios from "axios";

export async function createMatch(newMatch: FormData) {
    const res = await axios.post("/api/matches", newMatch);

    return res.status;
}
