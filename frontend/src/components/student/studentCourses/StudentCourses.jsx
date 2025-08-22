import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { translations } from "../../../utils/lang";
import { Context } from "../../../context/Context";
import "./StudentCourses.css";
import { AUTH_TOKEN } from "../../../utils/helpers";
import { fetchMyCoursesAPI } from "../../../utils/api/courses";
import Loading from "../../loading/Loading";

export const StudentCourses = () => {
  const { lang, handleTokenExpiration } = useContext(Context);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem(AUTH_TOKEN);
      if (token) {
        const responseData = await fetchMyCoursesAPI(token);
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

  if (loading) return <Loading />;

  return (
    <div className="student-courses">
      <h2>{translations[lang].student.coursesTitle}</h2>
      {courses.length === 0 ? (
        <p>{translations[lang].student.noCourses}</p>
      ) : (
        <div className="courses-list">
          {courses.map((enrollment) => {
            const course = enrollment.course;
            const progress = enrollment.progress;

            return (
              <div key={enrollment.id} className="course-card">
                <h3>{course.title}</h3>
                <p>
                  <b>{translations[lang].courseDetails.category}:</b>{" "}
                  {course.category}
                </p>
                <p>
                  <b>{translations[lang].courseDetails.level}:</b> {course.level}
                </p>

                <div className="progress-container">
                  <span>
                    {translations[lang].student.progress}: {progress.progress}%
                  </span>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${progress.progress}%` }}
                    ></div>
                  </div>
                </div>

                <Link
                  to={`/app/courses/${course.id}/lessons`}
                  className="course-card-btn"
                >
                  {translations[lang].student.viewLessons}
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
