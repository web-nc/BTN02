import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Route, Routes, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import CourseAssignment from "../components/CourseDetail/CourseAssignment/Assignment";
import CourseDetailNavBar from "../components/CourseDetail/CourseDetailNavBar/";
import CourseInfo from "../components/CourseDetail/CourseInfo/";
import CoursePeople from "../components/CourseDetail/CoursePeople/";
import CourseSetting from "../components/CourseDetail/CourseSetting";
import GradeBoard from "../components/CourseDetail/GradeBoard";
import StudentGrade from "../components/CourseDetail/StudentGrade";
import { getAssignments } from "../services/assignment";
import { getOneCourse } from "../services/course";
import { getUser } from "../services/user";

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState({});
  const [user, setUser] = useState({});
  const dispatch = useDispatch();

  const [assignments, setAssignments] = useState([]);

  const handleAssignmentsChange = (newAssignments) => {
    setAssignments([...newAssignments]);
  };

  useEffect(() => {
    let isMounted = true;
    getOneCourse(id).then((res) => {
      if (res.status === 200) {
        if (isMounted) setCourse(res.data.payload);
      }
      if (res.status === 202) {
        toast.warning(res.data.message);
      }
    });
    getAssignments(id).then(
      (res) => isMounted && setAssignments([...res.data.assignments])
    );
    getUser().then((res) => isMounted && setUser(res.data)); //get user for studentGrade

    return () => {
      isMounted = false;
    };
  }, [id]);

  return (
    <div>
      <CourseDetailNavBar courseName={course.name} role={course.role} />

      <Routes>
        <Route path="*" element={<Navigate to="/404" />} />
        <Route
          path="info"
          element={
            <CourseInfo
              role={course.role}
              course={course}
              assignments={assignments}
            />
          }
        />
        <Route path="people" element={<CoursePeople course={course} />} />
        <Route
          path="studentGrade"
          element={
            <div>
              {course.role === "STUDENT" ? (
                <StudentGrade
                  course={course}
                  assignments={assignments}
                  user={user}
                />
              ) : (
                <div>{course.role && <Navigate to="/404" />}</div>
              )}
            </div>
          }
        />
        <Route
          path="grade"
          element={
            <div>
              {course.role === "OWNER" || course.role === "TEACHER" ? (
                <GradeBoard
                  role={course.role}
                  course={course}
                  assignments={assignments}
                  handleUpdateCourse={(payload) => {
                    setCourse((prevState) => ({
                      ...prevState,
                      gradeBoard: payload,
                    }));
                  }}
                />
              ) : (
                <div>{course.role && <Navigate to="/404" />}</div>
              )}
            </div>
          }
        />
        <Route
          path="assignment"
          element={
            <div>
              {course.role === "OWNER" || course.role === "TEACHER" ? (
                <CourseAssignment
                  courseId={id}
                  assignments={assignments}
                  handleAssignmentsChange={handleAssignmentsChange}
                />
              ) : (
                <div>{course.role && <Navigate to="/404" />}</div>
              )}
            </div>
          }
        />
        <Route
          path="setting"
          element={
            <div>
              {course.role === "OWNER" || course.role === "TEACHER" ? (
                <CourseSetting
                  role={course.role}
                  name={course.name}
                  details={course.details}
                  briefName={course.briefName}
                  id={id}
                  handleUpdateCourse={(payload) => {
                    setCourse((prevState) => ({ ...prevState, ...payload }));
                    dispatch({ type: "COURSES_UPDATED", payload });
                  }}
                />
              ) : (
                <div>{course.role && <Navigate to="/404" />}</div>
              )}
            </div>
          }
        />
      </Routes>
    </div>
  );
}
