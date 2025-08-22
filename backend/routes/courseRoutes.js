/** @format */
const express = require("express");
const { createCourse, getCourses, getCourse, updateCourse, deleteCourse, getInstructorCourses } = require("../controllers/courseController");
const { verifyToken, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.get("/", verifyToken, getCourses);
router.post("/", verifyToken, authorizeRoles("instructor"), createCourse);
router.get("/instructor", verifyToken, authorizeRoles("instructor"), getInstructorCourses);
router.patch("/:id", verifyToken, authorizeRoles("instructor"), updateCourse);
router.delete("/:id", verifyToken, authorizeRoles("instructor"), deleteCourse);
router.get("/:id", verifyToken, getCourse);

module.exports = router;
