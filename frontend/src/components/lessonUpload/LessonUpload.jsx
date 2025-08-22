import React from "react";
import config from "../../config.json";

export const LessonUpload = ({ upload }) => {
    const BASE_API = config.UPLOAD_API;
    console.log(`${BASE_API}${upload}`)
    if (!upload) return null;

    const fileExt = upload.split(".").pop().toLowerCase();

    if (fileExt === "pdf") {
        return (
            <div style={{ margin: "1rem 0" }}>
                <embed
                    src={`${BASE_API}${upload}`}
                    type="application/pdf"
                    width="100%"
                    height="600px"
                    style={{ border: "1px solid #ccc", borderRadius: "4px" }}
                />
            </div>
        );
    }

    if (["mp4", "webm", "ogg"].includes(fileExt)) {
        return (
            <div style={{ margin: "1rem 0" }}>
                <video controls width="100%" style={{ borderRadius: "4px" }}>
                    <source src={`${BASE_API}${upload}`} type={`video/${fileExt}`} />
                    Your browser does not support the video tag.
                </video>
            </div>
        );
    }

    return (
        <p style={{ margin: "1rem 0" }}>
            <a href={`${BASE_API}${upload}`} target="_blank" rel="noopener noreferrer">
                {upload.split("/").pop()}
            </a>
        </p>
    );
}
