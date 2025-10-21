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
import { statIcons } from "@/components/icons/matchIcons";

export const eventTypeIcon = (type: string) => {
    switch (type) {
        case "Goal":
            return <h3>{statIcons.goal}</h3>;
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