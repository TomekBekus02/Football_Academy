export async function fetchCompetitions(isOnGoing: boolean) {
    const res = await fetch(`/api/competitions?isOnGoing=${isOnGoing}`);
    const data = await res.json();
    console.log(data);
    return data;
}
