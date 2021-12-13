import Course from "../course/course.model.js";
import Assignment from "./assignment.model.js";

export default {
    getAssignments: (req, res) => {
        const courseId = req.params.courseId;

        Assignment.find({course: courseId}, "id course name weight")
        .sort('order')
        .exec(async (e, assignments) => {
            if (e) {
                return res.status(500).json({ message: e });
            }
            return res.status(200).json({ assignments: assignments });
        });
    },

    createAssignment: async (req, res) => {
        const courseId = req.params.courseId;
        const { name, weight } = req.body;

        const course = Course.findOne({ _id: courseId })
        .then(async (course) => {
            if (!course) {
                return res.status(500).json({ message: 'INCORRECT_COURSEID' });
            }
            
            const assignmentsInCourse = await Assignment.count({ course: courseId });

            Assignment.create(
            {
                course: courseId,
                name,
                weight,
                order: assignmentsInCourse + 1,
                exercises: [],
            },
            (e, assignment) => {
                if (e) {
                    return res.status(500).json({ message: e });
                }
                let result = (({_id, course, name, weight}) => ({_id, course, name, weight}))(assignment);
                res.status(200).json({ assignment: result });
            }
            );

        })
        .catch(err => {
            return res.status(500).json({ message: err });
        });    
    },

    updateAssignmentOrder: async (req, res) => {
        const courseId = req.params.courseId;
        let { sourceIndex, destinationIndex } = req.body;
        
        const course = Course.findOne({ _id: courseId })
        .then(async (course) => {
            if (!course) {
                return res.status(500).json({ message: 'INCORRECT_COURSEID' });
            }
            console.log(sourceIndex, destinationIndex);
            if (sourceIndex < destinationIndex) {
                const firstElement = await Assignment.findOne({ course: courseId, order: sourceIndex });
                Assignment.updateMany(
                    { course: courseId, order: { $gt: sourceIndex, $lte: destinationIndex } },
                    { $inc : {order : -1} }
                ).then(() => {
                    firstElement.order = destinationIndex;
                    firstElement.save();
                });
            } else {
                const lastElement = await Assignment.findOne({ course: courseId, order: sourceIndex });
                Assignment.updateMany(
                    { course: courseId, order: { $gte: destinationIndex, $lt: sourceIndex } },
                    { $inc : {order : 1} }
                ).then(() => {
                    lastElement.order = destinationIndex;
                    lastElement.save();
                });
            }

            return res.status(200).json({ message: 'UPDATE_SUCCESSFUL' });
        })
        .catch(err => {
            return res.status(500).json({ message: err });
        });
    },

    updateAssignment: async (req, res) => {
        const _id = req.params.id;
        const userId = req.user._id;
        const { name, weight } = req.body;
        
        const assignment = await Assignment.findOne({ _id: _id });
        if (!assignment) {
            return res.status(500).json({ message: 'INCORRECT_ID' });
        }

        const course = await Course.findOne({ _id: assignment.course });

        const isTeacher = course.teachers.some((teacher) =>
          userId.equals(teacher._id)
        );
        const isOwner = userId.equals(course.owner);
    
        if (!(isTeacher || isOwner)) {
          return res.status(401).json({ message: "NO_PERMISSION" });
        }
    
        assignment.name = name;
        assignment.weight = weight;
        assignment.save();
    
        const resData = { name: name, weight: weight };

        res.status(200).json({
            assignment: resData,
            message: "UPDATE_SUCCESSFUL",
        });
      },
    
    deleteAssignment: async (req, res) => {
        const _id = req.params.id;
        const userId = req.user._id;

        const assignment = await Assignment.findOne({ _id: _id });
        if (!assignment) {
            return res.status(500).json({ message: 'INCORRECT_ID' });
        }

        const course = await Course.findOne({ _id: assignment.course });

        const isTeacher = course.teachers.some((teacher) =>
          userId.equals(teacher._id)
        );
        const isOwner = userId.equals(course.owner);
    
        if (!(isTeacher || isOwner)) {
          return res.status(401).json({ message: "NO_PERMISSION" });
        }

        Assignment.findByIdAndRemove(_id, { new: true }, (err, docs) => {
            if (err) {
                return res.status(500).json({ message: err });
            } else {
                res.status(200).json({ message: "DELETE_SUCCESSFUL" });
            }
        });
    },
};