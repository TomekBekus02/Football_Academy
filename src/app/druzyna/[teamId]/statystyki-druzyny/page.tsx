import React from "react";

export default function TeamStats({
    params,
}: {
    params: Promise<{ teamId: string }>;
}) {
    const { teamId } = React.use(params);
    return (
        <div>
            <h1>Statystyki druzny o ID: {teamId}</h1>
        </div>
    );
}
