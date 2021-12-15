import express from "express";
import gradeController from "./grade.controller.js";

const router = express.Router();

router.get("/student/:courseId", gradeController.studentGetGrades);

router.get("/:courseId", gradeController.getGrades);

router.post("/:edit", gradeController.editGrade);

export default router;
