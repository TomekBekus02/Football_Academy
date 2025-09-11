import React from "react";

export default function TournamentProgress({
    params,
}: {
    params: Promise<{ tournamentId: string }>;
}) {
    const { tournamentId } = React.use(params);

    return (
        <div>
            <h1>Tournament: {tournamentId}</h1>
        </div>
    );
}
