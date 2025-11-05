import classes from "./card.module.css";

type CardParams = {
    title: string;
    icon: string;
    values: number | string;
};

export default function Card({ title, icon, values }: CardParams) {
    return (
        <div className={classes.cardBox}>
            <div className={classes.header}>
                <h2>{title}</h2>
                <h2>{icon}</h2>
            </div>
            <div className={classes.content}>
                <p>{values}</p>
            </div>
        </div>
    );
}
