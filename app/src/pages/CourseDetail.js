import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import CourseAssignment from "../components/CourseDetail/CourseAssignment/Assignment";
import CourseDetailNavBar from "../components/CourseDetail/CourseDetailNavBar/";
import CourseInfo from "../components/CourseDetail/CourseInfo/";
import CoursePeople from "../components/CourseDetail/CoursePeople/";
import CourseSetting from "../components/CourseDetail/CourseSetting";
import GradeBoard from "../components/CourseDetail/GradeBoard";
import { getOneCourse } from "../services/course";
import { getAssignments } from "../services/assignment";
import { useDispatch } from "react-redux";

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState({});
  const dispatch = useDispatch();

  const [assignments, setAssignments] = useState([]);

  const handleAssignmentsChange = (newAssignments) => {
    setAssignments([...newAssignments]);
  };

  useEffect(() => {
    getOneCourse(id).then((res) => {
      if (res.status === 200) {
        setCourse(res.data.payload);
      }
      if (res.status === 202) {
        toast.warning(res.data.message);
      }
    });
    getAssignments(id).then((res) => setAssignments([...res.data.assignments]));
  }, [id]);

  return (
    <div>
      <CourseDetailNavBar courseName={course.name} role={course.role} />

      <Routes>
        <Route path="/*" element={<Navigate to="/404" />} />
        <Route path="info" element={<CourseInfo role={course.role} course={course} assignments={assignments} />} />
        <Route path="grade" element={<GradeBoard role={course.role} course={course} assignments={assignments} />} />
        <Route path="people" element={<CoursePeople course={course} />} />
        <Route
          path="assignment"
          element={
            <CourseAssignment
              courseId={id}
              assignments={assignments}
              handleAssignmentsChange={handleAssignmentsChange}
            />
          }
        />
        <Route
          path="setting"
          element={
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
          }
        />
      </Routes>
    </div>
  );
}
