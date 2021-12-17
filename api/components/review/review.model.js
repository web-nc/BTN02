import mongoose from 'mongoose';

const Review = new mongoose.Schema({
    assignment: mongoose.Schema.Types.ObjectId,
    studentId: String,
    studentName: String,
    currentPoint: Number,
    expectedPoint: Number,
    explanation: String,
    teacherComment: { type: String, default: '' },
    updatedPoint: { type: Number, default: 0 },
    reviewed: { type: Boolean, default: false },
});

export default mongoose.model("review", Review, "review");