import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type: String, required: true},
    password: {type: String, required: true},
    role: {type: Number, default: 0},
    coins: {type: Number, default: 0},
    upgradeStage: {type: Number, default: 1},
});

export default mongoose.model("User", userSchema);