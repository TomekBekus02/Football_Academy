import React from "react";
import classes from "./label.module.css";

type LabelProps = {
    title: string;
    bodyText: string;
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    backgroundImage: string;
};

export default function label({
    title,
    bodyText,
    Icon,
    backgroundImage,
}: LabelProps) {
    return (
        <div className={classes.labelBox}>
            <div className={classes.labelInner}>
                <div
                    className={classes.labelFront}
                    style={{
                        backgroundImage: ` linear-gradient(rgba(0,0,0,0.4), rgba(0, 0, 0, 0.4)), url(${backgroundImage})`,

                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <Icon width={55} height={55} />
                    <h1>{title}</h1>
                </div>
                <div className={classes.labelBack}>
                    <h4>{bodyText}</h4>
                </div>
            </div>
        </div>
    );
}
