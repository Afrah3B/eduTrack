const { createCourse } = require("../controllers/courseController");
const Course = require("../models/course");

jest.mock("../models/course");

describe("Course Controller - createCourse", () => {
  it("should create a course successfully", async () => {
    const mockCourse = { id: 1, title: "JS Basics", instructorId: 99 };
    Course.createCourse.mockResolvedValue(mockCourse);

    const req = {
      body: { title: "JS Basics", description: "Intro", category: "Dev", level: "Beginner" },
      user: { id: 99 }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await createCourse(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockCourse);
  });
});