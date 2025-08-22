const { createCourse } = require("../controllers/courseController");
const prisma = require("../utils/prisma");
const redis = require("../utils/redis");

jest.mock("../utils/redis", () => ({
    del: jest.fn().mockResolvedValue(true),
}));

describe("Course Controller - createCourse (Integration Test)", () => {
    it(
        "should create a course successfully in the database",
        async () => {
            const title = `JS Basics Integration`;

            await prisma.user.create({
                data: {
                    id: 99,
                    name: "Test Instructor",
                    email: `test@example.com`,
                    password: "hashedpassword",
                    role: 'instructor'
                },
            });

            const req = {
                body: {
                    title,
                    description: "Intro",
                    category: "Dev",
                    level: "Beginner",
                },
                user: { id: 99 },
            };

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            await createCourse(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            const returnedCourse = res.json.mock.calls[0][0];

            expect(returnedCourse).toBeDefined();
            expect(returnedCourse.title).toBe(title);
            expect(returnedCourse.instructorId).toBe(99);
            expect(returnedCourse.description).toBe("Intro");
            expect(returnedCourse.category).toBe("Dev");
            expect(returnedCourse.level).toBe("Beginner");

            await prisma.course.deleteMany({ where: { title: req.body.title } });
            await prisma.user.delete({ where: { id: 99 } });
        },
        10000
    );
});
