import {
    YellowCard,
    RedCard,
    RedYellowCard,
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
