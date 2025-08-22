// src/components/sidebar/Sidebar.jsx
import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Sidebar.css";

export const Sidebar = ({ title, links = [] }) => {
    const [isSelected, setIsSelected] = useState(links?.[0].path.split('/').pop());

    const location = useLocation();

    useEffect(() => {
        const path = location.pathname.split('/').pop();

        setIsSelected(path);
    }, [location]);

    return (
        <aside className="sidebar">
            <h2>{title}</h2>
            {links.map((link) => (
                <NavLink
                    key={link.path}
                    to={link.path}
                    className={`sidebar-item ${isSelected === link.path.split('/').pop() ? "active" : ""}`}
                    onClick={() => { setIsSelected(link.path.split('/').pop()); }}
                >
                    {link.label}
                </NavLink>
            ))}
        </aside>
    );
};
