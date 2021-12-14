import Assignment from "../assignment/assignment.model.js";
import Grade from "./grade.model.js";

export default {
    getGrades: (req, res) => {
        const courseId = req.params.courseId;
        const studentId = req.query.studentId;
        
        Assignment.find({course: courseId}, "id")
        .sort('order')
        .exec(async (e, assignments) => {
            if (e) {
                return res.status(500).json({ message: e });
            }
            const result = await Grade.find({
                assignment: { $in: assignments },
                studentId: studentId
            });
            
            return res.status(200).json(result);
        });
    },
};