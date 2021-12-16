import Assignment from "../assignment/assignment.model.js";
import Course from "../course/course.model.js";
import Review from "./review.model.js";

export default {
    studentGetRequest: async (req, res) => {
        const courseId = req.params.courseId;
        const studentId = req.user.studentID;
        const course = await Course.findById(courseId, "gradeBoard");

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
                    message: review
                });
            });
        }
    },
};