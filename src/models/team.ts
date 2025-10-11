import mongoose, { Document, Model, Schema } from "mongoose";

export interface ITeam extends Document {
    name: string;
    logo: string;
    matches: number;
    wins: number;
    draws: number;
    loses: number;
    scoredGoals: number;
    concededGoals: number;
    form: {
        matchId: mongoose.Types.ObjectId;
        matchDate: string;
        homeTeam: {
            id: string;
            name: string;
            score: number;
            penalties: number;
        };
        awayTeam: {
            id: string;
            name: string;
            score: number;
            penalties: number;
        };
    }[];
    achievements: {
        competitionId: mongoose.Types.ObjectId;
        competitonTitle: string;
        place: string;
    }[];
}

const TeamSchema: Schema<ITeam> = new Schema({
    name: String,
    logo: String,
    matches: Number,
    wins: Number,
    draws: Number,
    loses: Number,
    scoredGoals: Number,
    concededGoals: Number,
    form: [
        {
            matchId: { type: mongoose.Schema.Types.ObjectId, ref: "Match" },
            matchDate: String,
            homeTeam: {
                id: String,
                name: String,
                score: Number,
                penalties: Number,
            },
            awayTeam: {
                id: String,
                name: String,
                score: Number,
                penalties: Number,
            },
        },
    ],
    achievements: [
        {
            competitionId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Competition",
            },
            competitonTitle: String,
            place: String,
        },
    ],
});

const Team: Model<ITeam> =
    mongoose.models.Team || mongoose.model<ITeam>("Team", TeamSchema, "Teams");

export default Team;
