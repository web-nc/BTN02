import Assignment from "../assignment/assignment.model.js";
import Grade from "../grade/grade.model.js";
import Review from "./review.model.js";

export default {
    studentGetRequest: async (req, res) => {
        const courseId = req.params.courseId;
        const studentId = req.user.studentID;

        Assignment.find({
            course: courseId,
        }, "id")
        .exec(async (e, assignments) => {
            if (e) {
                return res.status(500).json({ message: e });
            }
            let result = await Review.find({
                assignment: { $in: assignments },
                studentId: studentId
            });
            return res.status(200).json(result);
        });
    },

    teacherGetRequest: async (req, res) => {
        const courseId = req.params.courseId;

        Assignment.find({
            course: courseId,
        }, "id")
        .exec(async (e, assignments) => {
            if (e) {
                return res.status(500).json({ message: e });
            }
            let result = await Review.find({
                assignment: { $in: assignments },
                reviewed: false
            });
            return res.status(200).json(result);
        });
    },

    newReview: async (req, res) => {
        const { assignment, currentPoint, expectedPoint, explanation } = req.body.data;
        const studentId = req.user.studentID;
        const studentName = req.user.firstname + ' ' + req.user.lastname;

        const isRequested = await Review.count({ assignment: assignment, reviewed: false });
        if (isRequested) {
            return res.status(200).json({
                successful: false,
                message: "Yêu cầu của bạn đang được xử lí!"
            });
        } else {
            Review.create({
                assignment, studentId, studentName, currentPoint, expectedPoint, explanation
            }, (e, review) => {
                if (e) {
                    return res.status(500).json({ message: e });
                }
                res.status(200).json({
                    successful: true,
                    newReview: review
                });
            });
        }
    },

    teacherReview: async (req, res) => {
        const { review, updatedPoint, teacherComment } = req.body.data;
        const updatingReview = await Review.findById(review);
        Grade.updateOne(
            { assignment: updatingReview.assignment, studentId: updatingReview.studentId},
            { point: updatedPoint },
            function (err, doc) {
                if (err) return res.send(500, {error: err});
                if (!doc) return res.send(500, {error: 'INVALID_INPUT'});
                updatingReview.teacherComment = teacherComment;
                updatingReview.updatedPoint = updatedPoint;
                updatingReview.reviewed = true;
                updatingReview.save();
                res.status(200).json({ message: "UPDATE_SUCCESSFUL" });
            }
        );
    },
};