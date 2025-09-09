import {
    YellowCard,
    RedCard,
    RedYellowCard,
    WinIcon,
    LoseIcon,
    DrawIcon,
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

export const resultIcon = (homeTeamScore: number, awayTeamScore: number) => {
    if (homeTeamScore > awayTeamScore) {
        return <WinIcon />;
    } else if (homeTeamScore < awayTeamScore) {
        return <LoseIcon />;
    } else {
        return <DrawIcon />;
    }
};
