import mongoose, { Document, Model, Schema } from "mongoose";

export interface IPlayer extends Document {
    name: string;
    dateOfBirth: string;
    photo: string;
    position: string;
    appearances: number;
    cleanSheet: number;
    goals: number;
    assists: number;
    MVPs: number;
    redCards: number;
    yellowCards: number;
    teamId: mongoose.Types.ObjectId;
}

const PlayerSchema: Schema<IPlayer> = new Schema({
    name: String,
    dateOfBirth: String,
    position: String,
    appearances: Number,
    cleanSheet: Number,
    goals: Number,
    assists: Number,
    MVPs: Number,
    redCards: Number,
    yellowCards: Number,
    teamId: { type: Schema.Types.ObjectId, ref: "Team" },
});

const Player: Model<IPlayer> =
    mongoose.models.Player || mongoose.model<IPlayer>("Player", PlayerSchema);

export default Player;
