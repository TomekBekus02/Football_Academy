import mongoose, { Document, Model, Schema } from "mongoose";
import { IPlayer } from "./player";

export interface ITeam extends Document {
    name: string;
    logo: string;
    matches: number;
    wins: number;
    draws: number;
    loses: number;
    goal_balance: number;
    form: Array<string>;
    achievements: Array<string>;
}

const TeamSchema: Schema<ITeam> = new Schema({
    name: String,
    logo: String,
    matches: Number,
    wins: Number,
    draws: Number,
    loses: Number,
    goal_balance: Number,
    form: Array<String>,
    achievements: Array<String>,
});

const Team: Model<ITeam> =
    mongoose.models.Team || mongoose.model<ITeam>("Team", TeamSchema);

export default Team;
