import { Schema, model } from "mongoose";
import { IUser } from "interfaces/IUser";

/**
 * Standard initialization of Mongoose Models to use it as documents inside MongoDB.
 */

const userModel = new Schema<IUser>({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
}, {
    timestamps: true
});

export const User = model<IUser>("User", userModel);