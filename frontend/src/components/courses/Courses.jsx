// src/pages/courses/Courses.jsx
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './Courses.css'
import { translations } from "../../utils/lang";
import { Context } from "../../context/Context";
import { fetchCoursesAPI } from "../../utils/api/courses";
import { AUTH_TOKEN } from "../../utils/helpers";
import Loading from "../loading/Loading";

export const Courses = () => {
    const { lang, handleTokenExpiration } = useContext(Context);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCourses = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem(AUTH_TOKEN);
            if (token) {
                const responseData = await fetchCoursesAPI(token);
                setCourses(responseData || []);
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
        fetchCourses();
    }, []);

    return (
        <div className="courses-container">
            <h2>{translations[lang].courses.title}</h2>
            {loading ? (
                <Loading />
            ) : courses.length === 0 ? (
                <p className="no-data">{translations[lang].noData}</p>
            ) : (
                <div className="courses-list">
                    {courses.map((course) => (
                        <div key={course.id} className="course-card">
                            <h3>{course.title}</h3>
                            <p>
                                <b>{translations[lang].courses.instructor}</b>{" "}
                                {course.instructor.name}
                            </p>
                            <p>{course.description}</p>
                            <div className="cat-level">
                                <p>{course.category}</p>
                                <p>{course.level}</p>
                            </div>
                            <Link
                                to={`/app/courses/${course.id}`}
                                className="course-link"
                            >
                                {translations[lang].courses.viewMore}
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
