/** @format */
const prisma = require("../utils/prisma");

async function completeLesson({ enrollmentId, lessonId }) {
  return prisma.enrollmentLesson.upsert({
    where: { enrollmentId_lessonId: { enrollmentId, lessonId } },
    update: { completed: true },
    create: { enrollmentId, lessonId, completed: true },
  });
}

async function listCourseLessonsWithStatus(enrollmentId, courseId) {
  const lessons = await prisma.lesson.findMany({
    where: { courseId },
    orderBy: { createdAt: "asc" },
    include: {
      enrollmentLessons: {
        where: { enrollmentId },
        select: { completed: true },
      },
    },
  });

  return lessons.map(l => ({
    id: l.id,
    title: l.title,
    content: l.content,
    upload: l.upload,
    courseId: l.courseId,
    createdAt: l.createdAt,
    completed: l.enrollmentLessons[0]?.completed === true,
  }));
}

async function getCourseProgress(enrollmentId, courseId) {
  const [total, completed] = await Promise.all([
    prisma.lesson.count({ where: { courseId } }),
    prisma.enrollmentLesson.count({
      where: {
        enrollmentId,
        completed: true,
        lesson: { courseId },
      },
    }),
  ]);

  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);
  return { completed, total, progress };
}

module.exports = {
  completeLesson,
  listCourseLessonsWithStatus,
  getCourseProgress,
};
