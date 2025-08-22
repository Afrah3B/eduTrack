# EduTrack Platform

EduTrack is an online learning platform. This repository contains both the **backend (Node.js + Express + PostgreSQL + Prisma + Redis)** and the **frontend (React)**.  
Using Docker, you can run the entire platform with a single command.

---

## ✅ Project Structure

eduTrack/
├─ backend/       # Node.js backend
├─ frontend-edutrack/      # React frontend
├─ docker-compose.yml
└─ README.md

---

## Backend Overview

- **Technology:** Node.js, Express, PostgreSQL, Prisma, Redis
- **Features:**
  - User signup/login (student & instructor)
  - JWT-based authentication and role-based authorization
  - Course management (create, update, soft delete)
  - Lesson management (text, PDF, video)
  - Student enrollments and progress tracking
  - Caching frequently accessed data in Redis
- **Testing:** Unit and integration tests using Jest

### Backend Dockerfile

- Exposes port `5000`
- Environment variables:
  - `REDIS_HOST=redis`
  - `REDIS_PORT=6379`

---

## Frontend Overview

- **Technology:** React, React Router, Context API, Axios
- **Features:**
  - Student and instructor authentication
  - Course browsing and management
  - Lesson viewing (text, PDF, video)
  - Track student progress
- **Testing:** Unit tests and integration tests using Jest + React Testing Library

### Frontend Dockerfile

- Exposes port `3000`
- Environment variable:
  - `REACT_APP_API_URL=http://localhost:5000`

---

## Running with Docker

1. Make sure Docker and Docker Compose are installed on your machine.
2. In the root folder (`eduTrack/`), run:

```bash
docker-compose up --build
````

3. Services will be available at:

* **Frontend:** [http://localhost:3000](http://localhost:3000)
* **Backend:** [http://localhost:5000](http://localhost:5000)
* **Redis:** localhost:6379

4. To stop the services, press `CTRL+C` and run:

```bash
docker-compose down
```

---

## Environment Variables

Create a `.env` file in the `backend/` folder with at least:

```text
DATABASE_URL=postgresql://user:password@host:port/dbname
JWT_SECRET=your_jwt_secret
REDIS_HOST=redis
REDIS_PORT=6379
```

And in `frontend-edutrack/.env`:

```text
REACT_APP_API_URL=http://localhost:5000
```

---

## Testing

* **Backend:** `npm test` in the `backend/` folder
* **Frontend:** `npm test` in the `frontend-edutrack/` folder

---

## Notes

* Frontend runs in development mode via `npm start` inside Docker.
* Backend connects to Redis and PostgreSQL inside Docker network.
* For production deployment, you can build the frontend and serve via Nginx instead of dev server.
