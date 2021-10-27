import mongoose from "mongoose";

const Items = new mongoose.Schema({
    value: {type: String, required: true},
    checked: {type: Boolean, required: true},
    userId: {type: String, required: true},
})

export default mongoose.model('Items', Items)