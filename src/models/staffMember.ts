import mongoose, { Document, Model, Schema } from "mongoose";

export interface IStaffMember extends Document {
    name: string;
    age: number;
    photo: string;
    role: string;
    ageGroup: string;
    teamId: mongoose.Types.ObjectId;
}

const StaffMemberSchema: Schema<IStaffMember> = new Schema({
    name: String,
    age: Number,
    photo: String,
    role: String,
    ageGroup: String,
    teamId: { type: Schema.Types.ObjectId, ref: "Team" },
});

const StaffMember: Model<IStaffMember> =
    mongoose.models.StaffMember ||
    mongoose.model<IStaffMember>("StaffMember", StaffMemberSchema, "Staff");

export default StaffMember;
