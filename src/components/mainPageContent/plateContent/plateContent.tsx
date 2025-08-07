import classes from './plateContent.module.css'

type PlateContentProps = {
  value: string;
  text: string;
};

export default function plateContent({ value, text }: PlateContentProps){
    return(
        <div className={classes.plateBox}>
            <div className={classes.standingsBox}>
                <h3>{value}</h3>
                <h5>{text}</h5>
            </div>
        </div>
    )
}