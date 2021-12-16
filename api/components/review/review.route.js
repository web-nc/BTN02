import express from "express";
import reviewController from "./review.controller.js";

const router = express.Router();

router.get('/student/:courseId', reviewController.studentGetRequest);

router.post('/', reviewController.newReview);

export default router;
