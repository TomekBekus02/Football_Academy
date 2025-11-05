import { aboutUsText } from "@/data/aboutUsText";
import classes from "./aboutUs.module.css";
import Label from "./label/label";
import { Rocket, Heart, Crosshair, Sprout } from "lucide-react";
import mainStyles from "../main-page.module.css";

export default function aboutUs() {
    return (
        <div className={classes.aboutUsBox}>
            <h1 className={mainStyles.title}>O nas</h1>
            <div className={classes.labelsBox}>
                <Label
                    title="Misja"
                    bodyText={aboutUsText["Misja"]}
                    Icon={Rocket}
                    backgroundImage={"/aboutUs/missionIMG.jpg"}
                />
                <Label
                    title="Pasja"
                    bodyText={aboutUsText["Pasja"]}
                    Icon={Heart}
                    backgroundImage={"/aboutUs/passionIMG.jpg"}
                />
                <Label
                    title="Cel"
                    bodyText={aboutUsText["Cel"]}
                    Icon={Crosshair}
                    backgroundImage={"/aboutUs/aimIMG.jpg"}
                />
                <Label
                    title="Rozwój"
                    bodyText={aboutUsText["Rozwój"]}
                    Icon={Sprout}
                    backgroundImage={"/aboutUs/developmentIMG.jpg"}
                />
            </div>
        </div>
    );
}
