import React from "react";
import CourseHomeNavBar from "../components/CourseHome/CourseHomeNavBar/";
import CourseList from "../components/CourseHome/CourseList/";
import { useSelector } from "react-redux";

export default function ClassHome() {
  const items = useSelector((state) => state.courses.items);

  return (
    <div>
      <CourseHomeNavBar />
      <CourseList courses={items} />
    </div>
  );
}
