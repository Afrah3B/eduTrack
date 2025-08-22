/** @format */
const Lesson = require("../models/lesson");
const Course = require("../models/course");
const redis = require("../utils/redis");

// Add lesson with file upload
async function addLesson(req, res) {
  const { courseId } = req.params;
  const { title, content } = req.body;
  const userId = req.user.id;

  try {
    const course = await Course.findById(parseInt(courseId));
    if (!course) return res.status(404).json({ error: "Course not found" });
    if (course.instructorId !== userId) return res.status(403).json({ error: "Forbidden" });

    const uploadPath = req.file ? `uploads/${req.file.filename}` : null;
    await redis.del(`course:${courseId}:lessons`);

    const lesson = await Lesson.createLesson({
      title,
      content,
      courseId: parseInt(courseId),
      upload: uploadPath,
    });

    res.status(201).json(lesson);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
}

async function getLessons(req, res) {
  const { courseId } = req.params;

  try {
    const cacheKey = `course:${courseId}:lessons`;

    const cached = await redis.get(cacheKey);
    if (cached) {
      return res.json(JSON.parse(cached));
    }

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ error: "Course not found" });

    const lessons = await Lesson.getLessonsByCourse(parseInt(courseId));
    const data = { course, lessons };

    await redis.setex(cacheKey, 3600, JSON.stringify(data));

    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
}

async function getLesson(req, res) {
  const { lessonId } = req.params;
  try {
    const cacheKey = `lesson:${lessonId}`;
    const cached = await redis.get(cacheKey);
    if (cached) return res.json(JSON.parse(cached));

    const lesson = await Lesson.findById(parseInt(lessonId));
    if (!lesson) return res.status(404).json({ error: "Lesson not found" });

    await redis.setex(cacheKey, 3600, JSON.stringify(lesson));

    res.json(lesson);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
}

async function updateLesson(req, res) {
  const { lessonId, courseId } = req.params;
  const { title, content } = req.body;
  const userId = req.user.id;

  try {
    const course = await Course.findById(parseInt(courseId));
    if (!course) return res.status(404).json({ error: "Course not found" });
    if (course.instructorId !== userId)
      return res.status(403).json({ error: "Forbidden" });

    const lesson = await Lesson.findById(parseInt(lessonId));
    if (!lesson || lesson.courseId !== parseInt(courseId))
      return res.status(404).json({ error: "Lesson not found" });

    const filePath = req.file ? req.file.path : lesson.upload;

    const updated = await Lesson.updateLesson({
      lessonId: parseInt(lessonId),
      data: { title, content, upload: filePath },
    });

    await redis.del(`course:${courseId}:lessons`);
    await redis.del(`lesson:${lessonId}`);

    res.json(updated);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
}

async function deleteLesson(req, res) {
  const { lessonId, courseId } = req.params;
  const userId = req.user.id;

  try {
    const course = await Course.findById(parseInt(courseId));
    if (!course) return res.status(404).json({ error: "Course not found" });
    if (course.instructorId !== userId) return res.status(403).json({ error: "Forbidden" });

    const lesson = await Lesson.findById(parseInt(lessonId));
    if (!lesson || lesson.courseId !== parseInt(courseId)) return res.status(404).json({ error: "Lesson not found" });

    const result = await Lesson.deleteLesson(parseInt(lessonId));

    await redis.del(`course:${courseId}:lessons`);
    await redis.del(`lesson:${lessonId}`);
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
}

module.exports = { addLesson, getLessons, updateLesson, deleteLesson, getLesson };