/** @format */
const prisma = require("../utils/prisma");

async function createEnrollment({ studentId, courseId }) {
  const enrollment = await prisma.enrollment.create({
    data: { studentId, courseId },
  });
  return enrollment;
}

async function findEnrollment(studentId, courseId) {
  return await prisma.enrollment.findUnique({
    where: {
      studentId_courseId: { studentId, courseId },
    },
  });
}

async function getEnrollmentsByStudent(studentId) {
  const enrollments = await prisma.enrollment.findMany({
    where: { studentId: parseInt(studentId) },
    include: {
      course: {
        select: {
          id: true,
          title: true,
          category: true,
          level: true,
          _count: { select: { lessons: true } }, 
        },
      },
      lessons: {
        where: { completed: true },
        select: { id: true },
      },
    },
  });

  return enrollments.map((e) => {
    const total = e.course._count.lessons;
    const completed = e.lessons.length;
    const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      id: e.id,
      course: {
        id: e.course.id,
        title: e.course.title,
        category: e.course.category,
        level: e.course.level,
      },
      progress: { completed, total, progress },
    };
  });
}

module.exports = { createEnrollment, findEnrollment, getEnrollmentsByStudent };
