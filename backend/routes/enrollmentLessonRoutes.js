/** @format */
const express = require("express");
const { completeLesson, getLessonsStatus } = require("../controllers/enrollmentLessonController");
const { verifyToken, authorizeRoles } = require("../middleware/auth");

const router = express.Router({ mergeParams: true });

router.get("/status", verifyToken, authorizeRoles("student"), getLessonsStatus);

router.post("/:lessonId/complete", verifyToken, authorizeRoles("student"), completeLesson);


module.exports = router;
