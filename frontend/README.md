# EduTrack Frontend

This is the **React frontend** for the EduTrack online learning platform.  
It connects to the EduTrack backend to manage courses, lessons, enrollments, and track student progress.

---

## ✅ Features

- **Authentication**
  - Student and Instructor login/signup
  - JWT-based authentication
  - Role-based access control

- **Courses**
  - Browse all courses
  - Instructors can create, update, and delete their own courses
  - View course details and lessons

- **Lessons**
  - View lessons within a course
  - Support for text, PDF, and video content
  - Track lesson completion

- **Enrollments & Progress**
  - Students can enroll in courses
  - Track completion progress per student
  - Instructors can view student progress

- **Testing**
  - Unit tests for React components
  - Integration tests for key flows

---

## ⚙️ Setup Instructions

1. Clone the repository:

```bash
git clone https://github.com/Afrah3B/eduTrack.git
cd eduTrack/frontend
````

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables in `config.json`:

```text
{
    "EMAIL": "mailto:example@example.com",
    "WHATSUP": "https://wa.me/+966",
    "BASE_API": "http://localhost:5000/api/",
    "UPLOAD_API": "http://localhost:5000/"
}
```

4. Run the development server:

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the app.
The page reloads automatically on changes.

---

## Available Scripts

### `npm start`

Runs the app in development mode.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production into the `build` folder. The build is optimized and minified.

### `npm run eject`

**One-way operation** to expose configuration files and dependencies. Only use if you need full control.

---

## 🏗 Architecture Overview

* **React**: Component-based UI
* **React Router**: Navigation between pages
* **Context & Hooks**: State management for auth, courses, and progress
* **Axios/Fetch**: API communication with backend
* **Jest + React Testing Library**: Testing components and flows

---

## 📌 Assumptions & Considerations

* Frontend communicates with backend via `REACT_APP_API_URL`
* Users have roles (`student` or `instructor`) that determine UI access
* Lessons can contain multiple content types (text, video, PDF)
* Progress is tracked and displayed per student
* Config.json variables must be set before running

---

## Learn More

* [React documentation](https://reactjs.org/)
* [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)
* [Deployment guide](https://facebook.github.io/create-react-app/docs/deployment)
