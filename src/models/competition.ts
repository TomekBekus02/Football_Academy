import mongoose, { Document, Model, Schema } from "mongoose";

export interface ICompetition extends Document {
    isOngoing: boolean;
    label: string;
    competitionId: mongoose.Types.ObjectId;
    competitionType: "Match" | "Tournament";
}

const CompetitionSchema: Schema<ICompetition> = new Schema({
    isOngoing: Boolean,
    label: String,
    competitionId: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "competitionType",
    },
    competitionType: {
        type: String,
        enum: ["Match", "Tournament"],
    },
});

const Competition: Model<ICompetition> =
    mongoose.models.Competition ||
    mongoose.model<ICompetition>(
        "Competition",
        CompetitionSchema,
        "Competitions"
    );

export default Competition;
