import { Navigate, Route, Routes, BrowserRouter } from 'react-router-dom';
import { SigninSignup } from "./pages/signinsignup/SigninSignup";
import { Navbar } from './components/navbar/Navbar';
import { Footer } from './components/footer/Footer';
import { useContext } from 'react';
import { Context } from './context/Context';
import { Students } from './pages/students/Students';
import { Instructor } from './pages/instructor/Instructor';
import { CourseDetails } from './components/courseDetails/CourseDetails';
import { Courses } from './components/courses/Courses';
import { InstructorDashboard } from './components/instructor/dashboard/InstructorDashboard';
import { LessonForm } from './components/instructor/lessonForm/LessonForm';
import { CourseForm } from './components/instructor/courseForm/CourseForm';
import { Lessons } from './components/instructor/lessons/Lessons';
import { StudentCourses } from './components/student/studentCourses/StudentCourses';
import { StudentLessons } from './components/student/studentLessons/studentLessons';

function App() {
  const { isAuth, role } = useContext(Context);
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/signin' element={<SigninSignup />} />

          <Route
            path="/app/*"
            element={
              isAuth ? (
                role === "student" ? <Students /> : <Instructor />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          >

            {role === "student" && (
              <>
                <Route path="courses" element={<Courses />} />
                <Route path="courses/:id" element={<CourseDetails />} />
                <Route path="dashboard" element={<StudentCourses />} />
                <Route path="courses/:id/lessons" element={<StudentLessons />} />
                <Route index element={<Navigate to="dashboard" replace />} />
              </>
            )}

            {role === "instructor" && (
              <>
                <Route path="courses" element={<Courses />} />
                <Route path="courses/create" element={<CourseForm />} />
                <Route path="courses/:id" element={<CourseDetails />} />
                <Route path="courses/:id/edit" element={<CourseForm isEdit />} />
                <Route path="courses/:id/lessons/create" element={<LessonForm />} />
                <Route path="courses/:id/lessons/:lessonId/edit" element={<LessonForm isEdit />} />
                <Route path="courses/:id/lessons" element={<Lessons />} />

                <Route path="dashboard" element={<InstructorDashboard />} />//
                <Route index element={<Navigate to="dashboard" replace />} />
              </>
            )}
          </Route>

          <Route path="*" element={<Navigate to={isAuth ? "/app" : "/signin"} replace />} />
        </Routes>
        <Footer />

      </BrowserRouter>
    </div>
  );
}

export default App;
