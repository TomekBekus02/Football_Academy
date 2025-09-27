import {
    YellowCard,
    RedCard,
    RedYellowCard,
    WinIcon,
    LoseIcon,
    DrawIcon,
    DrawLoseIcon,
    DrawWinIcon,
} from "@/components/icons/matchIcons";
import { Volleyball } from "lucide-react";

export const eventTypeIcon = (type: string) => {
    switch (type) {
        case "Goal":
            return <Volleyball width={20} />;
        case "RedYellowCard":
            return <RedYellowCard width={25} />;
        case "YellowCard":
            return <YellowCard width={25} />;
        case "RedCard":
            return <RedCard width={25} />;
    }
};
export const matchResultIcon = (
    yourTeamScore: number,
    yourTeamPenScore: number,
    oppositeTeamScore: number,
    oppositeTeamPenScore: number,
    IconSize: number
) => {
    // console.log("yourTeamScore: ", yourTeamScore);
    // console.log("yourTeamPenScore: ", yourTeamPenScore);
    // console.log("oppositeTeamScore: ", oppositeTeamScore);
    // console.log("oppositeTeamPenScore: ", oppositeTeamPenScore);
    if (yourTeamScore > oppositeTeamScore) {
        return <WinIcon width={IconSize} height={IconSize} />;
    } else if (yourTeamScore < oppositeTeamScore) {
        return <LoseIcon width={IconSize} height={IconSize} />;
    } else if (yourTeamPenScore > oppositeTeamPenScore) {
        return <DrawWinIcon width={IconSize} height={IconSize} />;
    } else if (yourTeamPenScore < oppositeTeamPenScore) {
        return <DrawLoseIcon width={IconSize} height={IconSize} />;
    } else {
        return <DrawIcon width={IconSize} height={IconSize} />;
    }
};