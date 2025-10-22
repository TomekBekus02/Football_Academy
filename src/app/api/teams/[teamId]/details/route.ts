import { connectDB } from "@/lib/mongodb";
import Team from "@/models/team";
import { NextRequest, NextResponse } from "next/server";

const transformTeamStats = (team: any) => {
    return {
        ...team,
        goalsBalance: team.scoredGoals - team.concededGoals,
    };
};
export async function GET(
    req: NextRequest,
    { params }: { params: { teamId: string } }
) {
    try {
    } catch (error) {
        const { teamId } = await params;
        await connectDB();
        const team = await Team.findById(teamId)
            .select(
                "_id matches wins draws loses assists concededGoals scoredGoals"
            )
            .lean();
        const transformedTeamStats = transformTeamStats(team);
        return NextResponse.json(transformedTeamStats, { status: 200 });
    }
}
