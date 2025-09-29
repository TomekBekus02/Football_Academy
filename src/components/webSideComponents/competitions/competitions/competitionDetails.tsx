import CompetitionLayout from "./competitions.module.css";

type competitionDetailsType = {
    isFinished: boolean;
    textDate: string;
    textHour: string;
    textPlace: string;
};
export default function competitionDetails({
    isFinished,
    textDate,
    textHour,
    textPlace,
}: competitionDetailsType) {
    return (
        <div className={CompetitionLayout.competitionDetailsBox}>
            <div className={CompetitionLayout.competitionDetailsContent}>
                <h3>Status:</h3>
                <h4>{isFinished ? "Roztrzygnięty" : "Nieroztrzygnięty"}</h4>
            </div>
            <div className={CompetitionLayout.competitionDetailsContent}>
                <h3>Data:</h3>
                <h4>{textDate}</h4>
            </div>
            <div className={CompetitionLayout.competitionDetailsContent}>
                <h3>Godzina:</h3>
                <h4>{textHour}</h4>
            </div>
            <div className={CompetitionLayout.competitionDetailsContent}>
                <h3>Miejsce:</h3>
                <h4>{textPlace}</h4>
            </div>
        </div>
    );
}
