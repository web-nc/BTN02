import express from "express";
import assignmentController from "./assignment.controller.js";

const router = express.Router();

router.get("/:courseId", assignmentController.getAssignments);

router.post("/:courseId", assignmentController.createAssignment);

router.put("/order/:courseId", assignmentController.updateAssignmentOrder)

router.put("/:id", assignmentController.updateAssignment);

router.delete("/:id", assignmentController.deleteAssignment);

export default router;
