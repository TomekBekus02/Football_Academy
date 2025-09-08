import classes from './label.module.css'

type LabelProps = {
    title: string,
    bodyText: string
}

export default function label({title, bodyText}: LabelProps){
    return(
        <div className={classes.labelBox}>
            <div className={classes.labelContent}>
                <h2>{title}</h2>
                <p>{bodyText}</p>
            </div>
        </div>
    )
}