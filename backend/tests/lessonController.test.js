/** @format */
const { addLesson } = require("../controllers/lessonController");
const Lesson = require("../models/lesson");
const Course = require("../models/course");

jest.mock("../models/lesson");
jest.mock("../models/course");

describe("Lesson Controller - addLesson", () => {
    let req, res;

    beforeEach(() => {
        req = {
            params: { courseId: 1 },
            body: { title: "Intro", content: "Lesson content" },
            user: { id: 100 },
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    it("should add a lesson if instructor owns the course", async () => {
        Course.findById = jest.fn().mockResolvedValue({ id: 1, instructorId: 100 });
        Lesson.createLesson.mockResolvedValue({ id: 10, title: "Intro" });

        await addLesson(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ id: 10, title: "Intro" });
    });

    it("should return 403 if user is not the instructor", async () => {
        Course.findById = jest.fn().mockResolvedValue({ id: 1, instructorId: 200 });

        await addLesson(req, res);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({ error: "Forbidden" });
    });
});
