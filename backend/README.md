# EduTrack Backend

## Overview
EduTrack is an online learning platform backend built with **Node.js, Express, PostgreSQL, and Prisma**.  
It supports user management, course creation, lesson tracking, enrollments, and student progress.

---

## ✅ Features Implemented

- **Users & Authentication**
  - Student and Instructor signup
  - Student signin with JWT-based authentication
  - Role-based authorization middleware

- **Courses**
  - Create, update, soft delete courses (hard delete if no enrollments)
  - Instructors can only manage their own courses
  - List all courses

- **Lessons**
  - Add, update, delete lessons in a course
  - Lessons belong to specific courses
  - Lessons can contain both text and files
  - Only instructors of a course can modify lessons

- **Enrollments**
  - Students can enroll in courses
  - Track lesson completion (`EnrollmentLesson`)
  - Calculate student progress in a course
  - Instructors can view students enrolled in their courses

- **Testing**
  - Unit tests for controllers: auth, courses, lessons
  - Integration tests for key flows
  - Ensures proper handling of happy paths and forbidden access

---

## ⚙️ Setup Instructions

1. Clone the repository:

```bash
git clone <repo-url>
cd edutrack-backend
````

2. Install dependencies:

```bash
npm install
```

3. Set up the database:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

4. Configure environment variables in `.env`:

```text
PORT
DATABASE_URL
DIRECT_URL
JWT_SECRET
```

5. Run the development server:

```bash
npm run dev
```

6. Run tests:

```bash
npm test
```

---

## 🏗 Architecture Overview

* **Node.js + Express**: HTTP server, routing, middleware
* **PostgreSQL + Prisma**: Database and ORM
* **Redis**: Caching for frequently accessed data (courses, instructor courses)
* **Controllers**: Handle API logic
* **Models**: Prisma wrappers for database queries
* **Middlewares**: Authentication, role-based authorization
* **Testing**: Jest for unit and integration tests

---

## 📌 Assumptions and Considerations

* Users have a `role` field (student or instructor) to enforce authorization
* Lessons can contain multiple content types (text, PDF, video)
* Courses can only be deleted if no students are enrolled (otherwise soft delete)
* Redis is used for caching frequently accessed data
* API responses follow a consistent JSON structure with proper status codes
* Integration tests require a test database with proper test users
* Sensitive environment variables must be configured before running the app

---

## 📄 API Documentation

* All API endpoints are organized in Postman.
* Postman Collection: [EduTrack API Docs](https://www.postman.com/joint-operations-geoscientist-92064129/workspace/afrahbawhab/collection/44437991-b78b9d07-5d64-41e8-b505-65b14d93b76f?action=share&creator=44437991&active-environment=44437991-17a3a6f5-8214-4a7e-bfcd-fe587ae6ad98)

### Folders included in the collection:

* **Auth**: signup/signin endpoints
* **Courses**: create/update/delete/list courses
* **Lessons**: add/update/delete lessons
* **Enrollments**: enroll students, track progress, view enrolled students
