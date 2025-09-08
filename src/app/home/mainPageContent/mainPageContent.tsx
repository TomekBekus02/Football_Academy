import classes from './mainPageContent.module.css'
import PlateContent from './plateContent/plateContent'

export default function mainPageContent() {
    return (
        <div className={classes.contentBox}>
            <h1>Rozwijaj swój talent piłkarski z nami</h1>
            <h4>
                Profesjonalna szkółka piłkarska z nowoczesnym podejściem
                do treningu i rozwoju młodych talentów
            </h4>
            <div className={classes.statsBox}>
                <PlateContent value="150+" text="Zawodników"/>
                <PlateContent value="30" text="Członków sztabu"/>
                <PlateContent value="15" text="Lat doświadczenia"/>
                <PlateContent value="25" text="Trofeów"/>
            </div>
        </div>
    )
}