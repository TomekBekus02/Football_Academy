export default function editPlayer({
    params,
}: {
    params: { editedPlayerId: string };
}) {
    return <div>edited player: {params.editedPlayerId}</div>;
}
