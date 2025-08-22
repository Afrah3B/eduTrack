/** @format */
const Enrollment = require("../models/enrollment");
const Course = require("../models/course");

async function enrollCourse(req, res) {
  const studentId = req.user.id;
  const { courseId } = req.params;

  try {
    const course = await Course.findById(parseInt(courseId));
    if (!course || course.isDeleted) return res.status(404).json({ error: "Course not found" });

    const existing = await Enrollment.findEnrollment(studentId, parseInt(courseId));
    if (existing) return res.status(400).json({ error: "Already enrolled" });

    const enrollment = await Enrollment.createEnrollment({ studentId, courseId: parseInt(courseId) });
    res.status(201).json(enrollment);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
}

async function getStudentEnrollments(req, res) {
  const studentId = req.user.id;
  try {
    const enrollments = await Enrollment.getEnrollmentsByStudent(studentId);
    res.json(enrollments);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
}

module.exports = { enrollCourse, getStudentEnrollments};
