import express from "express";
import reviewController from "./review.controller.js";

const router = express.Router();

router.get('/student/:courseId', reviewController.studentGetRequest);

router.get('/teacher/:courseId', reviewController.teacherGetRequest);

router.post('/', reviewController.newReview);

router.put('/', reviewController.teacherReview);

export default router;
