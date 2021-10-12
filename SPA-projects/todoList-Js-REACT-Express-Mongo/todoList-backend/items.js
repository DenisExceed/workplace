import mongoose from "mongoose";

const Items = new mongoose.Schema({
    user: {type: String, required: false},
    value: {type: String, required: false},
    checked: {type: Boolean, required: false},
})

export default mongoose.model('Items', Items)