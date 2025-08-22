/** @format */
const Course = require("../models/course");
const redis = require("../utils/redis");

async function createCourse(req, res) {
  const { title, description, category, level } = req.body;
  const instructorId = req.user.id;

  try {
    const course = await Course.createCourse({ title, description, category, level, instructorId });
    await redis.del("all_courses");
    await redis.del(`instructor_courses_${instructorId}`);
    res.status(201).json(course);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
}

async function getCourses(req, res) {
  try {
    const cache = await redis.get("all_courses");
    if (cache) {
      return res.json(JSON.parse(cache));
    }

    const courses = await Course.getAllCourses();

    await redis.set("all_courses", JSON.stringify(courses));

    res.json(courses);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
}

async function updateCourse(req, res) {
  const { id } = req.params;
  const userId = req.user.id;
  const data = req.body;

  try {
    const updated = await Course.updateCourse({ courseId: parseInt(id), userId, data });

    await redis.del("all_courses");
    await redis.del(`instructor_courses_${userId}`);

    res.json(updated);
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ error: err.message });
  }
}

async function deleteCourse(req, res) {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const result = await Course.deleteCourse({ courseId: parseInt(id), userId });

    await redis.del("all_courses");
    await redis.del(`instructor_courses_${userId}`);

    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ error: err.message });
  }
}

async function getInstructorCourses(req, res) {
  const instructorId = req.user.id;

  try {
    const cache = await redis.get(`instructor_courses_${instructorId}`);
    if (cache) return res.json(JSON.parse(cache));

    const courses = await Course.getCoursesByInstructor(instructorId);

    await redis.set(`instructor_courses_${instructorId}`, JSON.stringify(courses));

    res.json(courses);
  } catch (err) {
    console.error("Error fetching instructor courses:", err.message);
    res.status(500).json({ error: err.message });
  }
}

async function getCourse(req, res) {
  const { id } = req.params;

  try {
    const cache = await redis.get(`course_${id}`);
    if (cache) return res.json(JSON.parse(cache));

    const course = await Course.findById(parseInt(id));
    if (!course) return res.status(404).json({ error: "Course not found" });

    await redis.set(`course_${id}`, JSON.stringify(course));

    res.json(course);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
}

module.exports = { createCourse, getCourses, updateCourse, deleteCourse, getInstructorCourses, getCourse };
