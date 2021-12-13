import mongoose from 'mongoose';

const Grade = new mongoose.Schema({
    assignment: mongoose.Schema.Types.ObjectId,
    studentID: String,
    finalized: Boolean,
    point: Number,
});

export default mongoose.model("grade", Grade, "grade");