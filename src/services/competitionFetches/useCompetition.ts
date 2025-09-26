export async function fetchCompetitions() {
    const res = await fetch(`/api/competitions`);
    const data = await res.json();

    return data;
}
