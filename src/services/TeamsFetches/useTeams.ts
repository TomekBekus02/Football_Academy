export default async function fetchTeams() {
    const res = await fetch("/api/teams");
    return res.json();
}
