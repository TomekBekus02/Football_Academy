import mongoose, { Model, Schema } from "mongoose";

export interface ITournament extends Document {
    title: string;
    date: string;
    hour: string;
    place: string;
    participants: mongoose.Types.ObjectId[];
    topTeams: {
        teamId: mongoose.Types.ObjectId;
        placePodium: number;
    }[];
    isOnGoing: boolean;
}
const TournamentSchema: Schema<ITournament> = new Schema({
    title: String,
    date: String,
    hour: String,
    place: String,
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Team" }],
    topTeams: [
        {
            teamId: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
            placePodium: Number,
        },
    ],
    isOnGoing: Boolean,
});

const Tournament: Model<ITournament> =
    mongoose.models.Tournament ||
    mongoose.model<ITournament>("Tournament", TournamentSchema, "Tournaments");

export default Tournament;
