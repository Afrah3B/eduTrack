import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./CourseForm.css";
import { Context } from "../../../context/Context";
import { translations } from "../../../utils/lang";
import { Select } from "../../select/Select";
import { addCourseAPI, fetchCoursebyIdAPI, updateCourseAPI } from "../../../utils/api/instructor";
import { AUTH_TOKEN } from "../../../utils/helpers";
import Loading from "../../loading/Loading";

const levels = ["beginner", "intermediate", "advanced"];

export const CourseForm = ({ isEdit = false }) => {
    const { lang, handleTokenExpiration } = useContext(Context);
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        level: levels[0],
    });

    const [errors, setErrors] = useState({});

    const fetchCourse = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem(AUTH_TOKEN);
            if (token) {
                const responseData = await fetchCoursebyIdAPI(token, id);
                setFormData({
                    title: responseData.title || "",
                    description: responseData.description || "",
                    category: responseData.category || "",
                    level: responseData.level || levels[0],
                });
            } else {
                handleTokenExpiration();
            }
        } catch (error) {
            console.error("Error fetching course:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isEdit) fetchCourse();
        else setLoading(false);
    }, []);

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const validate = () => {
        let valid = true;
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = translations[lang].courseForm.errors.title;
            valid = false;
        }

        if (!formData.description.trim()) {
            newErrors.description = translations[lang].courseForm.errors.description;
            valid = false;
        }

        if (!formData.category.trim()) {
            newErrors.category = translations[lang].courseForm.errors.category;
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        setSubmitting(true);
        try {
            const token = localStorage.getItem(AUTH_TOKEN);
            if (!token) {
                handleTokenExpiration();
                return;
            }

            let data;
            if (isEdit) {
                data = await updateCourseAPI(formData, id, token);
            } else {
                data = await addCourseAPI(formData, token);
            }

            if (data.error) {
                alert(isEdit ? "Course not found" : "Invalid or expired token");
                if (!isEdit) handleTokenExpiration();
            } else {
                navigate("/app/dashboard");
            }
        } catch (err) {
            console.error("Error submitting course:", err);
            alert("❌ " + err.message);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading || submitting) {
        return <Loading />;
    }

    return (
        <div className="course-form">
            <h2>
                {isEdit
                    ? translations[lang].courseForm.title[1]
                    : translations[lang].courseForm.title[0]}
            </h2>
            <form onSubmit={handleSubmit}>
                <p>{translations[lang].courseForm.inputs[0]}</p>
                <input
                    type="text"
                    name="title"
                    placeholder={translations[lang].courseForm.inputs[0]}
                    value={formData.title}
                    onChange={changeHandler}
                />
                {errors.title && <p className="error">{errors.title}</p>}

                <p>{translations[lang].courseForm.inputs[1]}</p>
                <input
                    type="text"
                    name="description"
                    placeholder={translations[lang].courseForm.inputs[1]}
                    value={formData.description}
                    onChange={changeHandler}
                />
                {errors.description && <p className="error">{errors.description}</p>}

                <p>{translations[lang].courseForm.inputs[2]}</p>
                <input
                    type="text"
                    name="category"
                    placeholder={translations[lang].courseForm.inputs[2]}
                    value={formData.category}
                    onChange={changeHandler}
                />
                {errors.category && <p className="error">{errors.category}</p>}

                <Select
                    title={translations[lang].courseForm.inputs[3]}
                    options={[
                        { value: levels[0], label: translations[lang].courseForm.levels[0] },
                        { value: levels[1], label: translations[lang].courseForm.levels[1] },
                        { value: levels[2], label: translations[lang].courseForm.levels[2] },
                    ]}
                    value={formData.level}
                    onChange={(val) => setFormData({ ...formData, level: val })}
                />

                <button type="submit">
                    {isEdit
                        ? translations[lang].courseForm.submitbtn[0]
                        : translations[lang].courseForm.submitbtn[1]}
                </button>
            </form>
        </div>
    );
};
