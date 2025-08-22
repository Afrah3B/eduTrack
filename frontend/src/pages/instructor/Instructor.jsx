import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import "./Instructor.css";
import { Sidebar } from "../../components/sidebar/Sidebar";
import { translations } from "../../utils/lang";
import { Context } from "../../context/Context";

export const Instructor = () => {
    const { lang } = useContext(Context);
    const links = [
        { label: translations[lang].sidebar.instructorCourses, path: "/app/dashboard" },
        { label: translations[lang].sidebar.courses, path: "/app/courses" },
    ];
    return (
        <div className={`dashboard-container ${lang === 'ar' ? 'ar' : ''}`}>
            <Sidebar title={translations[lang].sidebar.title.instructor} links={links} />

            <main className="main-content">
                <Outlet />
            </main>
        </div>
    );
};
