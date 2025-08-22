import config from "../../config.json";
const BASE_API = config.BASE_API;

export const fetchInstructorCoursesAPI = async (token) => {
    let responseData;
    try {
        await fetch(`${BASE_API}courses/instructor`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }).then((response) => response.json()).then((data) => responseData = data);

        return responseData

    } catch (error) {
        alert(error)
        return
    }
}

export const fetchCoursebyIdAPI = async (token, id) => {
    let responseData;
    try {
        await fetch(`${BASE_API}courses/${id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }).then((response) => response.json()).then((data) => responseData = data);

        return responseData

    } catch (error) {
        alert(error)
        return
    }
}

export const fetchLessonsOfCoursebyIdAPI = async (token, id) => {
    let responseData;
    try {
        await fetch(`${BASE_API}courses/${id}/lessons`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }).then((response) => response.json()).then((data) => responseData = data);

        return responseData

    } catch (error) {
        alert(error)
        return
    }
}

export const addCourseAPI = async (courseData, token) => {
    try {
        const res = await fetch(`${BASE_API}courses`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(courseData),
        });

        return await res.json();
    } catch (err) {
        console.error("❌ addCourseAPI error:", err.message);
        throw err;
    }
};

export const updateCourseAPI = async (courseData, id, token) => {
    try {
        const res = await fetch(`${BASE_API}courses/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(courseData),
        });

        return await res.json();
    } catch (err) {
        console.error("❌ addCourseAPI error:", err.message);
        throw err;
    }
};

export const deleteCourseAPI = async (courseId, token) => {
    const res = await fetch(`${BASE_API}courses/${courseId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    return await res.json();
};

export const fetchLessonsbyIdAPI = async (token, id, lessonId) => {
    let responseData;
    try {
        await fetch(`${BASE_API}courses/${id}/lessons/${lessonId}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }).then((response) => response.json()).then((data) => responseData = data);

        return responseData

    } catch (error) {
        alert(error)
        return
    }
}

export const addLessonAPI = async (id, lessonData, token) => {
    try {
        const formData = new FormData();
        formData.append("title", lessonData.title);
        if (lessonData.content) formData.append("content", lessonData.content);
        if (lessonData.upload) formData.append("upload", lessonData.upload);

        const res = await fetch(`${BASE_API}courses/${id}/lessons`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        return await res.json();
    } catch (err) {
        console.error("❌ addLessonAPI error:", err.message);
        throw err;
    }
};

export const updateLessonAPI = async (lessonData, id, lessonId, token) => {
  try {
    const formData = new FormData();
    formData.append("title", lessonData.title);
    if (lessonData.content) formData.append("content", lessonData.content);
    if (lessonData.upload) formData.append("upload", lessonData.upload);

    const res = await fetch(`${BASE_API}courses/${id}/lessons/${lessonId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    return await res.json();
  } catch (err) {
    console.error("❌ updateLessonAPI error:", err.message);
    throw err;
  }
};

export const deleteLessonAPI = async (token, courseId, lessonId) => {
    const res = await fetch(`${BASE_API}courses/${courseId}/lessons/${lessonId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    return await res.json();
};