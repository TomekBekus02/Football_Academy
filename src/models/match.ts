import mongoose, { Document, Model, Schema } from "mongoose";

export enum MatchStatus {
    CREATED = "CREATED",
    IN_PROGRESS = "IN_PROGRESS",
    FINISHED = "FINISHED",
}

export interface IMatch extends Document {
    matchDate: string;
    matchHour: string;
    place: string;
    homeTeamId: mongoose.Types.ObjectId;
    homeTeamScore: number;
    homeTeamPenaltiesScore: number;
    awayTeamId: mongoose.Types.ObjectId;
    awayTeamScore: number;
    awayTeamPenaltiesScore: number;
    round: number;
    matchNumber: number;
    events: {
        _id: mongoose.Types.ObjectId;
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
    }[];
    tournamentId: string | mongoose.Types.ObjectId;
    matchStatus: MatchStatus;
    isOverTime: boolean;
}

const MatchSchema: Schema<IMatch> = new Schema({
    matchDate: String,
    matchHour: String,
    place: String,
    homeTeamId: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
    homeTeamScore: Number,
    homeTeamPenaltiesScore: Number,
    awayTeamId: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
    awayTeamScore: Number,
    awayTeamPenaltiesScore: Number,
    round: Number,
    matchNumber: Number,
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
    matchStatus: {
        type: String,
        enum: Object.values(MatchStatus),
        default: MatchStatus.CREATED,
    },
    isOverTime: {
        type: Boolean,
        default: false,
    },
});

const Match: Model<IMatch> =
    mongoose.models.Match ||
    mongoose.model<IMatch>("Match", MatchSchema, "Matches");

export default Match;
