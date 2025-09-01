export async function fetchTeams() {
    const res = await fetch("/api/teams");
    return res.json();
}
export async function fetchTeamDetails(teamId: string) {
    const res = await fetch(`/api/teams/${teamId}`);
    return res.json();
}
