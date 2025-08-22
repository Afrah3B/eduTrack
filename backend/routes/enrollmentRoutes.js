/** @format */
const express = require("express");
const { enrollCourse, getStudentEnrollments } = require("../controllers/enrollmentController");
const { verifyToken, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.post("/courses/:courseId/enroll", verifyToken, authorizeRoles("student"), enrollCourse);
router.get("/my-courses", verifyToken, authorizeRoles("student"), getStudentEnrollments);

module.exports = router;
