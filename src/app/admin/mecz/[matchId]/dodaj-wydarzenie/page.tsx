export default function addMatchEvent({
    params,
}: {
    params: { matchId: string };
}) {
    const { matchId } = params;
    return (
        <div>
            <h1>Dodaj nowy event w meczu o ID: {matchId}</h1>
        </div>
    );
}
