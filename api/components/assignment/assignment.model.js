import mongoose from 'mongoose';

const Assignment = new mongoose.Schema({
    course: mongoose.Schema.Types.ObjectId,
    name: String,
    weight: Number,
    order: Number,
});

export default mongoose.model("assignment", Assignment, "assignment");