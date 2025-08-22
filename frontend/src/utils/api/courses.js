import config from "../../config.json";
const BASE_API = config.BASE_API;

export const fetchCoursesAPI = async (token) => {
    let responseData;
    try {
        await fetch(`${BASE_API}courses`, {
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

export const fetchMyCoursesAPI = async (token) => {
    let responseData;
    try {
        await fetch(`${BASE_API}my-courses`, {
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

export const fetchLessonsAPI = async (token, id) => {
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

export const enrollCourseAPI = async (token, courseId) => {
    try {
        const response = await fetch(`${BASE_API}courses/${courseId}/enroll`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        return await response.json();
    } catch (error) {
        console.error("Enroll API error:", error);
        return null;
    }
};

export const fetchCourseLessonsStatusAPI = async (token, courseId) => {
    const res = await fetch(`${BASE_API}courses/${courseId}/lessons/status`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to fetch lessons");
    return res.json();
};

export const completeLessonAPI = async (token, courseId, lessonId) => {
    const res = await fetch(`${BASE_API}courses/${courseId}/lessons/${lessonId}/complete`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to complete lesson");
    return res.json();
};
