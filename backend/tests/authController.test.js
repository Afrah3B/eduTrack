const { signin } = require("../controllers/authController");
const User = require("../models/user");

// Mock prisma User model
jest.mock("../models/user");

describe("Auth Controller - signin", () => {
    it("should return 401 if credentials are invalid", async () => {
        User.findByEmail.mockResolvedValue(null);

        const req = { body: { email: "fake@test.com", password: "wrong" } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await signin(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: "Invalid credentials" });
    });
});
