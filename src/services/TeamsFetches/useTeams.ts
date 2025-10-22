export async function fetchTeams() {
    const res = await fetch("/api/teams");
    return res.json();
}

export async function fetchTeamDetails(teamId: string) {
    const res = await fetch(`/api/teams/${teamId}`);
    return res.json();
}

export async function fetchTeamsBasics() {
    const res = await fetch("/api/teams/basics");
    return res.json();
}

export async function fetchTeamStats(teamId: string) {
    const res = await fetch(`/api/teams/${teamId}/details`);
    return res.json();
}