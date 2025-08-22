/** @format */
const Enrollment = require("../models/enrollment");
const EnrollmentLesson = require("../models/enrollmentLesson");
const Course = require("../models/course");
const Lesson = require("../models/lesson");

async function completeLesson(req, res) {
  const studentId = req.user.id;
  const courseId = parseInt(req.params.courseId);
  const lessonId = parseInt(req.params.lessonId);

  try {
    const course = await Course.findById(courseId);
    if (!course || course.isDeleted) return res.status(404).json({ error: "Course not found" });

    const enrollment = await Enrollment.findEnrollment(studentId, courseId);
    if (!enrollment) return res.status(404).json({ error: "Not enrolled in this course" });

    const lesson = await Lesson.findById(lessonId);
    if (!lesson) return res.status(404).json({ error: "Lesson not found" });
    if (lesson.courseId !== courseId) {
      return res.status(400).json({ error: "Lesson does not belong to this course" });
    }

    const record = await EnrollmentLesson.completeLesson({
      enrollmentId: enrollment.id,
      lessonId,
    });

    res.json(record);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
}

async function getLessonsStatus(req, res) {
  const studentId = req.user.id;
  const courseId = parseInt(req.params.courseId);

  try {
    const course = await Course.findById(courseId);
    if (!course || course.isDeleted) return res.status(404).json({ error: "Course not found" });

    const enrollment = await Enrollment.findEnrollment(studentId, courseId);
    if (!enrollment) return res.status(404).json({ error: "Not enrolled in this course" });

    const lessons = await EnrollmentLesson.listCourseLessonsWithStatus(enrollment.id, courseId);

    const progress = await EnrollmentLesson.getCourseProgress(enrollment.id, courseId);

    res.json({ progress, lessons });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
}

module.exports = { completeLesson, getLessonsStatus };
