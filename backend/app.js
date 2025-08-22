/** @format */

const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");

module.exports = function (app) {
    app.use(logger("dev"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    const authRoutes = require("./routes/authRoutes");
    const courseRoutes = require("./routes/courseRoutes");
    const lessonRoutes = require("./routes/lessonRoutes");
    const enrollmentRoutes = require("./routes/enrollmentRoutes");
    const enrollmentLessonRoutes = require("./routes/enrollmentLessonRoutes");



    app.use("/api/auth", authRoutes);
    app.use("/api/courses", courseRoutes);
    app.use("/api/courses/:courseId/lessons", lessonRoutes);
    app.use("/api", enrollmentRoutes);
    app.use("/api/courses/:courseId/lessons", enrollmentLessonRoutes);

    app.use("/uploads", express.static("uploads"));


    app.get("/", (req, res) => {
        res.send("Express + PostgreSQL App is running");
    });

    app.use((req, res, next) => {
        next(createError(404));
    });

    app.use((err, req, res, next) => {
        res.locals.message = err.message;
        res.locals.error = req.app.get("env") === "development" ? err : {};
        res.status(err.status || 500);
        res.json({ error: err.message });
    });

    return app;
};
