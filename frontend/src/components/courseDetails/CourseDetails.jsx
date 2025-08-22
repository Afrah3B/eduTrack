import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Context } from "../../context/Context";
import { translations } from "../../utils/lang";
import './CourseDetails.css'
import { enrollCourseAPI, fetchLessonsAPI } from "../../utils/api/courses";
import { AUTH_TOKEN, STUDENT } from "../../utils/helpers";
import Loading from "../loading/Loading";

export const CourseDetails = () => {
    const { lang, handleTokenExpiration, role } = useContext(Context);

    const { id } = useParams();

    const [lessons, setLessons] = useState([]);
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [enrolling, setEnrolling] = useState(false);
    const [enrolled, setEnrolled] = useState(false);

    const fetchLessons = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem(AUTH_TOKEN);
            if (token) {
                const responseData = await fetchLessonsAPI(token, id);
                setLessons(responseData.lessons || []);
                setCourse(responseData.course || null);
            } else {
                handleTokenExpiration();
            }
        } catch (error) {
            console.error("Error fetching lessons:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleEnroll = async () => {
        setEnrolling(true);
        try {
            const token = localStorage.getItem(AUTH_TOKEN);
            if (token) {
                const result = await enrollCourseAPI(token, course.id);
                console.log(result)
                if (result.id) {
                    setEnrolled(true);
                } else if (result.error === "Already enrolled") {
                    setEnrolled(true);
                }
            } else {
                handleTokenExpiration();
            }
        } catch (error) {
            alert(translations[lang].courseDetails.enrolledFailed);
        } finally {
            setEnrolling(false);
        }
    };

    useEffect(() => {
        fetchLessons();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="course-detail">
            <div>
                <Link to="/app/courses" className="course-details-link">{translations[lang].courseDetails.back}</Link>
            </div>
            {course ? (
                <>
                    <h2>{course.title}</h2>
                    <div className="cat-level">
                        <p><b>{translations[lang].courseDetails.category}:</b> {course.category}</p>
                        <p><b>{translations[lang].courseDetails.level}:</b> {course.level}</p>
                    </div>
                    <p>{course.description}</p>


                    <h3>{translations[lang].courseDetails.lessons}</h3>
                    {lessons.length > 0 ? (
                        <div className="course-details-lesson-list">
                            {lessons.map((lesson) => (
                                <div key={lesson.id} className="course-details-lesson-item">
                                    <h4>{lesson.title}</h4>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="no-data">{translations[lang].noData}</p>
                    )}
                </>
            ) : (
                <p>{translations[lang].noData}</p>
            )}

            {role === STUDENT && (!enrolled ? (
                <button
                    className={enrolling ? "enrolling-btn" : "enroll-btn"}
                    onClick={handleEnroll}
                    disabled={enrolling}
                >
                    {enrolling
                        ? translations[lang].courseDetails.enrolling
                        : translations[lang].courseDetails.enroll}
                </button>
            ) : (
                <p className="enrolled-msg">
                    {translations[lang].courseDetails.alreadyEnrolled}
                </p>
            ))}
        </div>
    );
};
