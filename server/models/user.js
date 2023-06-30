import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    followers: { type: [String], default: [] },
    following: { type: [String], default: [] },
    id: { type: String },
})

export default mongoose.model("User", userSchema);