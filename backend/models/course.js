/** @format */
const prisma = require("../utils/prisma");

async function createCourse({ title, description, category, level, instructorId }) {
  const course = await prisma.course.create({
    data: {
      title,
      description,
      category,
      level,
      instructorId,
    },
  });
  return course;
}

async function getAllCourses() {
  return await prisma.course.findMany({
    where: { isDeleted: false },
    include: { instructor: true },
  });
}

async function updateCourse({ courseId, userId, data }) {
  const course = await prisma.course.findUnique({ where: { id: courseId } });
  if (!course || course.isDeleted) throw new Error("Course not found");
  if (course.instructorId !== userId) throw new Error("Forbidden");

  const updated = await prisma.course.update({
    where: { id: courseId },
    data,
  });

  return updated;
}

async function deleteCourse({ courseId, userId }) {
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: { enrollments: true },
  });
  if (!course || course.isDeleted) throw new Error("Course not found");
  if (course.instructorId !== userId) throw new Error("Forbidden");

  if (course.enrollments.length === 0) {
    await prisma.course.delete({ where: { id: courseId } });
    return { message: "Course deleted successfully" };
  } else {
    const softDeleted = await prisma.course.update({
      where: { id: courseId },
      data: { isDeleted: true },
    });
    return { message: "Course has enrolled students, marked as deleted", course: softDeleted };
  }
}

async function findById(courseId) {
  return await prisma.course.findUnique({
    where: { id: parseInt(courseId) },
  });
}

async function getCoursesByInstructor(instructorId) {
  return await prisma.course.findMany({
    where: { instructorId: parseInt(instructorId) },
    include: {
      _count: { select: { lessons: true, enrollments: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

module.exports = {
  createCourse,
  getAllCourses,
  updateCourse,
  deleteCourse,
  findById,
  getCoursesByInstructor
};