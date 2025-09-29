import { MatchStatus } from "@/types/IMatch";
import PenaltiesPanelLayout from "./penaltiesPanel.module.css";
export interface matchPenalties {
    homeTeam: number;
    awayTeam: number;
}
interface penaltiesParams {
    matchPenalties: matchPenalties;
    handlePenaltiesScore: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PenaltiesPanel({
    handlePenaltiesScore,
    matchPenalties,
}: penaltiesParams) {
    return (
        <div className={PenaltiesPanelLayout.penBox}>
            <h1>Karne</h1>
            <form>
                <div className={PenaltiesPanelLayout.inputGroup}>
                    <input
                        type="number"
                        name="homeTeam"
                        defaultValue={matchPenalties.homeTeam}
                        onChange={handlePenaltiesScore}
                    />
                    <label>Gosp.</label>
                </div>
                <h1>:</h1>
                <div className={PenaltiesPanelLayout.inputGroup}>
                    <input
                        type="number"
                        name="awayTeam"
                        defaultValue={matchPenalties.awayTeam}
                        onChange={handlePenaltiesScore}
                    />
                    <label>Goście</label>
                </div>
            </form>
        </div>
    );
}
