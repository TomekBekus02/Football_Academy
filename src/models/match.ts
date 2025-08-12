import mongoose, { Document, Model, Schema } from "mongoose";

export interface IMatch extends Document {
    homeTeamId: mongoose.Types.ObjectId;
    awayTeamId: mongoose.Types.ObjectId;
    result: string;
    events: [
        {
            type: string;
            minute: number;
            playerId: mongoose.Types.ObjectId;
        }
    ];
}

const MatchSchema: Schema<IMatch> = new Schema({
    homeTeamId: mongoose.Types.ObjectId,
    awayTeamId: mongoose.Types.ObjectId,
    result: String,
    events: [
        {
            type: String,
            minute: Number,
            playerId: { type: mongoose.Types.ObjectId, ref: "Player" },
        },
    ],
});

const Match: Model<IMatch> =
    mongoose.models.Player ||
    mongoose.model<IMatch>("Match", MatchSchema, "Matches");

export default Match;
