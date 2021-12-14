import express from "express";
import gradeController from "./grade.controller.js";

const router = express.Router();

router.get("/:courseId", gradeController.getGrades);

router.post("/:edit", gradeController.editGrade);

export default router;
