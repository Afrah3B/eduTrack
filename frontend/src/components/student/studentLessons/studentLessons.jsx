import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../../context/Context";
import { translations } from "../../../utils/lang";
import { AUTH_TOKEN } from "../../../utils/helpers";
import {
    fetchCourseLessonsStatusAPI,
    completeLessonAPI,
} from "../../../utils/api/courses";
import "./StudentLessons.css";
import Loading from "../../loading/Loading";
import { LessonUpload } from "../../lessonUpload/LessonUpload";

export const StudentLessons = () => {
    const { lang, handleTokenExpiration } = useContext(Context);
    const { id } = useParams();
    const courseId = Number(id);

    const [lessons, setLessons] = useState([]);
    const [progress, setProgress] = useState(null);
    const [openLessonId, setOpenLessonId] = useState(null);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem(AUTH_TOKEN);

    const fetchLessons = async () => {
        if (!token) return handleTokenExpiration();
        setLoading(true);
        try {
            const data = await fetchCourseLessonsStatusAPI(token, courseId);
            setLessons(data.lessons || []);
            setProgress(data.progress || null);

            const firstUncompleted = data.lessons.find((l) => !l.completed);
            if (firstUncompleted) setOpenLessonId(firstUncompleted.id);
        } catch (err) {
            console.error("Error fetching lessons:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLessons();
    }, [courseId]);

    const handleComplete = async (lessonId) => {
        try {
            if (!token) return handleTokenExpiration();
            await completeLessonAPI(token, courseId, lessonId);

            setLessons((prev) =>
                prev.map((l) =>
                    l.id === lessonId ? { ...l, completed: true } : l
                )
            );

            setProgress((prev) =>
                prev
                    ? {
                        ...prev,
                        completed: prev.completed + 1,
                        progress: Math.round(
                            ((prev.completed + 1) / prev.total) * 100
                        ),
                    }
                    : prev
            );

            const nextLesson = lessons.find(
                (l) => !l.completed && l.id !== lessonId
            );
            if (nextLesson) setOpenLessonId(nextLesson.id);
            else setOpenLessonId(null);
        } catch (err) {
            console.error("Error completing lesson:", err);
        }
    };

    if (loading) return <Loading />;

    if (!lessons.length) return <p>{translations[lang].noData}</p>;

    return (
        <div className="student-lessons">
            <h2>
                {translations[lang].lessons.courseLessons} #{courseId}
            </h2>

            {progress && (
                <div className="progress-container">
                    <span>
                        {translations[lang].student.progress}: {progress.completed}/{progress.total} (
                        {progress.progress}%)
                    </span>
                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: `${progress.progress}%` }}
                        ></div>
                    </div>
                </div>
            )}

            {lessons.map((lesson) => (
                <div key={lesson.id} className="lesson-item">
                    <div
                        className="lesson-row"
                        onClick={() => setOpenLessonId(lesson.id)}
                        style={{
                            fontWeight: openLessonId === lesson.id ? "bold" : "normal",
                        }}
                    >
                        {lesson.title}
                        {lesson.completed && " ✅"}
                    </div>

                    {openLessonId === lesson.id && (
                        <div className="lesson-content">
                            {lesson.content && <p>{lesson.content}</p>}
                            {lesson.upload && (
                                <div>
                                    {translations[lang].lessons.uploadedFile}:{" "}
                                    {<LessonUpload upload={lesson.upload} />}
                                </div>
                            )}
                            {renderContent(lesson)}
                            {!lesson.completed && (
                                <button
                                    className="complete-btn"
                                    onClick={() => handleComplete(lesson.id)}
                                >
                                    {translations[lang].lessons.markComplete}
                                </button>
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};
