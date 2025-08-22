import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import "./Students.css";
import { Sidebar } from "../../components/sidebar/Sidebar";
import { Context } from "../../context/Context";
import { translations } from "../../utils/lang";

export const Students = () => {
    const { lang } = useContext(Context);
    const links = [
        { label: translations[lang].sidebar.studentCourses, path: "/app/dashboard" },
        { label: translations[lang].sidebar.courses, path: "/app/courses" },
    ];
    return (
        <div className={`dashboard-container ${lang === 'ar' ? 'ar' : ''}`}>
            <Sidebar title={translations[lang].sidebar.title.student} links={links} />

            <main className="main-content">
                <Outlet />
            </main>
        </div>
    );
};
