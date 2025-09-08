import mongoose, { Document, Model, Schema } from "mongoose";

export interface IMatch extends Document {
    matchDate: string;
    matchHour: string;
    place: string;
    homeTeamId: mongoose.Types.ObjectId;
    homeTeamScore: number;
    awayTeamId: mongoose.Types.ObjectId;
    awayTeamScore: number;
    events: [
        {
            eventType: string;
            teamId: string;
            player: {
                id: mongoose.Types.ObjectId;
                name: string;
                isAvailable: boolean;
            };
            assist_player?: {
                id: mongoose.Types.ObjectId;
                name: string;
                isAvailable: boolean;
            };
            time: {
                base: number;
                extra: number;
            };
        }
    ];
    tournamentId: string | mongoose.Types.ObjectId;
    isOnGoing: boolean;
}

const MatchSchema: Schema<IMatch> = new Schema({
    matchDate: String,
    matchHour: String,
    place: String,
    homeTeamId: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
    homeTeamScore: Number,
    awayTeamId: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
    awayTeamScore: Number,
    events: [
        {
            eventType: String,
            teamId: String,
            player: {
                id: { type: mongoose.Schema.Types.ObjectId, ref: "Player" },
                name: String,
                isAvailable: Boolean,
            },
            assist_player: {
                type: {
                    id: { type: mongoose.Schema.Types.ObjectId, ref: "Player" },
                    name: String,
                    isAvailable: Boolean,
                },
                required: false,
            },
            time: {
                base: Number,
                extra: Number,
            },
        },
    ],
    tournamentId: String || {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tournament",
    },
    isOnGoing: Boolean,
});

const Match: Model<IMatch> =
    mongoose.models.Match ||
    mongoose.model<IMatch>("Match", MatchSchema, "Matches");

export default Match;
