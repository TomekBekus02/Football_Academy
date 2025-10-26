import TeamStats from "@/components/webSideComponents/teamStats/teamStats";
import React from "react";

export default function TeamStat({
    params,
}: {
    params: Promise<{ teamId: string }>;
}) {
    const { teamId } = React.use(params);
    return <TeamStats teamId={teamId} />;
}
