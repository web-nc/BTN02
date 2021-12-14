import mongoose from 'mongoose';

const Grade = new mongoose.Schema({
    assignment: mongoose.Schema.Types.ObjectId,
    studentId: String,
    finalized: { type: Boolean, default: false },
    point: Number,
});

export default mongoose.model("grade", Grade, "grade");