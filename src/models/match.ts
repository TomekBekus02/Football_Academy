import mongoose, { Document, Model, Schema } from "mongoose";

export interface IMatch extends Document {
    matchDate: string;
    matchHour: string;
    place: string;
    homeTeamId: mongoose.Types.ObjectId;
    awayTeamId: mongoose.Types.ObjectId;
    result: string;
    events: [
        {
            type: string;
            minute: number;
            extraMinute: number;
            playerId: mongoose.Types.ObjectId;
        }
    ];
    tournamentId: string | mongoose.Types.ObjectId;
}

const MatchSchema: Schema<IMatch> = new Schema({
    matchDate: String,
    matchHour: String,
    place: String,
    homeTeamId: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
    awayTeamId: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
    result: String,
    events: [
        {
            type: String,
            minute: Number,
            extraMinute: Number,
            playerId: { type: mongoose.Schema.Types.ObjectId, ref: "Player" },
        },
    ],
    tournamentId: String || {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tournament",
    },
});

const Match: Model<IMatch> =
    mongoose.models.Match ||
    mongoose.model<IMatch>("Match", MatchSchema, "Matches");

export default Match;
