import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { translations } from "../../../utils/lang";
import { Context } from "../../../context/Context";
import "./Lessons.css";
import {
    fetchLessonsOfCoursebyIdAPI,
    deleteLessonAPI,
} from "../../../utils/api/instructor";
import { AUTH_TOKEN } from "../../../utils/helpers";
import Loading from "../../loading/Loading";
import { LessonUpload } from "../../lessonUpload/LessonUpload";

export const Lessons = () => {
    const { lang, handleTokenExpiration } = useContext(Context);
    const [course, setCourse] = useState(null);
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);

    const { id } = useParams();
    const navigate = useNavigate();
    const [selectedLessonId, setSelectedLessonId] = useState(null);

    const fetchLessons = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem(AUTH_TOKEN);
            if (token) {
                const responseData = await fetchLessonsOfCoursebyIdAPI(token, id);
                setCourse(responseData.course || null);
                setLessons(responseData.lessons || []);
            } else {
                handleTokenExpiration();
            }
        } catch (error) {
            console.error("Error fetching courses:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLessons();
    }, []);

    if (loading) return <Loading />;

    if (!course) {
        return <p>{translations[lang].lessons.courseNotFound}</p>;
    }

    const handleRowClick = (lessonId) => {
        setSelectedLessonId(lessonId === selectedLessonId ? null : lessonId);
    };

    const handleDelete = async (lesson) => {
        if (window.confirm(`${translations[lang].lessons.deleteConfirm} "${lesson.title}"?`)) {
            try {
                const token = localStorage.getItem(AUTH_TOKEN);
                if (token) {
                    await deleteLessonAPI(token, id, lesson.id);
                    setLessons((prev) => prev.filter((l) => l.id !== lesson.id));
                } else {
                    handleTokenExpiration();
                }

            } catch (error) {
                console.error("Error deleting lesson:", error);
                alert(translations[lang].lessons.deleteError || "Error deleting lesson");
            }
        }
    };

    return (
        <div className="lessons">
            <h2>
                {translations[lang].lessons.title} - {course.title}
            </h2>
            <div>
                <button onClick={() => navigate(`/app/courses/${id}/lessons/create`)}>
                    {translations[lang].lessons.addBtn}
                </button>
            </div>

            {lessons.length === 0 ? (
                <p>{translations[lang].lessons.noLessons}</p>
            ) : (
                <div className="lessons-list">
                    {lessons.map((lesson) => (
                        <div key={lesson.id} className="lesson-item">
                            <div className="lesson-row" onClick={() => handleRowClick(lesson.id)}>
                                <p>{lesson.title}</p>
                                <div className="lesson-actions">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(`/app/courses/${id}/lessons/${lesson.id}/edit`);
                                        }}
                                    >
                                        {translations[lang].lessons.edit}
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDelete(lesson);
                                        }}
                                    >
                                        {translations[lang].lessons.delete}
                                    </button>
                                </div>
                            </div>

                            {selectedLessonId === lesson.id && (
                                <div className="lesson-content">
                                    {lesson.content && <p>{lesson.content}</p>}
                                    {lesson.upload && (
                                        <div>
                                            {translations[lang].lessons.uploadedFile}:{" "}
                                            {<LessonUpload upload={lesson.upload} />}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
