import express from "express";
import gradeController from "./grade.controller.js";

const router = express.Router();

router.get("/student/:courseId", gradeController.studentGetGrades);

router.get("/:courseId", gradeController.getGrades);

router.post("/finalize/:courseId", gradeController.finalizeGrade);

router.post("/finalizeAssignment/:courseId", gradeController.finalizeAssignment);

router.post("/edit/:courseId", gradeController.editGrade);

export default router;
