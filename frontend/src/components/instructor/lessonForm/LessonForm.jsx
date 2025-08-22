import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../../context/Context";
import { translations } from "../../../utils/lang";
import "./LessonForm.css";
import { AUTH_TOKEN } from "../../../utils/helpers";
import { addLessonAPI, fetchLessonsbyIdAPI, updateLessonAPI } from "../../../utils/api/instructor";
import Loading from "../../loading/Loading";

export const LessonForm = ({ isEdit = false }) => {
  const { lang, handleTokenExpiration } = useContext(Context);
  const { id, lessonId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    upload: null,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);

  const fetchLesson = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem(AUTH_TOKEN);
      if (!token) return handleTokenExpiration();

      const responseData = await fetchLessonsbyIdAPI(token, id, lessonId);
      setFormData({
        title: responseData.title || "",
        content: responseData.content || "",
        upload: responseData.upload || null,
      });
    } catch (error) {
      console.error("Error fetching lesson:", error);
      alert(translations[lang].lessonForm.fetchError || "Error fetching lesson");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isEdit) fetchLesson();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const validate = () => {
    const errs = {};
    if (!formData.title.trim())
      errs.title = translations[lang].lessonForm.errors.title;
    if (!formData.content.trim() && !formData.upload)
      errs.content = translations[lang].lessonForm.errors.contentOrFile;

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const token = localStorage.getItem(AUTH_TOKEN);
      if (!token) return handleTokenExpiration();

      let data;
      if (isEdit) {
        data = await updateLessonAPI(formData, id, lessonId, token);
      } else {
        data = await addLessonAPI(id, formData, token);
      }

      if (data.error) {
        alert(isEdit ? translations[lang].lessonForm.updateError : translations[lang].lessonForm.addError);
      } else {
        navigate(`/app/courses/${id}/lessons`);
      }
    } catch (err) {
      console.error("Error submitting lesson:", err);
      alert("❌ " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loading />;
  if (submitting) return <Loading />;

  return (
    <div className="lesson-form">
      <h2>
        {isEdit
          ? translations[lang].lessonForm.title[1]
          : translations[lang].lessonForm.title[0]}
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Title */}
        <p>{translations[lang].lessonForm.inputs[0]}</p>
        <input
          type="text"
          name="title"
          placeholder={translations[lang].lessonForm.inputs[0]}
          value={formData.title}
          onChange={handleChange}
        />
        {errors.title && <p className="error">{errors.title}</p>}

        {/* Content */}
        <p>{translations[lang].lessonForm.inputs[1]}</p>
        <textarea
          name="content"
          placeholder={translations[lang].lessonForm.inputs[1]}
          value={formData.content}
          onChange={handleChange}
        />

        {/* Upload */}
        <p>{translations[lang].lessonForm.inputs[2]}</p>
        <input
          type="file"
          name="upload"
          accept="video/*,application/pdf"
          onChange={handleChange}
        />
        {errors.content && !formData.content && (
          <p className="error">{errors.content}</p>
        )}

        <button type="submit">
          {isEdit
            ? translations[lang].lessonForm.submitbtn[0]
            : translations[lang].lessonForm.submitbtn[1]}
        </button>
      </form>
    </div>
  );
};
