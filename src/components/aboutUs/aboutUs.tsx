import { aboutUsText } from '../../data/aboutUsText'
import classes from './aboutUs.module.css'
import Label from './label/label'

export default function aboutUs() {
    return (
        <div className={classes.aboutUsBox}>
            <h1>O Nas</h1>
            <div className={classes.labelsBox}>
                <Label title='Misja' bodyText={aboutUsText['Misja']}/>
                <Label title='Pasja' bodyText={aboutUsText['Pasja']}/>
                <Label title='Cel' bodyText={aboutUsText['Cel']}/>
                <Label title='Rozwój' bodyText={aboutUsText['Rozwój']}/>
            </div>
        </div>
    )
}