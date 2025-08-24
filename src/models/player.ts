import mongoose, { Document, Model, Schema } from "mongoose";

export interface IPlayer extends Document {
    name: string;
    shirtNumber: string;
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
    shirtNumber: String,
    dateOfBirth: String,
    photo: { type: String, default: "/players/default_player.png" },
    position: String,
    appearances: { type: Number, default: 0 },
    cleanSheet: { type: Number, default: 0 },
    goals: { type: Number, default: 0 },
    assists: { type: Number, default: 0 },
    MVPs: { type: Number, default: 0 },
    redCards: { type: Number, default: 0 },
    yellowCards: { type: Number, default: 0 },
    teamId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
        default: "689a4c7170a41052e449061b",
    },
});

const Player: Model<IPlayer> =
    mongoose.models.Player ||
    mongoose.model<IPlayer>("Player", PlayerSchema, "Players");

export default Player;
