/** @format */
const express = require("express");
const { addLesson, getLessons, updateLesson, deleteLesson, getLesson } = require("../controllers/lessonController");
const { verifyToken, authorizeRoles } = require("../middleware/auth");
const upload = require("../utils/multer");

const router = express.Router({ mergeParams: true });

router.get("/", verifyToken, getLessons);
router.post("/", verifyToken, authorizeRoles("instructor"), upload.single("upload"), addLesson);
router.get("/:lessonId", verifyToken, authorizeRoles("instructor"), getLesson);
router.patch("/:lessonId", verifyToken, authorizeRoles("instructor"), upload.single("upload"), updateLesson);
router.delete("/:lessonId", verifyToken, authorizeRoles("instructor"), deleteLesson);

module.exports = router;
