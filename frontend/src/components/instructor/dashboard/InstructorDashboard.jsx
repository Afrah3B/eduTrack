import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./InstructorDashboard.css";
import { Context } from "../../../context/Context";
import { translations } from "../../../utils/lang";
import { fetchInstructorCoursesAPI, deleteCourseAPI } from "../../../utils/api/instructor";
import { AUTH_TOKEN } from "../../../utils/helpers";
import Loading from "../../loading/Loading";

export const InstructorDashboard = () => {
    const { lang, handleTokenExpiration } = useContext(Context);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);

    const fetchCourses = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem(AUTH_TOKEN);
            if (!token) return handleTokenExpiration();

            const responseData = await fetchInstructorCoursesAPI(token);
            setCourses(responseData || []);
        } catch (error) {
            console.error("Error fetching courses:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const handleDelete = async (courseId) => {
        if (!window.confirm(`${translations[lang].instructorDashboard.deleteConfirm}?`)) return;
        setDeletingId(courseId);
        try {
            const token = localStorage.getItem(AUTH_TOKEN);
            if (!token) return handleTokenExpiration();

            const response = await deleteCourseAPI(courseId, token);
            if (response.error) {
                alert(response.error);
            } else {
                setCourses(prev => prev.filter(c => c.id !== courseId));
            }
        } catch (err) {
            console.error("Error deleting course:", err);
            alert("❌ " + err.message);
        } finally {
            setDeletingId(null);
        }
    };

    if (loading) return <Loading />;

    return (
        <div className="instructor-dashboard">
            <Link to="/app/courses/create" className="btn-add-course">
                {translations[lang].instructorDashboard.add}
            </Link>

            <div className="courses-list">
                {courses.length === 0 ? (
                    <p>{translations[lang].instructorDashboard.noCourses}</p>
                ) : (
                    courses.map((course) => (
                        <div key={course.id} className="course-card">
                            <div className="course-header">
                                <button
                                    className="btn-delete"
                                    onClick={() => handleDelete(course.id)}
                                    disabled={deletingId === course.id}
                                >
                                    X
                                </button>
                                <h3>{course.title}</h3>
                            </div>
                            <p>{course.description}</p>
                            <div className="actions">
                                <Link to={`/app/courses/${course.id}/edit`} className="btn-edit">
                                    {translations[lang].instructorDashboard.edit}
                                </Link>
                                <Link to={`/app/courses/${course.id}/lessons`} className="btn-lessons">
                                    {translations[lang].instructorDashboard.manage}
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
