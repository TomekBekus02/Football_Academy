
import { LucideIcon } from "lucide-react";
import classes from './card.module.css'

type CardParams ={
    title: string,
    icon: LucideIcon,
    values: number
}

export default function Card({title, icon: Icon, values}: CardParams){
    return (
        <div className={classes.cardBox}>
            <div className={classes.header}>
                <h2>{title}</h2>
                <Icon size={30}/>
            </div>
            <div className={classes.content}>
                <p>{values}</p>
            </div>
        </div>
    )
}