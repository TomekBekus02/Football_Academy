import mongoose, { Model, Schema } from "mongoose";

export interface ITournament extends Document {
    title: string;
    date: string;
    hour: string;
    place: string;
    participants: mongoose.Types.ObjectId[];
    matches: mongoose.Types.ObjectId[];
    topTeams: mongoose.Types.ObjectId[];
    isOnGoing: boolean;
}
const TournamentSchema: Schema<ITournament> = new Schema({
    title: String,
    date: String,
    hour: String,
    place: String,
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Team" }],
    matches: [{ type: mongoose.Schema.Types.ObjectId, ref: "Match" }],
    topTeams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Team" }],
    isOnGoing: Boolean,
});

const Tournament: Model<ITournament> =
    mongoose.models.Tournament ||
    mongoose.model<ITournament>("Tournament", TournamentSchema, "Tournaments");

export default Tournament;
