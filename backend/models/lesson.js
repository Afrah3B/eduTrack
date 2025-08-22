/** @format */
const prisma = require("../utils/prisma");

async function createLesson({ title, content, upload, courseId }) {
  const lesson = await prisma.lesson.create({
    data: { title, content, upload, courseId },
  });
  return lesson;
}

async function getLessonsByCourse(courseId) {
  return await prisma.lesson.findMany({
    where: { courseId },
    orderBy: { createdAt: "asc" },
  });
}

async function findById(lessonId) {
  return await prisma.lesson.findUnique({ where: { id: lessonId } });
}

async function updateLesson({ lessonId, data }) {
  const updated = await prisma.lesson.update({
    where: { id: lessonId },
    data,
  });
  return updated;
}

async function deleteLesson(lessonId) {
  await prisma.lesson.delete({ where: { id: lessonId } });
  return { message: "Lesson deleted successfully" };
}

module.exports = { createLesson, getLessonsByCourse, findById, updateLesson, deleteLesson };
